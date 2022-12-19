import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  recipes: null,
  loading: false,
  error: null,
  recipesInfo: null,
};

//get all recipes
export const getRecipes = createAsyncThunk("recipes", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(`http://localhost:3001/api/recipe/`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

//get a recipe by id
export const getRecipesById = createAsyncThunk(
  "recipes/getRecipesById",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `http://localhost:3001/api/recipe/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//add a recipe
export const addRecipe = createAsyncThunk(
  "recipes/addRecipe",
  async (recipes, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        "http://localhost:3001/api/recipe/add",
        recipes,
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
//update a recipe
export const updateRecipe = createAsyncThunk(
  "recipes/updateRecipe",
  async (recipes, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(
        `http://localhost:3001/api/recipe/update/` + recipes.get("id"),
        recipes
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//delete a recipe
export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`http://localhost:3001/api/recipe/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: {
    //get recipes
    [getRecipes.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getRecipes.fulfilled]: (state, action) => {
      state.loading = false;
      state.recipes = action.payload;
    },
    [getRecipes.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //get recipe by id
    [getRecipesById.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getRecipesById.fulfilled]: (state, action) => {
      state.loading = false;
      state.recipesInfo = action.payload;
    },
    [getRecipesById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // add recipe
    [addRecipe.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [addRecipe.fulfilled]: (state, action) => {
      state.loading = false;

      state.recipes.push(action.payload);
    },
    [addRecipe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // update recipe
    [updateRecipe.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [updateRecipe.fulfilled]: (state, action) => {
      state.loading = false;
      state.recipes = state.recipes.filter(
        (recipes) => recipes._id !== action.payload.id
      );
      state.recipes = action.payload;
    },
    [updateRecipe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //delete a recipe
    [deleteRecipe.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [deleteRecipe.fulfilled]: (state, action) => {
      state.isloading = false;
      console.log("fulfilled " + action.payload);
    },
    [deleteRecipe.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
      console.log("rec " + action.payload);
    },
  },
});

export default recipesSlice.reducer;
