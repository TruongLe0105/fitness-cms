import axios from "axios";
import { API_URL } from "config/environments";
// eslint-disable-next-line
export const initialInterceptor = () => {
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token") || "";
    const tokenType = localStorage.getItem("token_type") || "Bearer";
    config.url = API_URL + config.url;

    if (token && tokenType && config.headers) {
      config.headers.Authorization = `${tokenType} ${token}`;
    }
    return config;
  });
};
