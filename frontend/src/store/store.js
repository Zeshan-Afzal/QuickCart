import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer";
import { shopReducer } from "./reducer/shopReducer";
import shopDashActiveSlice from "./slices/shopDashActiveSlice";
import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
    shopDashActiveSlice: shopDashActiveSlice,
    cart:cartSlice,
    wishlist:wishlistSlice
  },
}); 

export default store;
