import axios, { AxiosResponse } from "axios";
import { removeTrailingSlash } from "./utils";

const apiClient = axios.create({
  baseURL: removeTrailingSlash(process.env.REACT_APP_HOST_API) + "/api",
});

apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use((response): AxiosResponse | Promise<AxiosResponse> => {
  if (response.data.error_code) {
    return Promise.reject(response);
  }
  return response;
});

export default apiClient;
