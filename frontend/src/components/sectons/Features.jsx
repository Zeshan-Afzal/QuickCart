import React, { useEffect } from "react";
import { brandingData } from "../../static/featers";
function Features() {
  useEffect(() => {}, []);
  return (
    <div className="hidden sm:flex w-[90%] mx-auto bg-white shadow-sm p-4  mt-12 rounded-lg gap-4 justify-around">
      {brandingData &&
        brandingData.map((item, i) => (
          <div className=" flex items-center gap-2" key={i}>
            {item.icon}
            <div className=" flex flex-col gap-1">
              <span className=" font-bold text-lg">{item.title}</span>
              <span>{item.Description}</span>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Features;
