import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import transactionReducer from "./slices/transactionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
  },
});

export default store;
