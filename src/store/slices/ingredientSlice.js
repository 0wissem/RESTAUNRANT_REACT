import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ingredients: null,
  isloading: false,
  error: null,
  ingredientInfo: null,
};

//get all ingredients
export const getIngredients = createAsyncThunk(
  "ingredients",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(`http://localhost:3001/api/ingredient/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//get an ingredient by id
export const getIngredientById = createAsyncThunk(
  "ingredient/getIngredientById",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `http://localhost:3001/api/ingredient/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//add an ingredient
export const addIngredients = createAsyncThunk(
  "ingredients/addIngredients",
  async (ingredient, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        "http://localhost:3001/api/ingredient/add",
        ingredient
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//update an ingredient
export const updateIngredients = createAsyncThunk(
  "ingredients/updateIngredients",
  async (ingredient, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(
        `http://localhost:3001/api/ingredient/update/` + ingredient.id,
        ingredient
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//delete an ingredient
export const deleteIngredient = createAsyncThunk(
  "ingredients/deleteIngredient",
  async (ingredient, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(
        `http://localhost:3001/api/ingredient/delete/${ingredient._id}`
      );

      return ingredient;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: {
    //get Ingredients
    [getIngredients.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [getIngredients.fulfilled]: (state, action) => {
      state.isloading = false;
      state.ingredients = action.payload;
    },
    [getIngredients.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
    //get an ingredient by id
    [getIngredientById.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [getIngredientById.fulfilled]: (state, action) => {
      state.isloading = false;
      state.ingredientInfo = action.payload;
    },
    [getIngredientById.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
    // add ingredient
    [addIngredients.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [addIngredients.fulfilled]: (state, action) => {
      state.isloading = false;

      state.ingredients.push(action.payload);
    },
    [addIngredients.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
    // update ingredient
    [updateIngredients.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [updateIngredients.fulfilled]: (state, action) => {
      state.isloading = false;
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload.id
      );
      state.ingredients = action.payload;
    },
    [updateIngredients.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
    //delete an Ingredient
    [deleteIngredient.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [deleteIngredient.fulfilled]: (state, action) => {
      state.isloading = false;
    },
    [deleteIngredient.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
  },
});

export default ingredientSlice.reducer;
