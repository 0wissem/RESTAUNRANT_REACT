import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  data: [],
};

const orderSlice = createSlice({
  name: "order",
  // initialState:initialState
  initialState,
  // reducers actions
  reducers: {
    // create action
    addToOrder: (state, { payload }) => {
      console.log("state", state, "payload", payload);
    },
  },
});
export const { addToOrder } = orderSlice.actions;
export default orderSlice.reducer;
