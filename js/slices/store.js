import { combineReducers, configureStore, getDefaultMiddleware, } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./authSlice";
const reducers = combineReducers({
    auth: authReducer,
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
// eslint-disable-next-line
export const useAppDispatch = () => useDispatch();
// Inject Type RootState on useSelector
export const useAppSelector = useSelector;
export default stateStore;
