import { AppAsyncThunkApi } from "../../store";
import apiClient from "../../../shared/api";
import { getBearer } from "../../../shared/utils";
import { FindOptions, Group } from "../../../shared/models";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_GROUP, CREATE_GROUP, GET_GROUPS, SET_GROUPS } from "../../types";
import { CreateGroupResponse, GetGroupsResponse, PayloadAddGroup, PayloadSetGroups } from "./interfaces";

export const addGroup = createAction<PayloadAddGroup>(ADD_GROUP);
export const setGroups = createAction<PayloadSetGroups>(SET_GROUPS);

export const createGroup = createAsyncThunk<void, Partial<Group>, AppAsyncThunkApi>(
  CREATE_GROUP,
  async (group, { dispatch, getState, rejectWithValue }) => {
    try {
      const response = await apiClient.request<CreateGroupResponse>({
        method: "POST",
        headers: { Authorization: getBearer(getState().auth.token) },
        url: "/v1/groups",
        data: { ...group },
      });
      if (response.data?.payload) {
        dispatch(getGroups({}));
      }
    } catch (e) {
      return rejectWithValue(e.response?.data.error_code);
    }
  }
);
export const getGroups = createAsyncThunk<void, FindOptions | undefined, AppAsyncThunkApi>(
  GET_GROUPS,
  async (options, { getState, dispatch, rejectWithValue }) => {
    const params = options || {};
    if (options && !Object.keys(options).length) {
      params.s && (params.s = getState().groups.size);
      params.p && (params.p = getState().groups.page);
      params.q && Object.keys(params.q).length && (params.q = getState().groups.query);
    }
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
        const { entries, page, size, total } = response.data.payload;
        dispatch(setGroups({ entries, page, size, total, query: params.q }));
      }
    } catch (e) {
      return rejectWithValue(e.response?.data.error_code);
    }
  }
);
