import EventsList from "./EventsList"
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Join IEEE CS at USF events.',
}

export default function Page() {
  return (
    <main className="min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-14">
          <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-ieeeOrange mb-2 block">
            What&apos;s Next
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            Upcoming Events
          </h1>
          <p className="text-muted text-lg max-w-2xl">
            Select any event below to register through BullsConnect. Event location details will be available once you complete registration.
          </p>
        </div>

        <EventsList />
      </div>
    </main>
  );
}
