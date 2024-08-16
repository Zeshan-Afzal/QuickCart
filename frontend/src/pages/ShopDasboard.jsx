import React, { useState, useEffect } from "react";
import DashHeader from "../components/shop/layout/DashHeader";
import DashSideBar from "../components/shop/layout/DashSideBar";
import CreateProduct from "../components/shop/layout/CreateProduct";
import { useDispatch, useSelector } from "react-redux";
import DashAllProducts from "../components/shop/layout/DashAllProducts";
import CreateEvent from "../components/shop/layout/CreateEvent";
import DashAllEvents from "../components/shop/layout/DashAllEvents";
import CoupenCodes from "../components/shop/layout/CoupenCodes";

function ShopDasboard() {
  const { isLoading } = useSelector((state) => state.shop);

  const [active, setActive] = useState(1);
  useEffect(() => {
    const data = localStorage.getItem("active");
    if (data) {
      const newData = JSON.parse(data);
      console.log(newData);
      setActive(newData);
    }
  }, []);
  setInterval(function () {
    localStorage.clear();
  }, 30000);
  return (
    <>
      <DashHeader />
      <div className=" flex gap-2 w-full">
        <div className=" w-24 md:w-[300px]  sticky top-1 left-1 shadow-sm h-screen bg-white overflow-auto scrollbar-hide">
          <DashSideBar active={active} setActive={setActive} />
        </div>
        {active === 4 && (
          <div className=" w-full flex  justify-center ">
            <CreateProduct active={active} setActive={setActive} />
          </div>
        )}
        {active === 3 && (
          <div className=" md:w-full w-[80%] mx-auto flex  justify-center ">
            <DashAllProducts active={active} setActive={setActive} />
          </div>
        )}
        {active === 6 && (
          <div className=" w-full flex  justify-center ">
            <CreateEvent active={active} setActive={setActive} />
          </div>
        )}
        {active === 5 && (
          <div className="md:w-full w-[80%] mx-auto flex  justify-center ">
            <DashAllEvents active={active} setActive={setActive} />
          </div>
        )}
        {active === 9 && (
          <>
            <div className=" md:w-full w-[80%] mx-auto flex  justify-center   h-[800px]">
              <CoupenCodes />
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default ShopDasboard;
