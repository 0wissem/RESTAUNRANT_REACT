import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  families: null,
  isloading: false,
  error: null,
  familyInfo: null,
};

//get all families
export const getFamilies = createAsyncThunk("families", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`http://localhost:3001/api/family/`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

//get an family by id
export const getFamilyById = createAsyncThunk(
  "families/getFamilyById",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `http://localhost:3001/api/family/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//add an family
export const addFamilies = createAsyncThunk(
  "families/addFamily",
  async (family, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        "http://localhost:3001/api/family/add",
        family,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//update an family
export const updatefamily = createAsyncThunk(
  "families/updatefamily",
  async (family, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(
        `http://localhost:3001/api/family/update/` + family.get("id"),
        family,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//delete an family
export const deletefamily = createAsyncThunk(
  "families/deletefamily",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`http://localhost:3001/api/family/delete/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const familySlice = createSlice({
  name: "families",
  initialState,
  reducers: {},
  extraReducers: {
    //get families
    [getFamilies.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [getFamilies.fulfilled]: (state, action) => {
      state.isloading = false;
      state.families = action.payload;
    },
    [getFamilies.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
    //get an family by id
    [getFamilyById.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [getFamilyById.fulfilled]: (state, action) => {
      state.isloading = false;
      state.familyInfo = action.payload;
    },
    [getFamilyById.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
    // add family
    [addFamilies.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [addFamilies.fulfilled]: (state, action) => {
      state.isloading = false;

      state.families.push(action.payload);
    },
    [addFamilies.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
    // update family
    [updatefamily.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [updatefamily.fulfilled]: (state, action) => {
      state.isloading = false;
      state.families = state.families.filter(
        (family) => family._id !== action.payload.id
      );
      state.families = action.payload;
    },
    [updatefamily.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
    //delete an family
    [deletefamily.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [deletefamily.fulfilled]: (state, action) => {
      state.isloading = false;
    },
    [deletefamily.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
  },
});

export default familySlice.reducer;
