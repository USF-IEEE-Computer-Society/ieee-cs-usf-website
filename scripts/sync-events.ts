import https from 'https';
import * as cheerio from 'cheerio';
import { neon, NeonQueryFunction } from '@neondatabase/serverless';

// Load environment variables only in local development
if (process.env.NODE_ENV !== 'production') {
  const { config } = require('dotenv');
  config({ path: '.env.local' });
}

const EVENTS_API_URL = 'https://bullsconnect.usf.edu/mobile_ws/v17/mobile_events_list?range=0&limit=40&filter2=58136';
const BULLSCONNECT_BASE_URL = 'https://bullsconnect.usf.edu';

// Database connection - initialized lazily
function getDb(): NeonQueryFunction<false, false> {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return neon(DATABASE_URL);
}

interface EventVenue {
  name: string;
  isOnline: boolean;
}

interface ParsedEvent {
  bullsconnectId: string;
  title: string;
  originalUrl: string;
  eventUrl: string | null;
  description: string | null;
  photoUrl: string | null;
  startTime: string | null;
  endTime: string | null;
  venue: EventVenue;
  rsvpCount: number | null;
  tags: string[];
  timezone: string | null;
  status: string | null;
  eventType: string | null;
}

interface ApiEventItem {
  fields: string;
  listingSeparator: string | null;
  counter: string;
  p0: string;  // "false" for events, "true" for separators
  p1: string;  // eventId for events, date text for separators
  p2?: string; // eventUid (bullsconnect_id)
  p3?: string; // eventName
  p4?: string; // eventDates (HTML)
  p5?: string; // eventCategory
  p6?: string; // eventLocation
  p7?: string; // clubId
  p8?: string; // clubLogin
  p9?: string; // clubName
  p10?: string; // eventAttendees (registered count)
  p11?: string; // eventPicture
  p12?: string; // eventPriceRange
  p13?: string; // eventButtonLabel
  p14?: string; // eventBadges
  p15?: string; // totalTicketsSoldValue
  p16?: string; // checkbox_id
  p17?: string; // displayAttendees
  p18?: string; // eventUrl
  p19?: string; // displayType
  p20?: string; // registered
  p21?: string; // waiting_list
  p22?: string; // eventTags (HTML)
  p23?: string; // coHostId
  p24?: string | null; // custom_time_instruction
  p25?: string; // checkin
  p26?: string; // registrationStatus
  p27?: string; // printTicket
  p28?: string; // eventTimezone
  p29?: string; // ariaEventDetails
  p30?: string; // ariaEventDetailsWithLocation
  p31?: string; // parentEventIds
  p32?: string; // all_results_hidden
  p33?: string; // hybrid
  p34?: string; // eventPhotoDescription
  p35?: string; // eventFlyerDescription
  p36?: string; // list_item_acc_label
  htmlFields?: string[];
}

