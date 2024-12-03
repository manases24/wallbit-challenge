import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/products/productsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
