import { AppThunk } from "../../store";
import apiClient from "../../../shared/api";
import { getBearer } from "../../../shared/utils";
import { FindOptions, Group, Response } from "../../../shared/models";
import { createAction } from "@reduxjs/toolkit";
import { SET_GROUPS } from "../../types";
import { GetGroupsResponse, PayloadSetGroups } from "./interfaces";

export const ac_setGroups = createAction<PayloadSetGroups>(SET_GROUPS);

export const getGroups = (options?: FindOptions): AppThunk => {
  let url = `/v1/groups`;
  const params = options || {};
  if (params.q) {
    params.q = JSON.stringify(params.q);
  }
  return (dispatch, getState) => {
    return apiClient
      .request<GetGroupsResponse>({
        method: "GET",
        params: params,
        headers: {
          Authorization: getBearer(getState().auth.token),
        },
        url,
      })
      .then((res) => {
        if (res.data?.payload) {
          dispatch(ac_setGroups({ groups: res.data.payload }));
        }
      })
      .catch(() => {});
  };
};
