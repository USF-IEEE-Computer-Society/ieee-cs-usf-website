import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('Starting scheduled events sync...');

    const mod = await import('@/scripts/sync-events');
    const stats = await mod.syncEvents();

    return NextResponse.json({ success: true, message: 'Events sync completed', stats });
  } catch (err) {
    console.error('Cron sync failed:', err);
    return NextResponse.json(
      {
        error: 'Sync failed',
        message: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
