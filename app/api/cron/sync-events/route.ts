import { NextResponse } from 'next/server';
import { syncEvents } from '@/scripts/sync-events';

export const runtime = 'nodejs';
export const maxDuration = 60; // Hobby plan limit is 60 seconds

export async function GET(request: Request) {
  // Verify the request is from Vercel Cron (security)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    console.log('Starting scheduled events sync...');
    const stats = await syncEvents();
    
    return NextResponse.json({
      success: true,
      message: 'Events sync completed',
      stats
    });
  } catch (error) {
    console.error('Cron sync failed:', error);
    return NextResponse.json(
      { error: 'Sync failed', message: (error as Error).message },
      { status: 500 }
    );
  }
}
