import { AppThunk } from "../../store";
import apiClient from "../../../shared/api";
import { getBearer } from "../../../shared/utils";

export const getGroups = (filter?: Object): AppThunk => {
  let url = `/v1/groups`;
  if (filter) {
    url += `?q=${JSON.stringify(filter)}`;
  }
  return (dispatch, getState) => {
    return apiClient
      .request({
        method: "GET",
        headers: {
          Authorization: getBearer(getState().auth.token),
        },
        url,
      })
      .then(() => {})
      .catch(() => {});
  };
};
