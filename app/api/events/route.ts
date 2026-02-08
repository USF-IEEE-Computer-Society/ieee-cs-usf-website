import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const runtime = 'nodejs';
export const revalidate = 60; // ISR: revalidate every 60 seconds

const GROUP_INFO = {
  id: 'ieee-cs-usf',
  name: 'IEEE Computer Society at USF',
  description: 'University of South Florida IEEE Computer Society chapter',
  urlname: 'ieee-cs-usf',
  link: 'https://ieeecsusf.com',
  memberCount: 649,
  photoUrl: 'https://ieeecsusf.com/ieee_cs_usf_logo_black.png',
} as const;

function formatISO8601Duration(start: string | null, end: string | null): string | null {
  if (!start || !end) return null;

  const diffMs = new Date(end).getTime() - new Date(start).getTime();
  if (diffMs <= 0) return null;

  const totalMinutes = Math.round(diffMs / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) return `PT${hours}H${minutes}M`;
  if (hours > 0) return `PT${hours}H`;
  return `PT${minutes}M`;
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.EVENTS_API_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const sql = neon(process.env.DATABASE_URL!);

    const rows = await sql`
      SELECT
        bullsconnect_id,
        title,
        description,
        "eventURL",
        "startTime",
        "endTime",
        timezone,
        status,
        "eventType",
        "rsvpCount",
        venue,
        "photoUrl"
      FROM egor.events
      WHERE "endTime" >= NOW()
      ORDER BY "startTime" ASC
    `;

    const events = rows.map((row) => ({
      id: row.bullsconnect_id,
      title: row.title,
      description: row.description,
      eventUrl: row.eventURL,
      startTime: row.startTime,
      endTime: row.endTime,
      timezone: row.timezone ?? 'America/New_York',
      status: row.status ?? 'active',
      eventType: row.eventType ?? 'physical',
      rsvpCount: row.rsvpCount ?? 0,
      duration: formatISO8601Duration(row.startTime, row.endTime),
      venue: row.venue ?? { name: 'Register', isOnline: false },
      photoUrl: row.photoUrl ?? null,
    }));

    return NextResponse.json(
      { events, group: GROUP_INFO },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      },
    );
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 },
    );
  }
}
