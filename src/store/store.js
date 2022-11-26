import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import orderSlice from "./slices/orderSlice";
import userSlice from "./slices/userSlice";
import familySlice from "./slices/familySlice";

const persistConfig = {
  key: "root",
  storage,
};
const userPersistedSlice = persistReducer(persistConfig, userSlice);
const orderPersistedSlice = persistReducer(persistConfig, orderSlice);

export const store = configureStore({
  reducer: {
    families: familySlice,
    order: orderPersistedSlice,
    user: userPersistedSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