function fetchJson(urlString: string): Promise<ApiEventItem[]> {
  return new Promise((resolve, reject) => {
    const url = new URL(urlString);
    
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk: Buffer) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(new Error(`Failed to parse JSON: ${(e as Error).message}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

function fetchPage(urlString: string, maxRedirects = 10): Promise<{ html: string; finalUrl: string }> {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) {
      return reject(new Error('Too many redirects'));
    }

    const parsedUrl = new URL(urlString);
    
    const options = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    };

    const req = https.request(options, (res) => {
      // Handle redirects (301, 302, 303, 307, 308)
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        
        // Handle relative URLs
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, urlString).href;
        }
        
        return fetchPage(redirectUrl, maxRedirects - 1).then(resolve).catch(reject);
      }

      let data = '';
      res.on('data', (chunk: Buffer) => data += chunk);
      res.on('end', () => resolve({ html: data, finalUrl: urlString }));
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Fetch description and image from event detail page
 */
async function fetchEventDetails(eventUrl: string): Promise<{ description: string | null; image: string | null; finalUrl: string }> {
  console.log(`  [photoUrl debug] Fetching detail page: ${eventUrl}`);
  try {
    const { html, finalUrl } = await fetchPage(eventUrl);
    console.log(`  [photoUrl debug] Detail page final URL: ${finalUrl}`);
    const $ = cheerio.load(html);
    
    let description: string | null = null;
    let image: string | null = null;

    const isCoHosted = $('#event_host').text().toLowerCase().includes('co-hosted');
    console.log(`  [photoUrl debug] Co-hosted event: ${isCoHosted}`);

    if (isCoHosted) {
      // Co-hosted events use a different image from the co-host org, so the
      // JSON-LD image is wrong. Instead, grab the flyer from the Event Details section.
      const detailImg = $('#event_details .text-center img').first();
      if (detailImg.length) {
        const src = detailImg.attr('src');
        if (src) {
          image = src.startsWith('http') ? src : `${BULLSCONNECT_BASE_URL}${src}`;
          console.log(`  [photoUrl debug] Got image from Event Details section: ${image}`);
        }
      }
      if (!image) {
        console.log(`  [photoUrl debug] Co-hosted event but no image found in Event Details section`);
      }
    }

    // For non-co-hosted events (or as fallback), use JSON-LD
    if (!image) {
      const jsonLdScripts = $('script[type="application/ld+json"]');
      console.log(`  [photoUrl debug] Found ${jsonLdScripts.length} JSON-LD script(s)`);

      jsonLdScripts.each((idx, script) => {
        try {
          const jsonData = JSON.parse($(script).html() || '{}');
          console.log(`  [photoUrl debug] JSON-LD #${idx} @type: ${jsonData['@type'] || '(none)'}, has @graph: ${!!jsonData['@graph']}`);
          
          let eventData = null;
          if (jsonData['@type'] === 'Event') {
            eventData = jsonData;
          } else if (jsonData['@graph']) {
            eventData = jsonData['@graph'].find((item: { '@type': string }) => item['@type'] === 'Event');
            console.log(`  [photoUrl debug] Found Event in @graph: ${!!eventData}`);
          }
          
          if (eventData) {
            if (eventData.description) {
              description = eventData.description;
            }
            if (eventData.image) {
              const rawImage = eventData.image;
              console.log(`  [photoUrl debug] JSON-LD image field type: ${Array.isArray(rawImage) ? 'array' : typeof rawImage}, value: ${JSON.stringify(rawImage).substring(0, 200)}`);
              image = Array.isArray(rawImage) ? rawImage[0] : rawImage;
            } else {
              console.log(`  [photoUrl debug] JSON-LD Event has no image field`);
            }
            return false; // break loop
          }
        } catch (e) {
          console.log(`  [photoUrl debug] JSON-LD parse error: ${(e as Error).message}`);
        }
      });
    }

    // Still grab description from JSON-LD if we used the co-hosted image path
    if (isCoHosted && !description) {
      $('script[type="application/ld+json"]').each((_, script) => {
        try {
          const jsonData = JSON.parse($(script).html() || '{}');
          let eventData = null;
          if (jsonData['@type'] === 'Event') {
            eventData = jsonData;
          } else if (jsonData['@graph']) {
            eventData = jsonData['@graph'].find((item: { '@type': string }) => item['@type'] === 'Event');
          }
          if (eventData?.description) {
            description = eventData.description;
            return false;
          }
        } catch {
          // skip
        }
      });
    }
    
    console.log(`  [photoUrl debug] Detail page result — image: ${image || '(null)'}`);
    return { description, image, finalUrl };
  } catch (e) {
    console.log(`  [photoUrl debug] Detail page fetch failed: ${(e as Error).message}`);
    return { description: null, image: null, finalUrl: eventUrl };
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Parse date and time from eventDates HTML string
 * Example input: "<p style='margin:0;'>Wed, Jan 28, 2026</p>\n<p style='margin:0;'>9:30 AM &ndash;2 PM</p>\n"
 * Returns: { startDate: ISO string, endDate: ISO string }
 */
function parseDateTimeFromHtml(eventDatesHtml: string, timezone: string | null): { startDate: string | null; endDate: string | null } {
  const $ = cheerio.load(eventDatesHtml);
  const paragraphs = $('p').toArray();
  
  if (paragraphs.length < 2) {
    return { startDate: null, endDate: null };
  }
  
  // First paragraph: date (e.g., "Wed, Jan 28, 2026")
  const dateText = $(paragraphs[0]).text().trim();
  // Second paragraph: time range (e.g., "9:30 AM – 2 PM" or "6:30 PM – 7:30 PM")
  const timeText = $(paragraphs[1]).text().trim();
  
  // Parse the time range - handle both "–" (ndash) and "-" (hyphen)
  const timeMatch = timeText.match(/(\d{1,2}(?::\d{2})?\s*(?:AM|PM))\s*[–-]\s*(\d{1,2}(?::\d{2})?\s*(?:AM|PM))/i);
  
  if (!timeMatch) {
    return { startDate: null, endDate: null };
  }
  
  const startTimeStr = timeMatch[1].trim();
  const endTimeStr = timeMatch[2].trim();
  
  // Parse the date
  // Remove day of week prefix (e.g., "Wed, " -> "")
  const dateWithoutDay = dateText.replace(/^[A-Za-z]+,\s*/, '');
  
  try {
    // Parse start and end times (now returns ISO string with -05:00 timezone)
    const startDate = parseDateTime(dateWithoutDay, startTimeStr);
    const endDate = parseDateTime(dateWithoutDay, endTimeStr);
    
    return { startDate, endDate };
  } catch {
    return { startDate: null, endDate: null };
  }
}

/**
 * Parse a date string and time string into an ISO string with -05:00 timezone
 */
function parseDateTime(dateStr: string, timeStr: string): string | null {
  // Parse time (e.g., "9:30 AM" or "2 PM")
  const timeMatch = timeStr.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
  if (!timeMatch) return null;
  
  let hours = parseInt(timeMatch[1], 10);
  const minutes = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
  const period = timeMatch[3].toUpperCase();
  
  // Convert to 24-hour format
  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  
  // Parse date (e.g., "Jan 28, 2026" or "Feb 4, 2026")
  const dateMatch = dateStr.match(/([A-Za-z]+)\s+(\d{1,2}),?\s*(\d{4})/);
  if (!dateMatch) return null;
  
  const monthNames: Record<string, number> = {
    'jan': 0, 'january': 0,
    'feb': 1, 'february': 1,
    'mar': 2, 'march': 2,
    'apr': 3, 'april': 3,
    'may': 4,
    'jun': 5, 'june': 5,
    'jul': 6, 'july': 6,
    'aug': 7, 'august': 7,
    'sep': 8, 'september': 8,
    'oct': 9, 'october': 9,
    'nov': 10, 'november': 10,
    'dec': 11, 'december': 11
  };
  
  const monthStr = dateMatch[1].toLowerCase();
  const day = parseInt(dateMatch[2], 10);
  const year = parseInt(dateMatch[3], 10);
  
  const month = monthNames[monthStr];
  if (month === undefined) return null;
  
  // Format as local datetime string (no offset) — timezone conversion is handled in SQL
  const monthPadded = String(month + 1).padStart(2, '0');
  const dayPadded = String(day).padStart(2, '0');
  const hoursPadded = String(hours).padStart(2, '0');
  const minutesPadded = String(minutes).padStart(2, '0');
  
  return `${year}-${monthPadded}-${dayPadded} ${hoursPadded}:${minutesPadded}:00`;
}

/**
 * Extract tags from eventTags HTML
 */
function parseTagsFromHtml(eventTagsHtml: string): string[] {
  if (!eventTagsHtml) return [];
  
  const $ = cheerio.load(eventTagsHtml);
  const tags: string[] = [];
  
  $('a[aria-label]').each((_, el) => {
    const label = $(el).attr('aria-label');
    if (label && label.length > 0 && label.length < 100) {
      tags.push(label.trim());
    }
  });
  
  // Fallback: try to get from span.label-tag
  if (tags.length === 0) {
    $('span.label-tag').each((_, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 0 && text.length < 100) {
        tags.push(text);
      }
    });
  }
  
  return [...new Set(tags)]; // Remove duplicates
}

