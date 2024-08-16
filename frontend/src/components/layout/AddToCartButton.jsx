import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../store/slices/cartSlice'

function AddToCartButton({product}) {
    const {cart} =useSelector((state)=>state.cart)
  const dispatch=useDispatch()



    const addToCartHanlder=(product, count)=>{
        console.log(cart && cart, 'kd')
    
        let itemExist=cart&&cart.find((cartItem)=>cartItem.product._id===id)
        console.log(itemExist && itemExist.qty, 'k')
        if(itemExist && itemExist.qty===count){
           toast.error("item already in Cart")
          }
          else if(itemExist && itemExist.qty!==count){
            dispatch(addToCart({
              product, qty:count
             }))    
    
          }
          else{
             
    
             dispatch(addToCart({
              product, qty:count
             }))
    
          }
    
      }
  return (
    <button
           onClick={()=>{addToCartHanlder(product && product._id)}}
          className=" p-1  md:p-4 rounded-md hover:opacity-95 bg-blue-900 transition-none duration-200 w-36 md:w-44 text-white md:font-bold  md:font-serif  flex  md:gap-2 items-center justify-center">
            Add to Cart <AiOutlineShoppingCart className="ml-1" />
          </button>
  )
}

export default AddToCartButton