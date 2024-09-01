import api from "./Api";
import { LoginResponse, LoginViewModel } from "./AuthServiceInterfaces";

export const Login = async (data: LoginViewModel): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(
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
