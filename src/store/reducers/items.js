import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itemsService from "services/items";
import { v4 as uuid } from "uuid";

export const searchItems = createAsyncThunk(
  "items/search",

  itemsService.search
);

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    toggleFavorite: (state, { payload }) => {
      state.map((item) => {
        if (item.id === payload) item.favorite = !item.favorite;
        return item;
      });
    },
    registerItem: (state, { payload }) => {
      state.push({ ...payload, id: uuid() });
    },
    changeItem: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload.id);

      Object.assign(state[index], payload.item);
    },
    deleteItem: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload);
      state.splice(index, 1);
    },
    addItems: (state, { payload }) => {
      state.push(...payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchItems.fulfilled, (state, { payload }) => {
        console.log("itens carregados!");
        return payload;
      })
      .addCase(searchItems.pending, (state, { payload }) => {
        console.log("carregando itens");
      })
      .addCase(searchItems.rejected, (state, { payload }) => {
        console.log("busca de itens rejeitada!");
      });
  },
});

export const {
  toggleFavorite,
  registerItem,
  changeItem,
  deleteItem,
  addItems,
} = itemsSlice.actions;

export default itemsSlice.reducer;