/**
 * Parse API response into event objects
 */
function parseApiResponse(items: ApiEventItem[]): ParsedEvent[] {
  const events: ParsedEvent[] = [];
  
  for (const item of items) {
    // Skip date separators (p0 === "true" indicates a separator)
    if (item.p0 === 'true' || item.listingSeparator === 'true') {
      continue;
    }
    
    // Ensure we have required fields
    if (!item.p2 || !item.p3) {
      continue;
    }
    
    // Parse dates
    const { startDate, endDate } = parseDateTimeFromHtml(item.p4 || '', item.p28 || null);
    
    // Parse tags
    const tags = parseTagsFromHtml(item.p22 || '');
    
    // Build image URL
    const image = item.p11 ? `${BULLSCONNECT_BASE_URL}${item.p11}` : null;
    console.log(`  [photoUrl debug] API p11 raw: ${item.p11 || '(empty)'}`);
    console.log(`  [photoUrl debug] API image URL: ${image || '(null)'}`);

    
    // Build original URL - format: /IEEECS/rsvp?event_uid={eventUid}
    const originalUrl = `${BULLSCONNECT_BASE_URL}/IEEECS/rsvp?event_uid=${item.p2}`;
    
    // Parse registered count
    const registered = item.p10 ? parseInt(item.p10, 10) || 0 : 0;
    
    events.push({
      bullsconnectId: item.p2,
      title: item.p3,
      originalUrl,
      eventUrl: null, // Will be populated when fetching description
      description: null, // Will be populated when fetching description
      photoUrl: image,
      startTime: startDate,
      endTime: endDate,
      venue: { name: 'Register to see venue', isOnline: false },
      rsvpCount: registered,
      tags,
      timezone: 'America/New_York',
      status: 'active',
      eventType: 'physical'
    });
  }
  
  return events;
}

