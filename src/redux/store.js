import { configureStore } from "@reduxjs/toolkit";
import reducerSlice from "./reducers/reducerSlice";
export const store = configureStore({
  reducer: reducerSlice,
});
