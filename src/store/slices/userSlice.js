import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  pending: false,
  data: {},
  role: null,
  error: false,
};
export const login = createAsyncThunk(
  "user/login",
  async ({ user, navigate }, thunkAPI) => {
    console.log(user);
    const response = await axios.post(
      `http://localhost:3001/api/employee/login`,
      user
    );
    if (response.status === 200) {
      navigate("/dashboard");
    }
    return response.data;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      console.log("FULFILLED");

      state.data = action.payload.userLogin;
      state.pending = false;
      //       // store the user in localStorage
      //       localStorage.setItem("user", JSON.stringify(res.data));
      //       const userInfo = JSON.parse(localStorage.getItem("user"));

      //       if (userInfo.userLogin.role === "Chef") window.location = "/chef/";
      //       else if (userInfo.userLogin.role === "Admin")
      //         window.location = "/admin/";
      //       else if (userInfo.userLogin.role === "Server")
      //         window.location = "/server/";
      //       else if (userInfo.role === "Client") window.location = "/client/";
      //       else window.location = "/login";
      return state;
    },
    [login.pending]: (state, action) => {
      state.pending = true;
      return state;
    },
    [login.rejected]: (state, action) => {
      state.pending = false;
      state.error = true;
      return state;
    },
  },
});
export const { increment } = userSlice.actions;
export default userSlice.reducer;
