import api from "../Api";
import {
  LoginViewModel,
  RegistroCientificoRequest,
  ResponseApi,
} from "./AuthServiceInterfaces";

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
  } catch (error) {
    throw error;
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
