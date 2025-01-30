import { Especie } from "../Especie/GetEspecie";
import RegistroMorfometricoSirenio from "../../forms/MorfometriaSirenio/RegistroMorfometricoSirenio";
import RegistroMorfometricoOdontoceto from "../../forms/MorformetriaOdontoceto/RegistroMorfometricoOdontoceto";
import { RegistroMorfometricoPinnipedo } from "../../forms/MorfometriaPinnipedo/RegistroMorfometricoPinnipedo";
import { FormValuesMorfometriaMisticeto } from "../../forms/MorfometriaMisticeto/FormValuesMorfometriaMisticeto";

export type Aviso = {
  Acantilado: boolean;
  FacilAcceso: boolean;
  LugarDondeSeVio: number;
  Sustrato: number;
  FechaDeAvistamiento: string;
  Observaciones: string;
  TipoDeAnimal: number;
  CondicionDeAnimal: number;
  CantidadDeAnimales: number;
  InformacionDeLocalizacion: string;
  Latitud: number;
  Longitud: number;
};
export type FormatoGeneral = {
  TemperaturaAmbiente: number;
  PrecipitacionHoy: number;
  TemperaturaSupMar: number;
  Marea: number;
  MareaMedida: number;
  DireccionCorriente: number;
  DireccionDelViento: number;
  VelocidadDelViento: number;
  Nubosidad: number;
  Oleaje: number;
  Beaufort: number;
  PrecipitacionTormentaPrevia: number;
  AnormalidadGeomagnetica: boolean;
  MareaRoja: boolean;
  AnormalidadEnLaPesca: string;
  Observaciones: string;
  Aviso: Aviso;
};

export interface AccionesYResultados {
  autoridades: string | null;
  telefonoAutoridades: string | null;
  morfometria: boolean;
  necropsia: boolean;
  disposicionDelCadaver: number;
  disposicionOtro: string | null;
  tipoDeMuestras:
    | {
        TipoMuestra: number;
      }[]
    | null;
  posibleCausaDelVaramiento: string | null;
  posibleCausaDeMuerte: string | null;
  participantes: string | null;
  observaciones: string | null;
}

export interface SoloOrganismoVivo {
  tasaDeRespiracion: string | null;
  pulso: string | null;
  temperatura: number | null;
  antesDeVararse: string | null;
  varado: string | null;
  reflotacion: boolean;
  despuesDeReflotar: string | null;
  animalTransferido: boolean;
  lugarDeRehabilitacion: string | null;
  despuesDeVararse: string | null;
}

export interface Peticion {
  Latitud: string;
  Longitud: string;
  EspecieId: number;
  Especie: Especie;
  FormatoGeneral: FormatoGeneral;
  RegistroMorfometricoSirenio: RegistroMorfometricoSirenio;
  RegistroMorfometricoOdontoceto: RegistroMorfometricoOdontoceto;
  RegistroMorfometricoPinnipedo: RegistroMorfometricoPinnipedo;
  RegistroMorfometricoMisticeto: FormValuesMorfometriaMisticeto;
  AccionesYResultados: AccionesYResultados;
  SoloOrganismoVivo: SoloOrganismoVivo;
  Condicion: number;
  LongitudTotalRectilinea: number | null;
  Peso: number | null;
  Sexo: number;
  GrupoDeEdad: number;
  OrientacionDelEspecimen: string;
  Sustrato: number;
  OtroSustrato: string;
  HeridasBala: string;
  PresenciaDeRedes: string;
  Mordidas: string;
  Golpes: string;
  OtroTipoDeHeridas: string;
}

export interface Response {
  error: boolean;
  message: any[];
  data: {
    data: {
      idEspecimen: number;
      idAviso: string;
    };
  };
}

export type ImagenType =
  | "golpes"
  | "heridasDeBala"
  | "otros"
  | "mordidas"
  | "presenciaDeRedes";
