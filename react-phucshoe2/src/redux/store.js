// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice"; // Import reducer từ slice

const store = configureStore({
  reducer: {
    counter: counterReducer, // Nơi bạn quản lý nhiều reducer
  },
});

export default store;
