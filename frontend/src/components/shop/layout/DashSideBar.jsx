import React, { useEffect, useState } from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link, json } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

function DashSideBar({ active, setActive }) {
  const data = [
    {
      id: 1,
      text: "Dashboard",
      icon: (
        <RxDashboard size={30} color={`${active === 1 ? "crimson" : "#555"}`} />
      ),
    },
    {
      id: 2,
      text: "All Orders",
      icon: (
        <FiShoppingBag
          size={30}
          color={`${active === 2 ? "crimson" : "#555"}`}
        />
      ),
    },
    {
      id: 3,
      text: "All Products",
      icon: (
        <FiPackage size={30} color={`${active === 3 ? "crimson" : "#555"}`} />
      ),
    },
    {
      id: 4,
      text: "Create Product",
      icon: (
        <AiOutlineFolderAdd
          size={30}
          color={`${active === 4 ? "crimson" : "#555"}`}
        />
      ),
    },
    {
      id: 5,
      text: "All Events",
      icon: (
        <MdOutlineLocalOffer
          size={30}
          color={`${active === 5 ? "crimson" : "#555"}`}
        />
      ),
    },
    {
      id: 6,
      text: "Create Event",
      icon: (
        <VscNewFile size={30} color={`${active === 6 ? "crimson" : "#555"}`} />
      ),
    },
    {
      id: 7,
      text: "Withdraw Money",
      icon: (
        <CiMoneyBill size={30} color={`${active === 7 ? "crimson" : "#555"}`} />
      ),
    },
    {
      id: 8,
      text: "Shop Inbox",
      icon: (
        <BiMessageSquareDetail
          size={30}
          color={`${active === 2 ? "crimson" : "#555"}`}
        />
      ),
    },
    {
      id: 9,
      text: "Discount Codes",
      icon: (
        <AiOutlineGift
          size={30}
          color={`${active === 9 ? "crimson" : "#555"}`}
        />
      ),
    },
    {
      id: 10,
      text: "Refunds",
      icon: (
        <HiOutlineReceiptRefund
          size={30}
          color={`${active === 10 ? "crimson" : "#555"}`}
        />
      ),
    },
    {
      id: 11,
      text: "Settings",
      icon: (
        <CiSettings size={30} color={`${active === 11 ? "crimson" : "#555"}`} />
      ),
    },
  ];
  const handleActive = (id) => {
    localStorage.setItem("active", JSON.stringify(id));
    setActive(id);
  };

  return (
    <div className=" flex flex-col px-4 w-full ">
      {data.map((item) => (
        <div
          className="w-full flex items-center py-3 md:p-4 hover:bg-gray-100 transition-all duration-200 "
          onClick={() => handleActive(item.id)}
          key={item.id}
        >
          <SibarItems
            icon={item.icon}
            id={item.id}
            text={item.text}
            active={active}
          />
        </div>
      ))}
    </div>
  );
}
export default DashSideBar;

const SibarItems = ({ to, icon, active, text, id }) => {
  return (
    <Link className="w-full flex items-center gap-2">
      {icon}
      <h5
        className={`hidden md:block pl-2 text-[18px] font-semibold ${
          active === id ? "text-[crimson]" : "text-[#555]"
        }`}
      >
        {text}
      </h5>
    </Link>
  );
};
