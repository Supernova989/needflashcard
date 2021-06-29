import axios from "axios";
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

export default apiClient;
