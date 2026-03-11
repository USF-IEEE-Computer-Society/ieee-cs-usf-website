import EventsList from "./EventsList"
import SocialsBanner from "@/app/components/SocialsBanner"
import type { Metadata } from 'next'

// Force dynamic rendering - fetch fresh events on every page load
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Join IEEE CS at USF events.',
}

export default function Page() {
  return (
    <div className='w-full flex justify-center p-16 dark:bg-gray-900'>
      <div>

        <h1 className="text-4xl md:text-5xl font-bold mb-3 dark:text-white">Upcoming Events</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Select any event below to register through BullsConnect. Event location details will be available once you complete registration.</p>

        <SocialsBanner />

      <div>
        <EventsList/>
      </div>


      </div>

    </div>
  );
}
