import { neon } from '@neondatabase/serverless';

import Event from "./event"

async function getEvents() {
  const sql = neon(process.env.DATABASE_URL!);
  const events = await sql`
    SELECT 
      id,
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
      "rsvpCount"
    FROM egor.events
    WHERE "endTime" >= NOW()
    ORDER BY "startTime" ASC
  `;
  return events;
}

export default async function EventsList() {
  const events = await getEvents();
  let TablingEvents = []
  let RegularEvents = []

  for (let i = 0; i < events.length; i++) {
    if (events[i].tags?.includes("Tabling")) {
      TablingEvents.push(events[i])
    } else {
      RegularEvents.push(events[i])
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {RegularEvents.map((event) => (
        <Event 
          key={event.id}
          id={event.id}
          bullsconnect_id={event.bullsconnect_id}
          title={event.title}
          originalURL={event.originalURL}
          eventURL={event.eventURL}
          description={event.description}
          photoUrl={event.photoUrl}
          startTime={event.startTime}
          endTime={event.endTime}
          venue={event.venue}
          tags={event.tags}
          rsvpCount={event.rsvpCount}
        />
      ))}
    </div>
  );
}
