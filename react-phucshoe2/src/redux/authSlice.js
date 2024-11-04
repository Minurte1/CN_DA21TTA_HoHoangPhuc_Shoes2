// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  isAuthenticated: false,
  accessToken: Cookies.get("accessToken") || null,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.userInfo = action.payload.userInfo;
      Cookies.set("accessToken", action.payload.accessToken, { expires: 7 });
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.userInfo = null;
      Cookies.remove("accessToken");
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { login, logout, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
