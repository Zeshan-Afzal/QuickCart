import React, { useEffect } from "react";
import Events from "../components/events/Evants";
import { useSelector } from "react-redux";
import EventCard from "../components/events/EventCard";

function EventsPage() {
  const { AllProducts, AllEvents } = useSelector((state) => state.shop);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className=" flex flex-col gap-8 ">
      <div className="max-w-[90%] p-4 shadow-sm mx-auto rounded-md flex flex-col gap-4 ">
        {AllEvents &&
          AllEvents.map((event) => (
            <div className="w-full bg-white grid p-4">
              <EventCard data={event} seeMore={false} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default EventsPage;
