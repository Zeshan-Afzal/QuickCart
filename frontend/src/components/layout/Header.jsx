import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { GrFavorite } from "react-icons/gr";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { productData, navItems, categoriesData } from "../../static/data";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import NavItems from "./NavItems";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import WishList from "./WishList";
import MobileSideBar from "./MobileSideBar";
import { ImCart } from "react-icons/im";

function Header() {
  const { isAuthenticated, userData } = useSelector((state) => state.user);
  const { isSeller, shopData, AllProducts } = useSelector(
    (state) => state.shop
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [dropDown, setDrowDown] = useState(false);
  const [active, setActive] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const {cart} =useSelector((state)=>state.cart)
  
  const {wishlist} =useSelector((state)=>state.wishlist)
  

  const [resultData, setResultData] = useState(null);
  const handleOnInputChange = (e) => {
    const value = e.target.value;

    setSearchQuery(value);
    setResultData(
      AllProducts &&
        AllProducts.length > 0 &&
        AllProducts.filter((item, index) =>
          item.productName.toLowerCase().includes(value.toLowerCase())
        )
    );
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);

      if (window.innerWidth > 768) {
        setSearchQuery("");
      }
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className=" h-20 w-full hidden md:flex  items-center justify-around shadow-lg">
        <Link to="/" className="flex items-center ">
          <span className=" font-bold text-blue-700 text-3xl font-serif ">
            Quick
          </span>
          <span className=" font-bold text-orange-600 text-3xl font-serif  ">
            Cart
          </span>
        </Link>

        <div className=" relative w-6/12 ">
          <input
            value={searchQuery}
            onChange={handleOnInputChange}
            type="text"
            className=" p-2 w-full border border-blue-400 outline-none bg-slate-100 rounded-sm "
            placeholder="Search products..."
          />
          <AiOutlineSearch
            size={20}
            className=" absolute right-2 top-3 bg-slate-100 z-10 cursor-pointer"
          />
          {resultData && searchQuery !== "" && (
            <div className=" w-full  max-h-[70vh] overflow-auto absolute top-11  bg-slate-100  z-20 scrollbar-hide   ">
              {resultData.map((item, i) => (
                <Link
                  key={i}
                  onClick={() => setSearchQuery("")}
                  to={`/product/${item._id}`}
                  className=" w-full h-24 flex gap-2 p-2   items-center border-b hover:bg-gray-200 transition-all duration-200 "
                >
                  <img
                    src={item.images[0].url}
                    alt=""
                    className=" w-20 h-20  "
                  />
                  <span className=" font-serif  font-semibold">
                    {" "}
                    {item.productName}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {!isSeller ? (
          <Link
            to={"/seller-sign-up"}
            className=" p-3 gap-2 bg-blue-900  text-white rounded-lg flex  items-center font-serif "
          >
            {" "}
            Become seller
            <IoIosArrowForward />
          </Link>
        ) : (
          <Link
            to={`/shop-dash/${shopData && shopData.shop._id}`}
            className=" p-3 gap-2 bg-blue-900  text-white rounded-lg flex  items-center font-serif "
          >
            {" "}
            Visit Shop
            <IoIosArrowForward />
          </Link>
        )}
      </div>
      <div
        className={`${
          active ? "fixed top-0 left-0 z-50" : ""
        }  w-full hidden md:flex justify-around h-16 items-center  text-white transition-all duration-200 `}
        style={{ backgroundColor: "rgb(218 128 20)" }}
      >
        <div className="relative mt-[8px]  flex items-center justify-between bg-white p-2 w-52 rounded-tl-md rounded-tr-md cursor-pointer">
          <div
            className=" flex items-center gap-1 w-full justify-between "
            onClick={() => setDrowDown((prev) => !prev)}
          >
            <BiMenuAltLeft size={20} className="text-black" />
            <button className=" p-2 text-black rounded-lg font-bold font-serif ">
              All Catagories
            </button>
            <IoIosArrowDown size={20} className=" text-black "></IoIosArrowDown>
          </div>

          {dropDown && (
            <DropDown
              categoriesData={categoriesData}
              setDrowDown={setDrowDown}
            />
          )}
        </div>

        <NavItems navItems={navItems} />

        <div className="flex items-center gap-6">
          <div
            onClick={() => setOpenWishList(true)}
            className=" relative cursor-pointer"
          >
            <div className=" flex flex-col gap-0 items-center">
                                
             <GrFavorite size={25} />
                  <span className=" font-semibold  text-white">wishlist</span>
            </div>
            <span className=" absolute bottom-[38px] left-[36px] z-10  text-red-800 font-serif font-semibold text-lg">
            {wishlist && wishlist.length}
            </span>
          </div>
          <div
            onClick={() => setOpenCart(true)}
            className=" relative cursor-pointer"
          >
            <div className=" flex flex-col gap-0 items-center">
                                
            <ImCart size={25} />
                                     <span className=" font-semibold  text-white">cart</span>
                               </div>
           
            <span className=" absolute bottom-[38px] left-[27px] z-10 text-red-800 font-serif font-semibold text-lg">
              {cart && cart.length}
            </span>
          </div>
          {isAuthenticated ? (
            <Link to={"/profile"} className=" flex items-center gap-3">
              <img
                src={userData?.user.avatar.url}
                alt="sdf"
                className=" w-10 h-10 rounded-full border-t-red-500 border "
              />
            </Link>
          ) : (
            <div className=" flex gap-3 items-center">
              <Link
                to={"/login"}
                className=" text-center  text-white font-semibold  hover:text-red-700 transition-colors duration-200 "
              >
                Login
              </Link>

              <Link
                to="/sign-up"
                className=" p-2 rounded-lg bg-black w-28 text-center  text-white font-semibold  hover:text-red-700 transition-colors duration-200"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
      {openCart && <Cart setOpenCart={setOpenCart} />}
      {openWishList && <WishList setOpenWishList={setOpenWishList} />}

      <div
        className={`${
          active ? "fixed top-0 left-0" : ""
        }md:hidden w-full h-16 bg-white shadow-md flex items-center justify-between sm:px-3 px-1 z-40`}
      >
        <BiMenuAltLeft
          size={30}
          className=""
          onClick={() => setOpenMenu(true)}
        />
        <Link to={"/"} className="">
          <span className=" font-bold text-lg text-blue-700">Quick</span>
          <span className=" font-bold text-lg text-red-700">Cart</span>
        </Link>
        <div className=" relative w-6/12 ">
          <input
            value={searchQuery}
            onChange={handleOnInputChange}
            type="text"
            className=" p-1 w-full border border-blue-400 outline-none bg-slate-100 rounded-sm "
            placeholder="Search products..."
          />
          <AiOutlineSearch
            size={20}
            className=" absolute right-1 top-2 bg-slate-100 z-10 cursor-pointer"
          />
          {resultData && searchQuery !== "" && (
            <div className=" w-full  max-h-[70vh] overflow-auto absolute top-9  bg-slate-100  z-20 scrollbar-hide   ">
              {resultData.map((item, i) => (
                <Link
                  onClick={() => setSearchQuery("")}
                  key={i}
                  to={`/product/${item._id}`}
                  className=" w-full h-24 flex gap-2 p-2   items-center border-b  hover:bg-gray-200 transition-all duration-200  "
                >
                  <img
                    src={item.images[0].url}
                    alt=""
                    className=" md:w-20 md:h-20 h-10 w-10  "
                  />
                  <span className=" font-serif  md:font-semibold line-clamp-2">
                    {" "}
                    {item.productName}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div
            onClick={() => setOpenCart(true)}
            className=" relative cursor-pointer"
          >
            <ImCart size={25} />
            <span className=" absolute bottom-[13px] left-[20px] z-10 text-red-800 font-serif font-semibold text-lg">
              {cart && cart.length}
            </span>
          </div>
          
        {openMenu && (
          <MobileSideBar
            setOpenMenu={setOpenMenu}
            navItems={navItems}
            setOpenWishList={setOpenWishList}
            isAuthenticated={isAuthenticated}
          />
        )}
      </div>
    </>
  );
}

export default Header;
