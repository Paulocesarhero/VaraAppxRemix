import api from "./Api";

interface LoginResponse {
  token: string;
}

const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(
      "/Autenticacion/IniciarSesion",
      {
        email,
        password,
      },
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else {
      throw new Error(error.message || "An unexpected error occurred");
    }
  }
};

const register = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { login, register };
