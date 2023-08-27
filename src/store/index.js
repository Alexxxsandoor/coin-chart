import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./currencies";

export default configureStore({
  reducer: {
    currencyList: currencyReducer,
  },
});
