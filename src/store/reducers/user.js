import { createSlice } from "@reduxjs/toolkit";

const usuerSlice = createSlice({
  name: "user",
  initialState: {},
  reducer: {
    addUser: (state, { payload }) => {
      return payload;
    },
  },
});

export const { addUser } = usuerSlice.actions;

export default usuerSlice.reducer;
