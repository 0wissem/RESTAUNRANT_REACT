import axios from "axios";
import config from "../constants/config";

const customAxios = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    responseType: "json",
  },
});
customAxios.interceptors.response.use(
  (response) => {
    if (!response.data) console.log("no data in succesfull response");
    return response?.data || null;
  },
  (error) => {
    return {
      error: error,
    };
  }
);

export const setAuthToken = (token) => {
  customAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  delete customAxios.defaults.headers.common["Authorization"];
};

export default customAxios;
