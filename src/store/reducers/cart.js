import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = { data: [], total: 0 };

export const loadingPayment = createAction("cart/loadingPayment");
export const finishPayment = createAction("cart/finishPayment");

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    toggleCart: (state, { payload }) => {
      const hasItem = state.data.some((item) => item.id === payload);
      if (!hasItem)
        return {
          total: state.total,
          data: [
            ...state.data,
            {
              id: payload,
              amount: 1,
            },
          ],
        };
      return {
        total: state.total,
        data: state.data.filter((item) => item.id !== payload),
      };
    },
    changeAmount: (state, { payload }) => {
      state.data = state.data.map((itemInTheCart) => {
        if (itemInTheCart.id === payload.id)
          itemInTheCart.amount += payload.amount;
        return itemInTheCart;
      });
    },
    resetCart: () => initialState,
    changeTotal: (state, { payload }) => {
      state.total = payload;
    },
  },
});

export const { toggleCart, changeAmount, resetCart, changeTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
