import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  userData: null,
}

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("loadUserRequest", (state) => {
      state.loading = true;
    })

    .addCase("loadUserSuccess", (state, action) => {
      (state.loading = false), (state.isAuthenticated = true);

      state.userData = action.payload;
    })

    .addCase("loadUserFailiure", (state, action) => {
      (state.loading = false), (state.error = action.payload);
      state.userData = null;
      state.isAuthenticated = false;
    })
    .addCase("updateUserRequest", (state) => {
      state.loading = true;
    })

    .addCase("updateUserSuccess", (state, action) => {
      (state.loading = false),

      state.userData = action.payload;
    })

    .addCase("updateUserFailiure", (state, action) => {
      (state.loading = false), (state.error = action.payload);
    
    })

    .addCase("activatUser", (state, action) => {
      state.error = action.payload;
    });
});
