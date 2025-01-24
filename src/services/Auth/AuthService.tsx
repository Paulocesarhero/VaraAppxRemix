import api from "../Api";
import {
  LoginViewModel,
  RegistroCientificoRequest,
  ResponseApi,
} from "./AuthServiceInterfaces";
import axios from "axios";

export const Login = async (data: LoginViewModel): Promise<ResponseApi> => {
  try {
    const response = await api.post<ResponseApi>(
      "/Api/Autenticacion/IniciarSesion",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      switch (status) {
        case 400:
          throw new Error("Correo o contraseña incorrectos.");
        case 401:
          throw new Error("No autorizado. Verifica tus credenciales.");
        case 500:
          throw new Error("Error interno del servidor. Inténtalo más tarde.");
        default:
          throw new Error(
            error.response?.data?.message ||
              "Ocurrió un error inesperado. probablemente el servidor no está en línea."
          );
      }
    }
    throw new Error(error.message || "Ocurrió un error desconocido.");
  }
};

export const RegistroCientifico = async (
  data: RegistroCientificoRequest
): Promise<ResponseApi> => {
  try {
    const response = await api.post<ResponseApi>(
      "/Api/Autenticacion/RegistrarUsuarioExperto2",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export default { Login, RegistroCientifico };
