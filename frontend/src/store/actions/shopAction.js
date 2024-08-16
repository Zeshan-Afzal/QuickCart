export const loadShop = () => async (dispatch) => {
  try {
    dispatch({ type: "loadShopRequest" });
    const res = await fetch("/api/shop/get-shop", {
      headers: { 'ngrok-skip-browser-warning': 'any-value' },
    });
    const data = await res.json();

    if (!data.success)
      return dispatch({ type: "loadShopFailiure", payload: data.message });

    dispatch({ type: "loadShopSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loadShopFailiure", payload: error.message });
  }
};

export const getShopInfo = (Id) => async (dispatch) => {
  try {
    dispatch({ type: "getShoInfoRequest" });

    const res = await fetch(`/api/shop/get-shop-info/${Id && Id}`, {
      headers: { 'ngrok-skip-browser-warning': 'any-value' },
    });

    const data = await res.json();

    if (!data.success) {
      return dispatch({
        type: "getShopInfoFailiure",
        payload: data.message,
      });
    }
    console.log(data, "helre is ");

    dispatch({ type: "getShopInfoSuccess", payload: data.shopInfo });
  } catch (error) {
    console.log(error);
    dispatch({ type: "getShopInfoFailiure", payload: error.message });
  }
};

export const getAllShopItems = (Id) => async (dispatch) => {
  try {
    dispatch({ type: "getShopAllProductsRequest" });

    const res = await fetch(`/api/shop/get-shop-product/${Id && Id}`, {
      headers: { 'ngrok-skip-browser-warning': 'any-value' },
    });

    const data = await res.json();

    if (!data.success) {
      return dispatch({
        type: "getShopAllProductsFailiure",
        payload: data.message,
      });
    }

    dispatch({ type: "getShopAllProductsSuccess", payload: data.products });
  } catch (error) {
    console.log(error);
    dispatch({ type: "getShopAllProductsFailiure", payload: error.message });
  }
};

export const deletehopItem = (id) => async (dispatch) => {
  dispatch({ type: "deleteShopProductRequest" });

  await fetch(`/api/shop/delete-product/${id}`, {
    headers: { 'ngrok-skip-browser-warning': 'any-value' },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        return dispatch({
          type: "deleteShopProductFailiure",
          payload: data.message,
        });
      }

      dispatch({ type: "deleteShopProductSuccess", payload: data });
    })
    .catch((err) => {
      dispatch({ type: "deleteShopProductFailiure", payload: err.message });
    });
};

export const deleteShopEvent = (id) => async (dispatch) => {
  dispatch({ type: "deleteShopEventRequest" });

  await fetch(`/api/shop/delete-event/${id}`, {
    headers: { 'ngrok-skip-browser-warning': 'any-value' },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        return dispatch({
          type: "deleteShopEventFailiure",
          payload: data.message,
        });
      }

      dispatch({ type: "deleteShopEventSuccess", payload: data });
    })
    .catch((err) => {
      dispatch({ type: "deleteShopEventFailiure", payload: err.message });
    });
};

export const getAllShopEvents = (Id) => async (dispatch) => {
  try {
    dispatch({ type: "getShopAllEventsRequest" });

    const res = await fetch(`/api/shop/get-shop-events/${Id && Id}`, {
      headers: { 'ngrok-skip-browser-warning': 'any-value' },
    });

    const data = await res.json();

    if (!data.success) {
      return dispatch({
        type: "getShopAllEventsFailiure",
        payload: data.message,
      });
    }

    dispatch({ type: "getShopAllEventsSuccess", payload: data.events });
  } catch (error) {
    console.log(error);
    dispatch({ type: "getShopAllEventsFailiure", payload: error.message });
  }
};

export const getAllShopCoupons = (Id) => async (dispatch) => {
  try {
    dispatch({ type: "getShopAllCouponsRequest" });

    const res = await fetch(`/api/shop/get-shop-coupons/${Id && Id}`, {
      headers: { 'ngrok-skip-browser-warning': 'any-value' },
    });

    const data = await res.json();

    if (!data.success) {
      return dispatch({
        type: "getShopAllCouponsFailiure",
        payload: data.message,
      });
    }

    dispatch({ type: "getShopAllCouponsSuccess", payload: data.coupons });
  } catch (error) {
    console.log(error);
    dispatch({ type: "getShopAllCouponsFailiure", payload: error.message });
  }
};

export const deletehopCoupon = (id) => async (dispatch) => {
  dispatch({ type: "deleteShopCouponRequest" });

  await fetch(`/api/shop/delete-coupon/${id}`, {
    headers: { 'ngrok-skip-browser-warning': 'any-value' },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        return dispatch({
          type: "deleteShopCouponFailiure",
          payload: data.message,
        });
      }

      dispatch({ type: "deleteShopCouponSuccess", payload: data });
    })
    .catch((err) => {
      dispatch({ type: "deleteShopCouponFailiure", payload: err.message });
    });
};

export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllEventsRequest" });

    const res = await fetch(`/api/shop/get-all-events`, {
      headers: { 'ngrok-skip-browser-warning': 'any-value' },
    });

    const data = await res.json();

    if (!data.success) {
      return dispatch({
        type: "getAllEventsFailiure",
        payload: data.message,
      });
    }

    dispatch({ type: "getAllEventsSuccess", payload: data.allEvents });
  } catch (error) {
    console.log(error);
    dispatch({ type: "getAllEventsFailiure", payload: error.message });
  }
};

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllProductsRequest" });

    const res = await fetch(`/api/shop/get-all-product`, {
      headers: { 'ngrok-skip-browser-warning': 'any-value' },
    });

    const data = await res.json();

    if (!data.success) {
      return dispatch({
        type: "getAllProductsFailiure",
        payload: data.message,
      });
    }

    dispatch({ type: "getAllProductsSuccess", payload: data.allProducts });
  } catch (error) {
    console.log(error);
    dispatch({ type: "getAllProductsFailiure", payload: error.message });
  }
};
