import axios from "axios";

export const BASE_URL = "http://192.168.1.233";

const api = axios.create({
  baseURL: BASE_URL,
});
api.interceptors.request.use(
  (config) => {
    /*console.log("URL completa de la solicitud:", config.baseURL + config.url)*/
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
