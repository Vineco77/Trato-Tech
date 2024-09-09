import { createStandaloneToast } from "@chakra-ui/toast";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriesServices from "services/categories";
import { resetCart } from "./cart";

const { toast } = createStandaloneToast();

const initialState = [];

export const loadingCategories = createAction("categories/loadingCategories");
export const loadingOneCategory = createAction(
  "categories/loadingOneCategory;"
);

export const searchCategories = createAsyncThunk(
  "categories/search",
  categoriesServices.search
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    addAllCategories: (state, { payload }) => {
      return payload;
    },
    addOneCategories: (state, { payload }) => {
      state.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetCart.type, () => {
      toast({
        title: "Sucesso!",
        description: "Compra completada com sucesso!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });
  },
});

export const { addAllCategories, addOneCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
