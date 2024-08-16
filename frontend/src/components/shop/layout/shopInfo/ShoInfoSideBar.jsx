import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadShop } from "../../../../store/actions/shopAction";
function ShoInfoSideBar({ isOwner }) {
  const { shopData, allShopProducts, shopInfo } = useSelector(
    (state) => state.shop
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await fetch("/api/shop/logout", {headers:{'ngrok-skip-browser-warning': 'any-value'}} )
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
        dispatch(loadShop());
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className=" w-full flex flex-col   sticky top-0 left-0">
      <div className=" flex w-full items-center justify-center h-[35%] flex-col gap-4">
        <img
          src={shopInfo && shopInfo.avatar}
          alt=""
          className=" h-20 w-20 md:w-[150px] md:h-[150px] rounded-full lg:w-[200px] lg:h-[200px]"
        />
        <span className=" md:font-bold font-semibold md:text-2xl lg:md:text-3xl text-lg">
          {shopInfo && shopInfo.shopName}
        </span>
      </div>
      <div className=" flex flex-col p-1 md:px-6 gap-2 ">
        <div className=" flex flex-col gap-2">
          <p className=" font-bold md:text-xl lg:text-2xl   text-lg">Address</p>
          <p className=" font-semibold md:text-xl text-sm text-gray-600 text-[10px]  ">
            {" "}
            {shopInfo && shopInfo.address}
          </p>
        </div>
        <div className=" flex flex-col gap-2">
          <p className="  font-bold md:text-xl lg:text-2xl   text-lg">
            Phone Number
          </p>
          <p className=" font-semibold md:text-xl text-sm text-gray-600  text-[10px]">
            {" "}
            {shopInfo && shopInfo.phoneNumber}
          </p>
        </div>
        <div className=" flex flex-col gap-2">
          <p className="  font-bold md:text-xl lg:text-2xl  text-lg">
            Total Products
          </p>
          <p className=" font-semibold md:text-xl text-sm text-gray-600  text-[10px] ">
            {allShopProducts && allShopProducts.length}
          </p>
        </div>
        <div className=" flex flex-col gap-2">
          <p className="  font-bold md:text-xl lg:text-2xl   text-lg">
            Shop Ratings
          </p>
          <p className=" font-semibold md:text-xl text-sm text-gray-600 text-[10px] ">
            4.3
          </p>
        </div>
        <div className=" flex flex-col gap-2">
          <p className="  font-bold md:text-xl lg:text-2xl   text-lg">
            Joind on
          </p>
          <p className=" font-semibold md:text-xl text-sm text-gray-600 text-[10px] ">
            {shopInfo && shopInfo.createdAt.slice(0, 10)}
          </p>
        </div>
      </div>

      {isOwner && (
        <div
          className=" w-full flex gap-2 md:p-4 p-1 flex-col 
       "
        >
          <button className=" p-1 md:p-2  rounded-md text-[12px]  md:text-lg md:rounded-lg bg-black text-white md:font-semibold ">
            Edit Shop
          </button>
          <button className="   text-red-700 font-bold " onClick={handleLogout}>
            logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ShoInfoSideBar;
