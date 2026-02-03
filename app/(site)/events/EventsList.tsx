import { neon } from '@neondatabase/serverless';

import Event from "./event"

async function getEvents() {
  const sql = neon(process.env.DATABASE_URL!);
  const events = await sql`
    SELECT 
      id,
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
    FROM egor.events
    WHERE "endDate" >= NOW()
    ORDER BY "startDate" ASC
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
    <div className='flex flex-col md:grid md:grid-cols-3 gap-6'>
      {RegularEvents.map((event) => (
        <Event 
          key={event.id}
          id={event.id}
          bullsconnect_id={event.bullsconnect_id}
          name={event.name}
          originalURL={event.originalURL}
          finalURL={event.finalURL}
          description={event.description}
          imageURL={event.imageURL}
          startDate={event.startDate}
          endDate={event.endDate}
          location={event.location}
          tags={event.tags}
          registeredCount={event.registeredCount}
        />
      ))}
    </div>
  );
}