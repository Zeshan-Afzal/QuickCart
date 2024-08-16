import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,
  isloading: false,
  isIowner: false,
  isAllShopProductsloading: false,
  isDeleteShopProductloading: false,
  isShopInfoloading: false,
  isAllShopEventsloading: false,
  isDeleteShopEventloading: false,
  isAllShopCouponsLoading: false,
  isDeleteShopCouponLoading: false,
  isAllEventsLoading: false,
  isAllProductsLoading: false,
  error: null,
  shopData: null,
  active: 1,
  allShopProducts: null,
  allShopEvents: null,
  allShopCoupons: null,
  shopInfo: null,
  AllEvents: null,
  AllProducts: null,
};

export const shopReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("loadShopRequest", (state) => {
      state.isloading = true;
    })

    .addCase("loadShopSuccess", (state, action) => {
      (state.isloading = false), (state.isSeller = true);
      state.shopData = action.payload;
    })

    .addCase("loadShopFailiure", (state, action) => {
      (state.isloading = false), (state.error = action.payload);
      state.shopData = null;
      state.isSeller = false;
    })

    //get shop info
    .addCase("getShoInfoRequest", (state) => {
      state.isShopInfoloading = true;
    })

    .addCase("getShopInfoSuccess", (state, action) => {
      (state.isShopInfoloading = false), (state.shopInfo = action.payload);
    })

    .addCase("getShopInfoFailiure", (state, action) => {
      (state.isShopInfoloading = false), (state.error = action.payload);
    })

    // getting all shop products

    .addCase("getShopAllProductsRequest", (state) => {
      state.isAllShopProductsloading = true;
    })

    .addCase("getShopAllProductsSuccess", (state, action) => {
      (state.isAllShopProductsloading = false),
        (state.allShopProducts = action.payload);
    })

    .addCase("getShopAllProductsFailiure", (state, action) => {
      (state.isAllShopProductsloading = false), (state.error = action.payload);
    })

    //  deleting shop product

    .addCase("deleteShopProductRequest", (state) => {
      state.isDeleteShopProductloading = true;
    })

    .addCase("deleteShopProductSuccess", (state, action) => {
      state.isDeleteShopProductloading = false;
    })

    .addCase("deleteShopProductFailiure", (state, action) => {
      (state.isDeleteShopProductloading = false),
        (state.error = action.payload);
    })

    // getting all shop event

    .addCase("getShopAllEventsRequest", (state) => {
      state.isAllShopEventsloading = true;
    })

    .addCase("getShopAllEventsSuccess", (state, action) => {
      (state.isAllShopEventsloading = false),
        (state.allShopEvents = action.payload);
    })

    .addCase("getShopAllEventsFailiure", (state, action) => {
      (state.isAllShopEventsloading = false), (state.error = action.payload);
    })

    // deleting shop event

    .addCase("deleteShopEventRequest", (state) => {
      state.isDeleteShopEventloading = true;
    })

    .addCase("deleteShopEventSuccess", (state, action) => {
      state.isDeleteShopEventloading = false;
    })

    .addCase("deleteShopEventFailiure", (state, action) => {
      (state.isDeleteShopEventloading = false), (state.error = action.payload);
    })

    //get shop coupons
    .addCase("getShopAllCouponsRequest", (state) => {
      state.isAllShopCouponsLoading = true;
    })

    .addCase("getShopAllCouponsSuccess", (state, action) => {
      (state.isAllShopCouponsLoading = false),
        (state.allShopCoupons = action.payload);
    })

    .addCase("getShopAllCouponsFailiure", (state, action) => {
      (state.isAllShopCouponsLoading = false), (state.error = action.payload);
    })

    // delete shop coupon
    .addCase("deleteShopCouponRequest", (state) => {
      state.isDeleteShopCouponLoading = true;
    })

    .addCase("deleteShopCouponSuccess", (state, action) => {
      state.isDeleteShopCouponLoading = false;
    })

    .addCase("deleteShopCouponFailiure", (state, action) => {
      (state.isDeleteShopCouponLoading = false), (state.error = action.payload);
    })

    //get all events from every shop
    .addCase("getAllEventsRequest", (state) => {
      state.isAllEventsLoading = true;
    })

    .addCase("getAllEventsSuccess", (state, action) => {
      (state.isAllEventsLoading = false), (state.AllEvents = action.payload);
    })

    .addCase("getAllEventsFailiure", (state, action) => {
      (state.isAllEventsLoading = false), (state.error = action.payload);
    })

    // getting all products from every shop

    .addCase("getAllProductsRequest", (state) => {
      state.isAllProductsLoading = true;
    })

    .addCase("getAllProductsSuccess", (state, action) => {
      (state.isAllProductsLoading = false),
        (state.AllProducts = action.payload);
    })

    .addCase("getAllProductsFailiure", (state, action) => {
      (state.isAllProductsLoading = false), (state.error = action.payload);
    })

    //  active tab for shop dashboard

    .addCase("setActive", (state, action) => {
      state.active = action.payload;
    });
});
