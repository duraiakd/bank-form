import axios from "axios";
import { API_URL } from "./config";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = API_URL;
axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization =  `1251a1de9906a858d1fc697792a5f5a7065a5fe984a159b1d3c3bbea160aa39b`;     
    return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!"
    )
);

export default axiosInstance;