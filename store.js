import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./src/redux/customerSlice";

const store = configureStore({
  reducer: {
    customers: customerSlice,
  },
});

export default store;
