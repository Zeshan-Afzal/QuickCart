import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
function DashHeader() {
  const { shopData } = useSelector((state) => state.shop);
  return (
    <div className=" z-30 w-full h-[80px] bg-white shadow-sm  flex items-center justify-between px-10 sticky left-0 top-0 z-10 ">
      <Link to={`/shop-dash/${shopData && shopData.shop._id}`} className="">
        <span className=" text-blue-600 md:text-3xl font-bold font-serif  text-xl">
          Quick
        </span>
        <span className=" text-orange-600 md:text-3xl font-bold font-serif  text-xl">
          Cart
        </span>
      </Link>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/cupouns" className="md:block hidden">
            <AiOutlineGift
              color="black"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-events" className="md:block hidden">
            <MdOutlineLocalOffer
              color="black"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className="md:block hidden">
            <FiShoppingBag
              color="black"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="md:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/dashboard-messages" className="800px:block hidden">
            <BiMessageSquareDetail
              color="black"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={`/shop/${shopData && shopData.shop._id}`}>
            <img
              src={`${shopData && shopData.shop.avatar} `}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashHeader;
