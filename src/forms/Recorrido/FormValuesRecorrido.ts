type Coordenada = {
  latitud: number;
  longitud: number;
};

type FormValuesRecorrido = {
  fecha: string; // Formato YYYY-MM-DD
  horaInicio: Date; // Formato HH:MM:SS
  horaFin: Date; // Formato HH:MM:SS
  coordenadaInicio: Coordenada;
  coordenadaFin: Coordenada;
  referenciasInicio: string;
  referenciasFin: string;
  distanciaRecorrido: number;
  observaciones: string;
  participantes: string;
  zonaSeguimiento: string;
  ruta: Coordenada[];
};
