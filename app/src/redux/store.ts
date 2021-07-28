import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducer as authReducer } from "./reducers/@auth";
import { reducer as groupReducer } from "./reducers/@groups";
import { reducer as wordSearchReducer } from "./reducers/@wordSearch";
import logger from "redux-logger";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

export const rootReducer = {
  auth: authReducer,
  groups: groupReducer,
  wordSearch: wordSearchReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppAsyncThunkApi<RV = number> = BaseThunkAPI<RootState, unknown, AppDispatch> & {
  rejectValue: RV;
  state: RootState;
};

export default store;
