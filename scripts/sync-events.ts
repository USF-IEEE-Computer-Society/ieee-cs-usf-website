import https from 'https';
import http from 'http';
import * as cheerio from 'cheerio';
import type { Element } from 'domhandler';
import { URL } from 'url';
import { neon, NeonQueryFunction } from '@neondatabase/serverless';

// Load environment variables only in local development
if (process.env.NODE_ENV !== 'production') {
  const { config } = require('dotenv');
  config({ path: '.env.local' });
}

const EVENTS_URL = 'https://bullsconnect.usf.edu/ieeecs/events/';

// Database connection - initialized lazily
function getDb(): NeonQueryFunction<false, false> {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return neon(DATABASE_URL);
}

interface EventLocation {
  name: string | null;
  address: string | null;
}

interface ScrapedEvent {
  name: string;
  originalUrl: string;
  finalUrl?: string;
  description: string | null;
  image: string | null;
  startDate: string | null;
  endDate: string | null;
  location: EventLocation | null;
  registered: number | null;
  tags: string[];
  error?: string;
}

function fetchPage(urlString: string, maxRedirects = 10): Promise<{ html: string; finalUrl: string }> {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) {
      return reject(new Error('Too many redirects'));
    }

    const parsedUrl = new URL(urlString);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;
    
    const headers: Record<string, string> = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
    };
    
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers
    };

    const req = protocol.request(options, (res) => {
      // Handle redirects (301, 302, 303, 307, 308)
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        
        // Handle relative URLs
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, urlString).href;
        }
        
        console.log(`  Redirect: ${res.statusCode} -> ${redirectUrl}`);
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

async function parseEventsList(html: string): Promise<{ name: string; url: string }[]> {
  const $ = cheerio.load(html);
  
  const events: { name: string; url: string }[] = [];
  
  $('div.feature').each((_: number, div: Element) => {
    try {
      const titleLink = $(div).find('h3.h4 a');
      const title = titleLink.text()?.trim() || null;
      const eventUrl = titleLink.attr('href') || null;
      
      if (title && eventUrl) {
        events.push({
          name: title,
          url: eventUrl.startsWith('http') ? eventUrl : `https://bullsconnect.usf.edu${eventUrl}`
        });
      }
    } catch (e) {
      // Skip problematic entries
    }
  });
  
  return events;
}

async function parseEventDetails(html: string, finalUrl: string): Promise<{
  description: string | null;
  image: string | null;
  startDate: string | null;
  endDate: string | null;
  location: EventLocation | null;
  registered: number | null;
  tags: string[];
  finalUrl: string;
}> {
  const $ = cheerio.load(html);
  
  const details: {
    description: string | null;
    image: string | null;
    startDate: string | null;
    endDate: string | null;
    location: EventLocation | null;
    registered: number | null;
    tags: string[];
    finalUrl: string;
  } = {
    description: null,
    image: null,
    startDate: null,
    endDate: null,
    location: null,
    registered: null,
    tags: [],
    finalUrl: finalUrl
  };
  
  // Try to parse JSON-LD schema - may have multiple scripts, find the Event one
  $('script[type="application/ld+json"]').each((_: number, script: Element) => {
    try {
      const jsonData = JSON.parse($(script).html() || '{}');
      
      // Handle both direct Event type and @graph array
      let eventData = null;
      if (jsonData['@type'] === 'Event') {
        eventData = jsonData;
      } else if (jsonData['@graph']) {
        // Look for Event in @graph array
        eventData = jsonData['@graph'].find((item: { '@type': string }) => item['@type'] === 'Event');
      }
      
      if (eventData) {
        details.description = eventData.description || null;
        details.startDate = eventData.startDate || null;
        details.endDate = eventData.endDate || null;
        
        // Image can be an array or string
        if (eventData.image) {
          details.image = Array.isArray(eventData.image) ? eventData.image[0] : eventData.image;
        }
        
        // Location is not fetched (requires authentication)
        // details.location remains null
        
        // Found Event data, return false to break the loop
        return false;
      }
    } catch (e) {
      console.error('  Error parsing JSON-LD:', (e as Error).message);
    }
  });
  
  // Get registered count - look for the number before "Registered"
  $('div').each((_: number, div: Element) => {
    if ($(div).text()?.trim() === 'Registered') {
      const parent = $(div).parent();
      const numberSpan = parent.find('span.number');
      if (numberSpan.length) {
        details.registered = parseInt(numberSpan.text()?.trim() || '0', 10) || 0;
        return false; // break the loop
      }
    }
  });
  
  // Alternative: try to find number span near "Registered" text
  if (details.registered === null) {
    const allText = $.html();
    const match = allText.match(/<span[^>]*class="number"[^>]*>(\d+)<\/span>[\s\S]*?Registered/i);
    if (match) {
      details.registered = parseInt(match[1], 10) || 0;
    }
  }
  
  // Extract tags - they are in <a> elements with href containing "topic_tags" 
  // or in <span class="label label-tag"> elements
  const tagsSet = new Set<string>();
  
  $('a[href*="topic_tags"], a[href*="event_type"]').each((_: number, link: Element) => {
    // Get the text content, which might be nested in spans
    const text = $(link).text()?.trim();
    if (text && text.length > 0 && text.length < 100) {
      tagsSet.add(text);
    }
  });
  
  // Also try to find tags by label class
  $('span.label-tag, span.label-default').each((_: number, span: Element) => {
    const text = $(span).text()?.trim();
    if (text && text.length > 0 && text.length < 100) {
      tagsSet.add(text);
    }
  });
  
  details.tags = Array.from(tagsSet);
  
  return details;
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Extract bullsconnect_id from event URL
 * Example URL: https://bullsconnect.usf.edu/IEEECS/rsvp?event_uid=bb650104e7ec9368730781fca801b468
 * Returns: "bb650104e7ec9368730781fca801b468"
 */
function extractBullsconnectId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    
    // First, check for event_uid query parameter
    const eventUid = parsedUrl.searchParams.get('event_uid');
    if (eventUid) {
      return eventUid;
    }
    
    // Fallback: look in path for ID patterns
    const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
    for (const part of pathParts) {
      // Match hex-like IDs (like bb650104e7ec9368730781fca801b468)
      if (/^[a-f0-9]{32}$/i.test(part)) {
        return part;
      }
    }
    
    return null;
  } catch {
    return null;
  }
}

