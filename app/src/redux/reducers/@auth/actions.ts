import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Payload } from "./index";
import { AUTHENTICATE, LOG_IN, LOG_OUT } from "../../types";
import { AppAsyncThunkApi } from "../../store";
import { BackendLoginResponse } from "./interfaces";
import apiClient from "../../../shared/api";

export const login = createAction<Payload>(LOG_IN);
export const logout = createAction(LOG_OUT);

export const authenticateUser = createAsyncThunk<number, { email: string; password: string }, AppAsyncThunkApi>(
  AUTHENTICATE,
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiClient.request<BackendLoginResponse>({
        url: "/authenticate",
        method: "POST",
        withCredentials: false,
        data: { email, password },
      });
      dispatch(login({ token: response.data.payload?.token }));
      return 0;
    } catch (e) {
      return rejectWithValue(e.response?.data.error_code);
    }
  }
);
