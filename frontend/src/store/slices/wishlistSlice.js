import { createSlice } from "@reduxjs/toolkit";
const initialState={
  wishlist:localStorage.getItem("wishlistItems")?JSON.parse(localStorage.getItem("wishlistItems")):[],
  isLiked:false

}

const wishlistSlice=createSlice({
name:"wishlist",
initialState,
reducers:{
  addToWishlist:(state, action)=>{
    let item=action.payload
   
    
     let itemExist=state.wishlist.find((wishlistItem)=>wishlistItem._id===item._id)
     if(itemExist){
        state.wishlist=state.wishlist.map((wishlistItem)=>wishlistItem._id===item._id?item:wishlistItem)
     }else{
        state.wishlist.push(item)

     }
   localStorage.setItem("wishlistItems",JSON.stringify(state.wishlist))
  },
  removeFromWishlist:(state, action)=>{
  
     state.wishlist=state.wishlist.filter((wishlistItem)=>wishlistItem._id!==action.payload )
     localStorage.setItem("wishlistItems",JSON.stringify(state.wishlist))

  },
  setIsLiked:(state, action)=>{
      

    state.isLiked=action.payload
  }

}

})

export const {addToWishlist , removeFromWishlist, setIsLiked}=wishlistSlice.actions

export default wishlistSlice.reducer