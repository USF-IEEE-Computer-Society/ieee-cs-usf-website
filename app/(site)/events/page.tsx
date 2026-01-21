import EventsList from "./EventsList"

export default function Page() {
  return (
    <div className='w-full flex justify-center p-7'>
      <div>

        <h1 className="text-4xl font-bold mb-3">Upcoming Events</h1>
        <p className="mb-10">Click on each event to register on BullsConnect</p>
      <div>
        <EventsList/>
      </div>


      </div>

    </div>
  );
}
