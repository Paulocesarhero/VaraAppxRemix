import axios from "axios";

const api = axios.create({
  baseURL: "https://192.168.1.15/api/",
  timeout: 10000,
});

export default api;
