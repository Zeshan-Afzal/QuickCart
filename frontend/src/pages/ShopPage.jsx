import React, { useEffect, useState } from "react";
import ShoInfoSideBar from "../components/shop/layout/shopInfo/ShoInfoSideBar";
import ShopData from "../components/shop/layout/shopInfo/ShopData";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllShopEvents,
  getAllShopItems,
  getShopInfo,
  loadShop,
} from "../store/actions/shopAction";
import { useParams } from "react-router-dom";
import Loader from "../components/layout/Loader";
import DashHeader from "../components/shop/layout/DashHeader";

function ShopPage() {
  const { id } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const {
    shopData,
    allShopProducts,
    isLoading,
    shopInfo,
    isShopInfoloading,
    isAllShopProductsloading,
  } = useSelector((state) => state.shop);

  const [active, setActive] = useState(window.innerWidth > 760 ? 2 : 1);
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(getAllShopItems(id));
    dispatch(getAllShopEvents(id));
    dispatch(getShopInfo(id));
  }, [useParams]);
  useEffect(() => {
    setIsOwner(false);
  

    if (String(shopData && shopData.shop._id) === String(id)) {
     

      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, []);
  return isShopInfoloading && isAllShopProductsloading ? (
    <Loader />
  ) : (
    <>
      <div className=" w-full md:flex hidden ">
        <div className=" px-2 md:min-w-[30%] bg-white shadow-sm sticky overflow-auto scrollbar-hide  top-0 left-0  h-screen z-20 py-6">
          <ShoInfoSideBar isOwner={isOwner} />
        </div>
        <div className="p-1 md:p-5  w-full">
          <ShopData setActive={setActive} active={active} />
        </div>
      </div>
      <div className=" w-full flex md:hidden  ">
        <div className="p-1 md:p-5  w-full">
          <ShopData setActive={setActive} active={active} isOwner={isOwner} />
        </div>
      </div>
    </>
  );
}

export default ShopPage;
