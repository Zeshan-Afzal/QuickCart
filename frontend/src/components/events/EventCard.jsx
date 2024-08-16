import React from "react";
import Countdown from "./CountDown";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function EventCard({ data, seeMore }) {
  return (
    <div className=" grid grid-rows-1 lg:grid-cols-2">
      <div className=" p-4 flex items-center justify-center">
        <img src={data && data.images[0].url} alt="" />
      </div>
      <div className=" py-2 md:py-8  pr-8 flex-col flex gap-5 md:mb-5">
        <div className="">
          <p className=" text-2xl md:text-3xl font-sans font-semibold md:font-bold py-3">
            {data && data.productName}
          </p>
          <span className=" md:text-xl md:font-semibold  text-sm line-clamp-6 md:line-clamp-none">
            {data && data.description}
          </span>
        </div>
        <div className=" flex  justify-between items-center">
          <div className=" flex gap-2">
            <p className=" font-semibold md:font-bold  text-2xl">
              {" "}
              ${data && data.discountedPrice}
            </p>
            {data && data.originalPrice && (
              <span className=" text-red-500 line-through">
                {" "}
                ${data && data.originalPrice}
              </span>
            )}
          </div>
          <p className=" text-xl font-semibold text-green-600">
            {data && data.sold} Sold
          </p>
        </div>
        <Countdown endDate={data && data.endDate} />

        <div className=" flex gap-7">
          <button className="p-1  md:p-4 rounded-md hover:opacity-95 bg-blue-900 transition-none duration-200 w-28 md:w-44 text-white md:font-bold  md:font-serif flex  md:gap-2 justify-center items-center">
            See Details
          </button>
          <button className="p-1  md:p-4 rounded-md hover:opacity-95 bg-blue-900 transition-none duration-200 w-28 md:w-44 text-white md:font-bold  md:font-serif flex  md:gap-2 justify-center items-center">
            Buy Now
          </button>
        </div>

        {seeMore && (
          <Link
            to={`/events`}
            className=" text-blue-600 md:text-2xl cursor-pointer self-end flex items-center md:gap-3 mt-3"
          >
            see more events
            <FaArrowRight />
          </Link>
        )}
      </div>
    </div>
  );
}
