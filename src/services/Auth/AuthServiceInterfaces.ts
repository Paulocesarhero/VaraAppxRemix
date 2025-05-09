export interface LoginViewModel {
  CorreoElectronico: string;
  Contraseña: string;
}

export interface ResponseApi {
  error: boolean;
  message: string[];
  data: {
    token: string;
    fecha_de_expiración: string;
  };
}

export interface RegistroCientificoRequest {
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  CorreoElectronico: string;
  Contraseña: string;
  Institucion: string;
  TelefonoMovil: string;
  Estado: string;
  TelefonoFijo: string;
  Calle: string;
  CodigoPostal: string;
  Ciudad: string;
  Origen: string;
}
