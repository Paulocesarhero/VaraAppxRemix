import api from "./Api";
import {
  ResponseApi,
  LoginViewModel,
  RegistroCientificoRequest,
} from "./AuthServiceInterfaces";
import { AxiosError } from "axios";
import { FormValues } from "varaapplib/components/InformacionPersonalForm/types";

export const Login = async (data: LoginViewModel): Promise<ResponseApi> => {
  try {
    const response = await api.post<ResponseApi>(
      "/Api/Autenticacion/IniciarSesion",
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
): Promise<ResponseApi> => {
  try {
    const response = await api.post<ResponseApi>(
      "/Api/Autenticacion/RegistrarUsuarioExperto2",
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