async function upsertEvent(event: ParsedEvent, sql: NeonQueryFunction<false, false>): Promise<{ action: 'inserted' | 'updated' | 'skipped'; id: string | null }> {
  const bullsconnectId = event.bullsconnectId;
  
  if (!bullsconnectId) {
    console.error(`  ❌ Missing bullsconnect_id for event: ${event.title}`);
    return { action: 'skipped', id: null };
  }
  
  try {
    // Check if event exists
    const existing = await sql`
      SELECT id FROM egor.events WHERE bullsconnect_id = ${bullsconnectId}
    `;
    
    if (existing.length > 0) {
      // Update existing event
      await sql`
        UPDATE egor.events SET
          title = ${event.title},
          "originalURL" = ${event.originalUrl},
          "eventURL" = ${event.eventUrl},
          description = ${event.description},
          "photoUrl" = ${event.photoUrl},
          "startTime" = ${event.startTime}::timestamp AT TIME ZONE 'America/New_York',
          "endTime" = ${event.endTime}::timestamp AT TIME ZONE 'America/New_York',
          venue = ${JSON.stringify(event.venue)},
          tags = ${event.tags.length > 0 ? JSON.stringify(event.tags) : null},
          "rsvpCount" = ${event.rsvpCount},
          timezone = ${event.timezone},
          status = ${event.status},
          "eventType" = ${event.eventType}
        WHERE bullsconnect_id = ${bullsconnectId}
      `;
      return { action: 'updated', id: bullsconnectId };
    } else {
      // Insert new event
      await sql`
        INSERT INTO egor.events (
          bullsconnect_id,
          title,
          "originalURL",
          "eventURL",
          description,
          "photoUrl",
          "startTime",
          "endTime",
          venue,
          tags,
          "rsvpCount",
          timezone,
          status,
          "eventType"
        ) VALUES (
          ${bullsconnectId},
          ${event.title},
          ${event.originalUrl},
          ${event.eventUrl},
          ${event.description},
          ${event.photoUrl},
          ${event.startTime}::timestamp AT TIME ZONE 'America/New_York',
          ${event.endTime}::timestamp AT TIME ZONE 'America/New_York',
          ${JSON.stringify(event.venue)},
          ${event.tags.length > 0 ? JSON.stringify(event.tags) : null},
          ${event.rsvpCount},
          ${event.timezone},
          ${event.status},
          ${event.eventType}
        )
      `;
      return { action: 'inserted', id: bullsconnectId };
    }
  } catch (error) {
    console.error(`  ❌ Database error for event ${bullsconnectId}:`, (error as Error).message);
    return { action: 'skipped', id: bullsconnectId };
  }
}