async function upsertEvent(event: ScrapedEvent, sql: NeonQueryFunction<false, false>): Promise<{ action: 'inserted' | 'updated' | 'skipped'; id: string | null }> {
  // Try originalUrl first (has event_uid), then finalUrl as fallback
  const bullsconnectId = extractBullsconnectId(event.originalUrl) || extractBullsconnectId(event.finalUrl || '');
  
  if (!bullsconnectId) {
    console.error(`  ❌ Could not extract bullsconnect_id from URLs:`);
    console.error(`     Original: ${event.originalUrl}`);
    console.error(`     Final: ${event.finalUrl}`);
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
          name = ${event.name},
          "originalURL" = ${event.originalUrl},
          "finalURL" = ${event.finalUrl || null},
          description = ${event.description},
          "imageURL" = ${event.image},
          "startDate" = ${event.startDate ? new Date(event.startDate).toISOString() : null},
          "endDate" = ${event.endDate ? new Date(event.endDate).toISOString() : null},
          location = ${event.location ? JSON.stringify(event.location) : null},
          tags = ${event.tags.length > 0 ? JSON.stringify(event.tags) : null},
          "registeredCount" = ${event.registered}
        WHERE bullsconnect_id = ${bullsconnectId}
      `;
      return { action: 'updated', id: bullsconnectId };
    } else {
      // Insert new event
      await sql`
        INSERT INTO egor.events (
          bullsconnect_id,
          name,
          "originalURL",
          "finalURL",
          description,
          "imageURL",
          "startDate",
          "endDate",
          location,
          tags,
          "registeredCount"
        ) VALUES (
          ${bullsconnectId},
          ${event.name},
          ${event.originalUrl},
          ${event.finalUrl || null},
          ${event.description},
          ${event.image},
          ${event.startDate ? new Date(event.startDate).toISOString() : null},
          ${event.endDate ? new Date(event.endDate).toISOString() : null},
          ${event.location ? JSON.stringify(event.location) : null},
          ${event.tags.length > 0 ? JSON.stringify(event.tags) : null},
          ${event.registered}
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
    console.log('Fetching events list from IEEE CS USF...\n');
    
    const { html } = await fetchPage(EVENTS_URL);
    const eventsList = await parseEventsList(html);
    
    console.log(`Found ${eventsList.length} events. Fetching details and syncing to database...\n`);
    
    const stats = {
      inserted: 0,
      updated: 0,
      skipped: 0,
      errors: 0
    };
    
    for (let i = 0; i < eventsList.length; i++) {
      const event = eventsList[i];
      console.log(`[${i + 1}/${eventsList.length}] Fetching: ${event.name}`);
      console.log(`  URL: ${event.url}`);
      
      try {
        const { html: eventHtml, finalUrl } = await fetchPage(event.url);
        const details = await parseEventDetails(eventHtml, finalUrl);
        
        const scrapedEvent: ScrapedEvent = {
          name: event.name,
          originalUrl: event.url,
          finalUrl: details.finalUrl,
          description: details.description,
          image: details.image,
          startDate: details.startDate,
          endDate: details.endDate,
          location: details.location,
          registered: details.registered,
          tags: details.tags
        };
        
        console.log(`  ✓ Got details (registered: ${details.registered}, tags: ${details.tags.length}, location: ${details.location ? 'yes' : 'no'})`);
        
        // Upsert to database
        const { action, id } = await upsertEvent(scrapedEvent, sql);
        
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
const isMainModule = import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}`;
if (isMainModule) {
  main().catch(() => process.exit(1));
}
