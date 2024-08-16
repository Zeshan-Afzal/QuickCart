import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../store/slices/cartSlice";
import { FaOpencart } from "react-icons/fa";
import { toast } from "react-toastify";
function Cart({ setOpenCart }) {
  
  const {cart} =useSelector((state)=>state.cart)
  const [quantities, setQuantities] = useState(cart && cart.map((cartItem) =>cartItem.qty ));
  const dispatch =useDispatch()
 
  const handleQauntitiesChange = (index, value , id) => {

    cart && cart.map((cartItem, i)=>{
      if(cartItem.product._id===id){
       if(value>cartItem.product.stock){
        toast.error("Limited stock")
       } else{

         dispatch(addToCart({...cartItem, qty:value}))
       }

      }
 
       }) 
    

    setQuantities((prevQuantities) =>
      prevQuantities.map((qty, i) => (i === index ?value: qty))
    );
  };

  const handleRemoveFromCart=(id)=>{
    dispatch(removeFromCart(id))


  }




  return (
    <div className=" w-full fixed h-screen top-0 left-0 bg-[#00000044] z-50">
      <div className=" overflow-auto scrollbar-hide flex flex-col p-4 w-[70%] md:w-[25%] h-screen bg-white shadow-sm fixed top-0 right-0 z-30">


        {cart && cart.length>=1? <> <RxCross1
          size={30}
          color="black"
          className="absolute right-3 top-3  cursor-pointer z-40"
          onClick={() => setOpenCart(false)}
        />
        <div
          onClick={() => setOpenCart(true)}
          className=" flex items-center gap-4 mt-6  border-b pb-4"
        >
          <FaOpencart size={40} color="black" />
          <span className=" text-black  text-2xl font-semibold">
            {cart && cart.length} items in cart
          </span>
        </div>
        <div className=" flex flex-col gap-3">
          {cart && cart.length>0 && cart.map((item, i) => (
            <div
              className=" flex  gap-3 border-b   p-3   "
              key={item.product._id}
            >
              <div className="flex flex-col">
                <div
                  onClick={() => handleQauntitiesChange(i, quantities[i] + 1, item.product._id)}
                  className=" flex cursor-pointer "
                >
                  <CiCirclePlus size={40} color="red" />
                </div>

                <span className="ml-1 pl-[10px] text-black">{item.qty}</span>

                <div
                  onClick={() =>
                    handleQauntitiesChange(
                      i,
                      quantities[i] > 1 ? quantities[i] - 1 : 1
                    , item.product._id)
                  }
                  className=" flex cursor-pointer   "
                >
                  <CiCircleMinus size={40} color="red" />
                </div>
              </div>
              <div className=" flex gap-4 items-center ">
                <div className=" flex items-center">
                  <img src={item.product.images[0].url} className="  max-w-20 max-h-20" alt="" />
                </div>
                <div className=" flex flex-col gap-3">
                  <span className=" text-black font-semibold text-xl line-clamp-1">
                    {item.product.productName }
                  </span>
                  <span className=" font-semibold text-black">
                    ${item.product.discountedPrice * item.qty}
                  </span>
                </div>
                <div className=" min-w-5">
                  
                <RxCross1
                  size={20}
                  color="black"
                  className=" cursor-pointer"
                  onClick={() => handleRemoveFromCart(item.product._id)}
                  />
                  </div>
              </div>
            </div>
          ))}
        </div>
        <Link
          onClick={() => setOpenCart(false)}
          className=" flex gap-4 items-center justify-center p-2 rounded-lg capitalize border border-red-500 "
          to={"/check-out"}
        >
          <span className="text-red-500 font-semibold text-xl md:text-2xl">
            Check Out
          </span>
          <span className="text-red-500 font-semibold text-xl md:text-2xl">
            ${cart && cart.reduce((accumulator, currentValue)=>  accumulator + currentValue.product.discountedPrice * currentValue.qty, 0)}
          </span>
        </Link> 
        </>  : <>
        <RxCross1
          size={30}
          color="black"
          className="absolute right-3 top-3  cursor-pointer z-40"
          onClick={() => setOpenCart(false)}
        />
         <div className=" h-full w-full flex
         items-center justify-center">
          <span className=" font-serif font-bold text-xl  md:text-2xl"> No item in cart</span>
          </div>
           </>
          }
        
      </div>
    </div>
  );
}

export default Cart;
