import axios from "axios";
import { router } from "expo-router";
import useSettingStore from "../hooks/globalState/useSettingStore";

export const BASE_URL = "http://192.168.1.15";

const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor de respuesta para manejar errores 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const { actions } = useSettingStore.getState(); // Accede al estado de Zustand correctamente
      await actions.setLoggedIn(false);
      router.replace("/");
    }
    return Promise.reject(error);
  }
);

// Interceptor de request para debugging (opcional)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
