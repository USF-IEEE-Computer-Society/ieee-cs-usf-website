import EventsList from "./EventsList"
import type { Metadata } from 'next'

// Force dynamic rendering - fetch fresh events on every page load
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Join IEEE CS at USF events.',
}

export default function Page() {
  return (
    <div className='w-full flex justify-center p-16'>
      <div>

        <h1 className="text-4xl md:text-5xl font-bold mb-3">Upcoming Events</h1>
        <p className="text-gray-600 mb-12">Select any event below to register through BullsConnect. Event location details will be available once you complete registration.</p>
      <div>
        <EventsList/>
      </div>


      </div>

    </div>
  );
}
