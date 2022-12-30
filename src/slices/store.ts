import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./authSlice";
import { packageReducer } from "./packageSlice";
import { selectReducer } from "./selectSlice";
import { userReducer } from "./userSlice";

const reducers = combineReducers({
  auth: authReducer,
  subject: selectReducer,
  users: userReducer,
  packages: packageReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducers = persistReducer(persistConfig, reducers);

const stateStore = configureStore({
  reducer: persistedReducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(stateStore);

// State Type
export type RootState = ReturnType<typeof reducers>;

// Dispatch Type
export type AppDispatch = typeof stateStore.dispatch;
// eslint-disable-next-line
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Inject Type RootState on useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default stateStore;