async function main() {
  console.log('🔄 Starting BullsConnect Events Sync\n');
  console.log(`📅 ${new Date().toISOString()}\n`);
  
  // Get database connection
  const sql = getDb();
  
  try {
    console.log('Fetching events from BullsConnect API...\n');
    console.log(`URL: ${EVENTS_API_URL}\n`);
    
    const apiResponse = await fetchJson(EVENTS_API_URL);
    const events = parseApiResponse(apiResponse);
    
    console.log(`Found ${events.length} events. Syncing to database...\n`);
    
    const stats = {
      inserted: 0,
      updated: 0,
      skipped: 0,
      errors: 0
    };
    
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      console.log(`[${i + 1}/${events.length}] Processing: ${event.title}`);
      console.log(`  ID: ${event.bullsconnectId}`);
      console.log(`  URL: ${event.originalUrl}`);
      console.log(`  Event Type: ${event.eventType || 'N/A'}`);
      console.log(`  Status: ${event.status || 'N/A'}`);
      console.log(`  RSVP Count: ${event.rsvpCount}`);
      console.log(`  Tags: ${event.tags.length > 0 ? event.tags.join(', ') : 'none'}`);
      
      try {
        // Fetch description and image from event detail page
        console.log(`  Fetching event details...`);
        const { description, image, finalUrl } = await fetchEventDetails(event.originalUrl);
        event.description = description;
        event.eventUrl = finalUrl;
        // Use image from detail page if available, otherwise keep the one from API
        console.log(`  [photoUrl debug] Before override — API photoUrl: ${event.photoUrl || '(null)'}, detail page image: ${image || '(null)'}`);
        if (image) {
          event.photoUrl = image;
          console.log(`  [photoUrl debug] Overrode with detail page image`);
        } else {
          console.log(`  [photoUrl debug] Kept API photoUrl (no detail page image)`);
        }
        console.log(`  [photoUrl debug] FINAL photoUrl for DB: ${event.photoUrl || '(null)'}`);
        console.log(`  Description: ${description ? description.substring(0, 50) + '...' : 'N/A'}`);
        console.log(`  Photo URL: ${event.photoUrl || 'N/A'}`);
        console.log(`  Event URL: ${event.eventUrl}`);
        
        // Upsert to database
        const { action, id } = await upsertEvent(event, sql);
        
        if (action === 'inserted') {
          console.log(`  ✅ Inserted new event (bullsconnect_id: ${id})\n`);
          stats.inserted++;
        } else if (action === 'updated') {
          console.log(`  🔄 Updated existing event (bullsconnect_id: ${id})\n`);
          stats.updated++;
        } else {
          console.log(`  ⏭️ Skipped event\n`);
          stats.skipped++;
        }
        
        // Small delay to be polite to the server
        await delay(500);
      } catch (e) {
        console.error(`  ✗ Error: ${(e as Error).message}\n`);
        stats.errors++;
      }
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Sync Summary:');
    console.log(`  ✅ Inserted: ${stats.inserted}`);
    console.log(`  🔄 Updated: ${stats.updated}`);
    console.log(`  ⏭️ Skipped: ${stats.skipped}`);
    console.log(`  ❌ Errors: ${stats.errors}`);
    console.log('='.repeat(60) + '\n');
    
    console.log('✅ Sync completed successfully!');
    
    return stats;
  } catch (error) {
    console.error('❌ Fatal error:', (error as Error).message);
    throw error;
  }
}

// Export for use in API routes
export { main as syncEvents };

// Run directly if this is the main module
// Check if running directly via tsx/node
const scriptPath = process.argv[1]?.replace(/\\/g, '/');
const isMainModule = scriptPath && (
  import.meta.url === `file://${scriptPath}` ||
  import.meta.url === `file:///${scriptPath}` ||
  import.meta.url.endsWith('/sync-events.ts')
);

if (isMainModule) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
