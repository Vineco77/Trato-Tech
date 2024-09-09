import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    toggleCart: (state, { payload }) => {
      const hasItem = state.some((item) => item.id === payload);
      if (!hasItem)
        return [
          ...state,
          {
            id: payload,
            amount: 1,
          },
        ];
      return state.filter((item) => item.id !== payload);
    },
    changeAmount: (state, { payload }) => {
      state = state.map((itemInTheCart) => {
        if (itemInTheCart.id === payload.id)
          itemInTheCart.amount += payload.amount;
        return itemInTheCart;
      });
    },
    resetCart: () => initialState,
  },
});

export const { toggleCart, changeAmount, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
