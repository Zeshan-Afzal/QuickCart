import React, { useEffect } from "react";
import { productData } from "../../../../static/data";
import ProductCard from "../../../productCard/ProductCard";
import Loader from "../../../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopItems } from "../../../../store/actions/shopAction";
import { useParams } from "react-router-dom";
import EventCard from "../../../events/EventCard";
import ShoInfoSideBar from "./ShoInfoSideBar";

function ShopData({ setActive, active, isOwner }) {
  const {
    shopData,
    allShopProducts,
    allShopEvents,
    isAllShopEventsloading,
    isAllShopProductsloading,
  } = useSelector((state) => state.shop);
  console.log(allShopEvents);
  return (
    <div className=" flex-col gap-3 flex w-full ">
      <div className=" flex gap-4 bg-white shadow-sm px-2 md:p-4 p-2 justify-center">
        <span
          className={`${
            active === 1 && "text-red-600"
          }  cursor-pointer  font-bold text-lg lg:text-2xl block md:hidden`}
          onClick={() => setActive(1)}
        >
          {" "}
          Profile Info
        </span>
        <span
          className={`${
            active === 2 && "text-red-600 "
          }  cursor-pointer  font-bold text-lg md:text-lg lg:text-2xl `}
          onClick={() => setActive(2)}
        >
          {" "}
          Shop Products
        </span>
        <span
          className={`${
            active === 3 && "text-red-600"
          } cursor-pointer  font-bold text-lg lg:text-2xl `}
          onClick={() => setActive(3)}
        >
          {" "}
          Running Events
        </span>
        <span
          className={`${
            active === 4 && "text-red-600"
          }  cursor-pointer  font-bold text-lg lg:text-2xl`}
          onClick={() => setActive(4)}
        >
          {" "}
          Shop reviews
        </span>
      </div>
      {active === 1 && (
        <div className=" block md:hidden px-2 md:min-w-[30%] bg-white shadow-sm sticky overflow-auto scrollbar-hide  top-0 left-0  h-screen z-20 py-6">
          <ShoInfoSideBar isOwner={isOwner} />
        </div>
      )}
      {isAllShopProductsloading || (isAllShopEventsloading && <Loader />)}
      {active === 2 && !isAllShopProductsloading && (
        <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2  md:gap-4 ">
          {allShopProducts &&
            allShopProducts.length > 0 &&
            allShopProducts.map((item, i) => (
              <ProductCard key={i} product={item} />
            ))}
        </div>
      )}
      {active === 3 && !isAllShopEventsloading && (
        <div>
          <div className="max-w-[100%] p-1 md:p-4 shadow-sm mx-auto rounded-md gap-3 flex flex-col ">
            {allShopEvents &&
              allShopEvents.map((event) => (
                <div className="w-full bg-white grid p-4 gap-3">
                  <EventCard data={event} seeMore={true} />
                </div>
              ))}
          </div>
        </div>
      )}
      {active === 4 && !isAllShopEventsloading && (
        <div className=" w-full flex items-center justify-center h-[40vh]">
          <span className=" font-semibold text-2xl  self-center ">
            No reviews
          </span>
        </div>
      )}
    </div>
  );
}

export default ShopData;
