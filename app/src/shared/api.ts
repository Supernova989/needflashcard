import axios, { AxiosResponse } from "axios";
import { removeTrailingSlash } from "./utils";

const apiClient = axios.create({
  baseURL: removeTrailingSlash(process.env.REACT_APP_HOST_API) + "/api",
});

apiClient.interceptors.request.use(
  (config) => {
    // const token = store.getState().auth.token;
    //  if (token) {
    //    config.headers.Authorization = `Bearer ${token}`;
    //  }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use((response): AxiosResponse | Promise<AxiosResponse> => {
  if (response.data.error_code) {
    console.log("error code detected");
    return Promise.reject(response);
  }
  return response;
});

export interface Response<T> {
  payload?: T;
  error_code: number;
}

export interface ResponsePagination<T> {
  payload?: {
    size: number;
    page: number;
    total: number;
    entries: T[];
  };
  error_code: number;
}

export default apiClient;
