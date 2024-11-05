import { configureStore } from "@reduxjs/toolkit";
import retainoReducer from "./retaino.slice";
import cartReducer from "./cart.slice";

export function makeStore(preloadedState?: any) {
  return configureStore({
    reducer: {
      // @ts-ignore
      retaino: retainoReducer,
      cart: cartReducer,
      // Add other reducers here
    },
    preloadedState,
  });
}

const store = makeStore();

export default store;
