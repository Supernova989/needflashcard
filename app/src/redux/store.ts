import { configureStore, ThunkAction, Action, Store, applyMiddleware } from "@reduxjs/toolkit";
import { reducer as authReducer } from "./reducers/@auth";
import logger from "redux-logger";

export const rootReducer = {
  auth: authReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
