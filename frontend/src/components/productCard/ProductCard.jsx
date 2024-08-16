import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import ProductDetails from "./ProductDetails";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { toast } from "react-toastify";
import { addToWishlist, removeFromWishlist } from "../../store/slices/wishlistSlice";

function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const {cart} =useSelector((state)=>state.cart)
  const {wishlist} =useSelector((state)=>state.wishlist)

  const dispatch=useDispatch()
  const addToCartHanlder=(id)=>{
    let itemExist=cart&&cart.find((cartItem)=>cartItem.product._id===id)
    if(itemExist){
       toast.error("item already in Cart")
      }
     
      else{
         

         dispatch(addToCart({
          product, qty:1
         }))
       toast.success("Product added successfully")


      }

  }
  
  
  
  useEffect(()=>{
    
     if(wishlist && wishlist.find((item)=>item._id== product._id)){
         setIsLiked(true)
   
     } else{
      setIsLiked(false)
     }
   
   },[wishlist] )
   
   
       const addToWishlistHandler=(product)=>{
         setIsLiked(true)
         console.log('lic')
       dispatch(addToWishlist(product))
       }
       
       const removeFromWishlistHandler=(id)=>{
         setIsLiked(false)
        
       dispatch(removeFromWishlist(id))
   
       }


       useEffect(() => {
        if (viewDetail) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
    
        // Clean up function to reset overflow on component unmount
        return () => {
          document.body.style.overflow = "auto";
        };
      }, [viewDetail]);

  return (
    <>
      <div className=" bg-white rounded-md shadow-sm p-3  flex flex-col gap-4 relative">
        <Link to={`/product/${product?._id}`}>
          <img
            className=" w-56 h-52  mx-auto"
            src={product && product?.images[0].url}
            alt=""
          />
        </Link>
        <Link to={`/shop/${product.shop._id}`}>
          <p className=" font-serif font-semibold text-blue-600 text-lg">
            {product && product?.shop.shopName}
          </p>
        </Link>
        <Link to={`/product/${product && product?.productName}`}>
          <p className=" font-semibold line-clamp-2 text-lg ">
            {product && product?.productName}
          </p>
          <div className=" flex gap-1">
            <FaStar size={25} color="#F6BA00" />
            <FaStar size={25} color="#F6BA00" />
            <FaStar size={25} color="#F6BA00" />
            <FaStar size={25} color="#F6BA00" />
            <FaStar size={25} color="#F6BA00" />
          </div>

          <div className=" flex justify-between  pb-3 ">
            <div className=" flex gap-2">
              <p className=" font-semibold md:font-bold  text-xl">
                {" "}
                ${product && product?.discountedPrice}
              </p>
              {product && product.originalPrice && (
                <span className=" text-red-500 line-through">
                  {" "}
                  ${product && product.originalPrice}
                </span>
              )}
            </div>
            <p className=" font-semibold font-serif text-green-600 ">
              {product && product.sold} Sold
            </p>
          </div>
        </Link>
        <div className=" absolute top-2 right-3 bg-white z-30">
          {isLiked ? (
            <AiFillHeart
              onClick={() => removeFromWishlistHandler(product._id)}
              size={28}
              className="cursor-pointer absolute right-2 top-5"
              color={"red"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              onClick={() => addToWishlistHandler(product)}
              size={28}
              className="cursor-pointer absolute right-2 top-5"
              color={"#333"}
              title="Add to wishlist"
            />
          )}

          <AiOutlineEye
            size={28}
            className="cursor-pointer absolute right-2 top-14"
            color="#333"
            title="Quick view"
            onClick={() => setViewDetail(true)}
          />
          <AiOutlineShoppingCart
          onClick={()=>{addToCartHanlder(product._id)}}
            size={28}
            className="cursor-pointer absolute right-2 top-24"
            color="#444"
            title="Add to cart"
          />
        </div>
        {viewDetail && (
          <ProductDetails
            setViewDetail={setViewDetail}
            product={product}
            setIsLiked={setIsLiked}
            isLiked={isLiked}
          />
        )}
      </div>
    </>
  );
}

export default ProductCard;
