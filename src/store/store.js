import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import orderSlice from "./slices/orderSlice";
import userSlice from "./slices/userSlice";

const persistConfig = {
  key: "root",
  storage,
};
const userPersistedSlice = persistReducer(persistConfig, userSlice);
const orderPersistedSlice = persistReducer(persistConfig, orderSlice);

export const store = configureStore({
  reducer: {
    order: orderPersistedSlice,
    user: userPersistedSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const persistor = persistStore(store);
