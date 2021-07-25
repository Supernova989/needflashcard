import { AppAsyncThunkApi } from "../../store";
import apiClient from "../../../shared/api";
import { getBearer } from "../../../shared/utils";
import { FindOptions } from "../../../shared/models";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SET_GROUPS } from "../../types";
import { GetGroupsResponse, PayloadSetGroups } from "./interfaces";

export const setGroups = createAction<PayloadSetGroups>(SET_GROUPS);

export const getGroups = createAsyncThunk<void, FindOptions | undefined, AppAsyncThunkApi>(
  "GET_GROUPS",
  async (options, { getState, dispatch, rejectWithValue }) => {
    const params = options || {};
    if (params.q) {
      params.q = JSON.stringify(params.q);
    }
    try {
      const response = await apiClient.request<GetGroupsResponse>({
        method: "GET",
        params: params,
        headers: { Authorization: getBearer(getState().auth.token) },
        url: "/v1/groups",
      });
      if (response.data?.payload) {
        const {entries, page, size, total} = response.data.payload;
        dispatch(setGroups({ groups: entries, page, size, total }));
      }
    } catch (e) {
      return rejectWithValue(e.response?.data.error_code);
    }
  }
);
