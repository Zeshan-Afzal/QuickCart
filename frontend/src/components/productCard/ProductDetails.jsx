import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { toast } from "react-toastify";
import { addToCart } from "../../store/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../store/slices/wishlistSlice";

function ProductDetails({ setViewDetail, product, setIsLiked, isLiked }) {
  const [count, setCount] = useState(1);
  const {cart} =useSelector((state)=>state.cart)
  const {wishlist} =useSelector((state)=>state.wishlist)

  const dispatch=useDispatch()
  const addToCartHanlder=(id)=>{
    

    let itemExist=cart&&cart.find((cartItem)=>cartItem.product._id===id)
  
    if(itemExist && itemExist.qty===count){
       toast.error("item already in Cart")
      }
      else if(itemExist && itemExist.qty!==count){
        if(product && product.stock<count){
          toast.error("limited stock")
         } else{

          
           dispatch(addToCart({
             product, qty:count
            }))    
            toast.success("Product added successfully")

         }


      }
      else{
         
           if(product && product.stock<count){
            toast.error("limited stock")
           } else{


             dispatch(addToCart({
              product, qty:count
             }))
            toast.success("Product added successfully")

           }

      }

  }

useEffect(()=>{

  if(wishlist && wishlist.find((item)=>item._id== product._id)){
      setIsLiked(true)

  }

},[wishlist])


    const addToWishlistHandler=(product)=>{
      setIsLiked(true)

    dispatch(addToWishlist(product))
    }
    
    const removeFromWishlistHandler=(id)=>{
      setIsLiked(false)
     
    dispatch(removeFromWishlist(id))

    }



  return (
    <div className="w-[90%] md:w-[70%] max-h-[70%] overflow-auto scrollbar-hide bg-white fixed top-[10%]  md:left-[15%] left-[5%] z-50  mx-auto rounded-lg shadow-md ">
      <div className=" flex">
        <div className="  w-[50%] p-1 md:p-4 flex flex-col gap-5">
          <img
            src={product && product.images[0].url}
            alt=""
            className=" w-[80%] h-[80%] mx-auto"
          />
          <Link
            to={`/shop/${product && product.shop._id}`}
            className=" flex gap-2"
          >
            <img
              src={product && product.shop.avatar}
              alt=""
              className=" md:w-20 md:h-20 w-11 h-11 rounded-full"
            />
            <div className="">
              <p className=" font-semibold text-blue-500 md:font-bold text-lg md:text-xl">
                {product && product.shop.shopNamename}
              </p>
              <p className="text-sm  md:text-lg">4.3 ratings</p>
            </div>
          </Link>

          <button className="p-1  md:p-4 rounded-md hover:opacity-95 bg-blue-900 transition-none duration-200 w-36 md:w-44 text-white md:font-bold  md:font-serif flex  md:gap-2 justify-center items-center">
            {" "}
            Send message <AiOutlineMessage className="ml-1" />
          </button>

          <p className=" md:font-semibold md:text-xl text-red-500">
            ({product && product.sold}) Sold Out
          </p>
        </div>
        <div className=" w-[50%] p-4 flex flex-col gap-5">
          <div className=" w-[80%]">
            <h1 className=" md:font-bold font-semibold text-xl md:text-3xl line-clamp-2">
              {product && product.productName}
            </h1>
            <p className=" md:font-semibold text-sm md:text-lg line-clamp-[14] md:line-clamp-[20] lg:line-clamp-none">
              {product && product.description}
            </p>
          </div>
          <div className=" flex gap-2">
            <p className=" font-semibold md:font-bold  text-2xl">
              {" "}
              ${product && product && product.discountedPrice}
            </p>
            {product && product.originalPrice && (
              <span className=" text-red-500 line-through">
                {" "}
                ${product && product.originalPrice}
              </span>
            )}
          </div>
          <div className="  flex justify-between">
            <div className=" flex">
              <button
                onClick={() => setCount((prev) => (prev>1? prev-= 1: 1))}
                className=" bg-violet-400  w-7 md:w-14 rounded-tl-md rounded-bl-md p-1 md:p-2 text-white font-semibold md:text-xl"
              >
                -
              </button>
              <p className=" flex items-center justify-center bg-gray-300 w-7  md:w-14 text-black font-semibold md:text-xl">
                {count}
              </p>
              <button
                onClick={() => setCount((prev) => (prev += 1))}
                className=" bg-violet-400  w-7 md:w-14 rounded-tr-md rounded-br-md p-1 md:p-2 text-white font-semibold md:text-xl"
              >
                +
              </button>
            </div>

            {isLiked ? (
              <AiFillHeart
                onClick={() => removeFromWishlistHandler(product._id)}
                size={35}
                className="cursor-pointer mr-1  md:mr-7"
                color={"red"}
                title="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
                onClick={() => addToWishlistHandler(product)}
                size={35}
                className="cursor-pointer mr-1  md:mr-7"
                color={"#333"}
                title="Add to wishlist"
              />
            )}
          </div>
          <button
           onClick={()=>{addToCartHanlder(product._id)}}
          className=" p-1  md:p-4 rounded-md hover:opacity-95 bg-blue-900 transition-none duration-200 w-36 md:w-44 text-white md:font-bold  md:font-serif  flex  md:gap-2 items-center justify-center">
            Add to Cart <AiOutlineShoppingCart className="ml-1" />
          </button>
        </div>
        <RxCross1
          size={30}
          className="absolute right-3 top-3 z-50 cursor-pointer"
          onClick={() => setViewDetail(false)}
        />
      </div>
    </div>
  );
}

export default ProductDetails;
