import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./reducers/categories";
import itemsSlice from "./reducers/items";
import cartSlice from "./reducers/cart";
import searchSlices from "./reducers/search";
import { categoriesListener } from "./middlewares/categories";
import { itemsListenar } from "./middlewares/items";

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    items: itemsSlice,
    cart: cartSlice,
    search: searchSlices,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      categoriesListener.middleware,
      itemsListenar.middleware
    ),
});

export default store;
