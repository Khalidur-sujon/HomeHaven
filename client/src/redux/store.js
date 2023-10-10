import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

import userReducer from "./user/userSlice.js";

const rootReducer = combineReducers({ user: userReducer });

const persistcConfig = {
	key: "user",
	version: 1,
	storage,
};

const persistedReducer = persistReducer(persistcConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
export const persistor = persistStore(store);
