import { createAction } from "@reduxjs/toolkit";
import { Payload } from "./index";
import { LOG_IN } from "../../types";
import { AppThunk } from "../../store";
import apiClient from "../../../shared/api";
import { BackendLoginResponse } from "./interfaces";
import { AxiosError, AxiosPromise, AxiosResponse, AxiosStatic } from "axios";

export const ac_login = createAction<Payload>(LOG_IN);

export const authenticateUser = (email: string, password: string): AppThunk<Promise<number>> => {
  return (dispatch, getState) => {
    return apiClient
      .request<BackendLoginResponse>({
        url: "/authenticate",
        method: "POST",
        withCredentials: false,
        data: { email, password },
      })
      .then((response) => {
        dispatch(ac_login({ token: response.data.payload?.token }));
        return 0;
      })
      .catch((error: AxiosError) => {
        return error.response?.data.error_code as number;
      });
  };
};
