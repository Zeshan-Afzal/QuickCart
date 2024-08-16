import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: 1,
};
const shopDashActiveSlice = createSlice({
  name: "shopDashActive",
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setActive } = shopDashActiveSlice.actions;

export default shopDashActiveSlice;
