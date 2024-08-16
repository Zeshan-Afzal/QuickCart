import React, { useEffect, useState } from "react";

import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../store/slices/wishlistSlice";
import { toast } from "react-toastify";
import { addToCart } from "../../store/slices/cartSlice";

function WishList({ setOpenWishList }) {
  const {wishlist} =useSelector((state)=>state.wishlist)
  const {cart} =useSelector((state)=>state.cart)

 const dispatch=useDispatch()
  const removeFromWishlistHandler=(id)=>{
  
  dispatch(removeFromWishlist(id))

  }

  const addToCartHanlder=(product)=>{
   

    let itemExist=cart&&cart.find((cartItem)=>cartItem.product._id===product._id)
   
    if(itemExist){
       toast.error("item already in Cart")
      }
     
      else{ 
             
  
         dispatch(addToCart({
          product, qty:1
         }))
         dispatch(removeFromWishlist(product._id))
       toast.success("Product added successfully")


      }

  }



  return (
    <div className=" w-full fixed h-screen top-0 left-0 bg-[#00000044] z-[99]">
      <div className=" overflow-auto scrollbar-hide flex flex-col p-4 w-[70%] md:w-[25%] h-screen bg-white shadow-sm fixed top-0 right-0 z-30">
        {" "}
        <RxCross1
          size={30}
          color="black"
          className="absolute right-3 top-3  cursor-pointer z-40"
          onClick={() => setOpenWishList(false)}
        />
        <div
          onClick={() => setOpenWishList(true)}
          className=" flex items-center gap-4 mt-6  border-b pb-4"
        >
          <AiOutlineHeart size={25} color="black" />
          <span className=" text-black  text-2xl font-semibold">
             {wishlist && wishlist.length} items in wishlist
          </span>
        </div>
        <div className=" flex flex-col  gap-3">
          {wishlist && wishlist.map((item, i) => (
            <div
              className=" flex  gap-3 border-b items-center justify-center p-3 "
              key={i}
            >
              <RxCross1  onClick={()=>removeFromWishlistHandler(item._id)} size={25} color="black" className=" cursor-pointer" />
              <div className=" flex gap-4 items-center">
                <div className=" flex items-center">
                  <img src={item.images[0].url} className=" w-20 h-20 " alt="" />
                </div>
                <div className=" flex flex-col gap-3">
                  <span className=" text-black font-semibold text-xl">
                    {item.productName}
                  </span>
                  <span className=" font-semibold text-black">
                    ${item.discountedPrice}
                  </span>
                </div>
                <AiOutlineShoppingCart  onClick={()=>addToCartHanlder(item)} size={40} color="black"  className=" cursor-pointer"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WishList;
