import { createSlice } from "@reduxjs/toolkit";
const initialState={
  cart:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]

}

const cartSlice=createSlice({
name:"cart",
initialState,
reducers:{
  addToCart:(state, action)=>{
    let item=action.payload
    console.log(item,"hll")
     let itemExist=state.cart.find((cartItem)=>cartItem.product._id===item.product._id)
     if(itemExist){
        state.cart=state.cart.map((cartItem)=>cartItem.product._id===item.product._id?item:cartItem)
     }else{
        state.cart.push(item)

     }
   localStorage.setItem("cartItems",JSON.stringify(state.cart))
  },
  removeFromCart:(state, action)=>{
    console.log(action.payload)
     state.cart=state.cart.filter((cartItem)=>cartItem.product._id!==action.payload )
     localStorage.setItem("cartItems",JSON.stringify(state.cart))

  }

}

})

export const {addToCart , removeFromCart}=cartSlice.actions

export default cartSlice.reducer