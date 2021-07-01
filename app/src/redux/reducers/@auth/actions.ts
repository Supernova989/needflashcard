import { createAction } from "@reduxjs/toolkit";
import { Payload } from "./index";
import { LOG_IN } from "../../types";
import { AppThunk } from "../../store";
import apiClient from "../../../shared/api";
import { BackendLoginResponse } from "./interfaces";

export const ac_login = createAction<Payload>(LOG_IN);

export const authenticateUser = (email: string, password: string): AppThunk<Promise<boolean>> => {
  return (dispatch, getState) => {
    return apiClient
      .request<BackendLoginResponse>({
        url: "/authenticate",
        method: "POST",
        data: { email, password },
      })
      .then((response) => {
        dispatch(ac_login({ token: response.data.token }));
        return true;
      })
      .catch(() => {
        return false;
      });
  };
};
