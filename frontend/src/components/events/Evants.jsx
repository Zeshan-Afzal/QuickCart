import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { productData } from "../../static/data";
function Evants({ event }) {
  const [evnetData, setEventData] = useState(null);
  useEffect(() => {
    setEventData(productData[0]);
  }, []);
  return (
    <div>
      <div className="max-w-[90%] p-4 shadow-sm mx-auto rounded-md ">
        <h1 className=" font-semibold md:font-bold font-serif text-xl md:text-3xl mb-7">
          Ongoing Events
        </h1>

        <div className="w-full bg-white grid p-4">
          {evnetData && evnetData ? (
            <EventCard data={event} seeMore={true} />
          ) : (
            <h4>'No Events have!'</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default Evants;
