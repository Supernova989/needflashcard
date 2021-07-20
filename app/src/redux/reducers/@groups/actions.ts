import { AppThunk } from "../../store";
import apiClient from "../../../shared/api";
import { getBearer } from "../../../shared/utils";
import { FindOptions } from "../../../shared/models";

export const getGroups = (options?: FindOptions): AppThunk => {
  let url = `/v1/groups`;
  const params = options || {};
  if (params.q) {
    params.q = JSON.stringify(params.q);
  }
  console.log("here2", {params});
  return (dispatch, getState) => {
    return apiClient
      .request({
        method: "GET",
        params: params,
        headers: {
          Authorization: getBearer(getState().auth.token),
        },
        url,
      })
      .then(() => {})
      .catch(() => {});
  };
};
