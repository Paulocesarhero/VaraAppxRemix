import api from "./Api";
import {
  Response,
  LoginViewModel,
  RegistroCientificoRequest,
} from "./AuthServiceInterfaces";

export const Login = async (data: LoginViewModel): Promise<Response> => {
  try {
    const response = await api.post<Response>(
      "/Api/Autenticacion/IniciarSesionVaraAppx",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const RegistroCientifico = async (
  data: RegistroCientificoRequest,
): Promise<Response> => {
  try {
    const response = await api.post<Response>(
      "/Api/Autenticacion/RegistrarUsuarioExperto",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error en RegistroCientifico:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
