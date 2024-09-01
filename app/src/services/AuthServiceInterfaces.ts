export interface LoginViewModel {
  CorreoElectronico: string;
  Contraseña: string;
}

export interface LoginResponse {
  error: boolean;
  message: string[];
  data: {
    token: string;
    fecha_de_expiración: string;
  };
}
