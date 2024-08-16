import React, { act, useEffect, useState } from "react";
import { productData } from "../../static/data";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import RelatedProducts from "./RelatedProducts";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { toast } from "react-toastify";
import { addToWishlist, removeFromWishlist } from "../../store/slices/wishlistSlice";

function ProductDetailsCard({ product ,Id}) {
  const { AllProducts, allShopProducts } = useSelector((state) => state.shop);

  const [count, setCount] = useState(1);
  const [isLiked, setIsLiked] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("detail");
  const {cart} =useSelector((state)=>state.cart)
  const {wishlist} =useSelector((state)=>state.wishlist)

  console.log(product && product ,'hosiedfn')
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
    

    if(product){

      
      if(wishlist && wishlist.find((item)=>item._id==  product._id)){

        
        setIsLiked(true) 
        
      } else{
        setIsLiked(false)
      }
    }
  
  },[product, wishlist,Id])
  
  
      const addToWishlistHandler=(product)=>{
        setIsLiked(true)
       
      dispatch(addToWishlist(product))
      }
      
      const removeFromWishlistHandler=(id)=>{
        setIsLiked(false)
       
      dispatch(removeFromWishlist(id))
  
      }






  const handleSelect = (img) => {
    setSelectedImage(img.url);
  };

  return (
    <>
      <div className=" w-full flex p-8 flex-col md:flex-row ">
        <div className=" md:w-[50%]  items-center flex justify-center min-h-[70vh]">
          <div className=" flex flex-col items-center justify-center  w-full h-[70vh]">
            <div className=" w-[80%] h-[60%] items-center justify-center flex ">
              <img
                src={
                  selectedImage
                    ? selectedImage
                    : product
                    ? product.images[0].url
                    : ""
                }
                alt=""
                className=" min-h-[80%] max-h-[90%]  w-[90%]"
              />
            </div>
            <div className=" flex items-center justify-center p-4  gap-4 max-h-[40%]">
              {product &&
                product.images.map((img) => (
                  <div
                  key={img.url}
                    onClick={() => handleSelect(img)}
                    className=" cursor-pointer  h-[80%] border p-2 hover:scale-95"
                  >
                    <img src={img.url} alt="" className="h-full" />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className=" md:w-[50%] p-8 flex flex-col gap-5 ">
          <div className=" w-[80%]">
            <h1 className=" md:font-bold font-semibold text-xl md:text-3xl line-clamp-2">
              {product && product.productName}
            </h1>
            <p className=" min-h-[35vh] md:font-semibold text-sm md:text-lg line-clamp-[14] md:line-clamp-[20] lg:line-clamp-none">
              {product && product.description}
            </p>
          </div>
          <div className=" flex gap-2">
            <p className=" font-semibold md:font-bold  text-2xl">
              {" "}
              ${product && product.discountedPrice}
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
                onClick={() => setCount((prev) => (prev>1?prev -= 1:1))}
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
          
          className=" p-1  md:p-4 mt-5 rounded-md hover:opacity-95 bg-blue-900 transition-none duration-200 w-36 md:w-44 text-white md:font-bold  md:font-serif  flex  md:gap-2 items-center justify-center">
            Add to Cart <AiOutlineShoppingCart className="ml-1" />
          </button>

          <div className=" flex gap-2 md:gap-4 mt-5 items-center">
            <Link to={`/shop/${product && product.shop._id}`}>
              <img
                src={product && product.shop.avatar}
                alt=""
                className=" md:w-20 md:h-20 w-11 h-11 rounded-full"
              />
              <div className="">
                <p className=" font-semibold text-blue-500 md:font-bold text-lg md:text-xl">
                  {product && product.shop.shopName}
                </p>
                <p className="text-sm  md:text-lg">4.5 ratings</p>
              </div>
            </Link>
            <button className="p-1  md:p-4 rounded-md hover:opacity-95 bg-black transition-none duration-200 w-36 md:w-44 text-white md:font-bold  md:font-serif flex  md:gap-2 justify-center items-center">
              {" "}
              Send message <AiOutlineMessage className="ml-1" />
            </button>
          </div>
        </div>
      </div>
      <div className=" flex justify-around p-6 w-full md:w-[90%] bg-slate-200 mx-auto shadow-sm min-h-[300px] mb-10">
        <div className=" w-full flex  flex-col">
          <div className=" w-full flex justify-around items-start">
            <h1
              onClick={(e) => setActiveTab(e.target.id)}
              id="detail"
              className={` ${
                activeTab === "detail" ? " border-b-[4px] border-red-600" : ""
              } md:font-bold font-semibold text-xl md:text-2xl cursor-pointer`}
            >
              Product Details{" "}
            </h1>
            <h1
              id="review"
              onClick={(e) => setActiveTab(e.target.id)}
              className={` ${
                activeTab === "review" ? " border-b-[4px] border-red-600" : ""
              } md:font-bold font-semibold text-xl md:text-2xl cursor-pointer`}
            >
              Product Reviews
            </h1>

            <h1
              onClick={(e) => setActiveTab(e.target.id)}
              id="seller"
              className={` ${
                activeTab === "seller" ? " border-b-[4px] border-red-600" : ""
              } md:font-bold font-semibold text-xl md:text-2xl cursor-pointer`}
            >
              Seller Info
            </h1>
          </div>

          {activeTab === "detail" && (
            <div className=" p-2 md:p-4 h-full">
              <p className=" text-sm md:text-xl">
                {product && product.description}
              </p>
            </div>
          )}

          {activeTab === "review" && (
            <div className=" flex  items-center justify-center md:p-4 p-2 h-full">
              <p className=" text-xl ">no reviews</p>
            </div>
          )}

          {activeTab === "seller" && (
            <div className=" flex p-4 justify-between">
              <div className=" flex gap-2 md:gap-4 mt-5  flex-col w-[50%]">
                <div className=" flex gap-2 items-center">
                  <img
                    src={product && product.shop.avatar}
                    alt=""
                    className=" md:w-20 md:h-20 w-11 h-11 rounded-full"
                  />
                  <div className="">
                    <p className=" font-semibold text-blue-500 md:font-bold text-lg md:text-xl">
                      {product && product.shop.shopName}
                    </p>
                    <p className="text-sm  md:text-lg">4.4 ratings</p>
                  </div>
                </div>
                <p className="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, vitae et. Reprehenderit ad recusandae incidunt
                  quaerat sequi commodi rerum at animi laudantium.
                </p>
              </div>
              <div className=" flex flex-col gap-3 justify-center items-center">
                <span className=" font-semibold md:text-xl text-lg  ">
                  Joind on {product && product.shop.createdAt.slice(0, 10)}
                </span>
                <span className=" font-semibold md:text-xl text-lg  ">
                  Total products: {allShopProducts && allShopProducts.length}
                </span>
                <span className=" font-semibold md:text-xl text-lg  ">
                  Total reviews:(3434)
                </span>
                <button className=" p-1  md:p-4 mt-5 rounded-md hover:opacity-95 bg-blue-900 transition-none duration-200 w-36 md:w-44 text-white md:font-bold  md:font-serif  flex  md:gap-2 items-center justify-center">
                  Visit Shop
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <RelatedProducts product={product} />
    </>
  );
}

export default ProductDetailsCard;
