import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  addons: null,
  isloading: false,
  error: null,
  addonsInfo: null,
};

//get all addons
export const getAddons = createAsyncThunk("addons", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`http://localhost:3001/api/addons/`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

//get an addons by id
export const getAddonsById = createAsyncThunk(
  "addons/getAddonsById",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `http://localhost:3001/api/addons/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//add an addons
export const addAddons = createAsyncThunk(
  "addons/addAddons",
  async (addons, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        "http://localhost:3001/api/addons/add",
        addons
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//update an addons
export const updateAddons = createAsyncThunk(
  "addons/updateAddons",
  async (addons, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(
        `http://localhost:3001/api/addons/edit/` + addons.id,
        addons
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//delete an addons
export const deleteAddons = createAsyncThunk(
  "addons/deleteAddons",
  async (addons, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(
        `http://localhost:3001/api/addons/delete/${addons._id}`
      );

      return addons;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addonsSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {},
  extraReducers: {
    //get addons
    [getAddons.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [getAddons.fulfilled]: (state, action) => {
      state.isloading = false;
      state.addons = action.payload;
    },
    [getAddons.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
    //get an addons by id
    [getAddonsById.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [getAddonsById.fulfilled]: (state, action) => {
      state.isloading = false;
      state.addonsInfo = action.payload;
    },
    [getAddonsById.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
    // add addons
    [addAddons.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [addAddons.fulfilled]: (state, action) => {
      state.isloading = false;

      state.addons.push(action.payload);
    },
    [addAddons.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
    // update addons
    [updateAddons.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [updateAddons.fulfilled]: (state, action) => {
      state.isloading = false;
      state.addons = state.addons.filter(
        (addons) => addons._id !== action.payload.id
      );
      state.addons = action.payload;
    },
    [updateAddons.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
    //delete an addons
    [deleteAddons.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [deleteAddons.fulfilled]: (state, action) => {
      state.isloading = false;
    },
    [deleteAddons.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
  },
});

export default addonsSlice.reducer;
