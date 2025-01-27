import { hasVaramientoMasivo } from "../../database/repository/varamientoMasivoRepo";
import api, { BASE_URL } from "../Api";
import { Especie } from "../Especie/GetEspecie";
import RegistroMorfometricoSirenio from "../../forms/MorfometriaSirenio/RegistroMorfometricoSirenio";
import RegistroMorfometricoOdontoceto from "../../forms/MorformetriaOdontoceto/RegistroMorfometricoOdontoceto";
import { RegistroMorfometricoPinnipedo } from "../../forms/MorfometriaPinnipedo/RegistroMorfometricoPinnipedo";
import { FormValuesMorfometriaMisticeto } from "../../forms/MorfometriaMisticeto/FormValuesMorfometriaMisticeto";
import { getAvisoBdLocal } from "../../database/repository/avisoRepo";
import * as FileSystem from "expo-file-system";
import { db } from "../../database/connection/sqliteConnection";
import { avisos, AvisoWithRelations } from "../../database/schemas/avisoSchema";
import { eq } from "drizzle-orm";
import {
  FotoAndDescription,
  getImagesEspecimen,
} from "../../database/repository/especimenRepo";

type Aviso = {
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
type FormatoGeneral = {
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

interface AccionesYResultados {
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

interface SoloOrganismoVivo {
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

interface Peticion {
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

interface Response {
  error: boolean;
  message: any[];
  data: {
    data: {
      idEspecimen: number;
      idAviso: string;
    };
  };
}

const generateAviso = (resultSqlite: AvisoWithRelations): Aviso => ({
  Acantilado: resultSqlite.acantilado === 1,
  FacilAcceso: resultSqlite.facilAcceso === 1,
  LugarDondeSeVio: resultSqlite.lugarDondeSeVio ?? 0,
  Sustrato: resultSqlite.sustrato ?? 0,
  FechaDeAvistamiento: resultSqlite.fechaDeAvistamiento ?? "",
  Observaciones: resultSqlite.observaciones ?? "",
  TipoDeAnimal: resultSqlite.tipoDeAnimal ?? 0,
  CondicionDeAnimal: resultSqlite.condicionDeAnimal ?? 0,
  CantidadDeAnimales: Number(resultSqlite.cantidadDeAnimales) ?? 1,
  InformacionDeLocalizacion: resultSqlite.informacionDeLocalizacion ?? "",
  Latitud: Number(resultSqlite.latitud) ?? 0,
  Longitud: Number(resultSqlite.longitud) ?? 0,
});

const generateFormatoGeneral = (
  resultSqlite: any,
  aviso: Aviso
): FormatoGeneral => ({
  TemperaturaAmbiente: resultSqlite.ambiente?.temperaturaAmbiente ?? 0,
  PrecipitacionHoy: resultSqlite.ambiente?.precipitacionHoy ?? 0,
  TemperaturaSupMar: resultSqlite.ambiente?.temperaturaSupMar ?? 0,
  Marea: resultSqlite.ambiente?.marea ?? 0,
  MareaMedida: resultSqlite.ambiente?.mareaMedida ?? 0,
  DireccionCorriente: resultSqlite.ambiente?.direccionCorriente ?? 0,
  DireccionDelViento: resultSqlite.ambiente?.direccionDelViento ?? 0,
  VelocidadDelViento: resultSqlite.ambiente?.velocidadDelViento ?? 0,
  Nubosidad: resultSqlite.ambiente?.nubosidad ?? 0,
  Oleaje: resultSqlite.ambiente?.oleaje ?? 0,
  Beaufort: resultSqlite.ambiente?.beaufort ?? 0,
  PrecipitacionTormentaPrevia:
    resultSqlite.ambiente?.precipitacionTormentaPrevia ?? 0,
  AnormalidadGeomagnetica: resultSqlite.ambiente?.anormalidadGeomagnetica === 1,
  MareaRoja: !!resultSqlite.ambiente?.mareaRoja,
  AnormalidadEnLaPesca: resultSqlite.ambiente?.anormalidadEnLaPesca ?? "",
  Observaciones: resultSqlite.observaciones ?? "",
  Aviso: aviso,
});

const generateSoloOrganismoVivo = (
  resultSqlite: AvisoWithRelations
): SoloOrganismoVivo => {
  return {
    tasaDeRespiracion:
      resultSqlite.especimenes[0]?.organismo?.tasaDeRespiracion ?? null,
    pulso: resultSqlite.especimenes[0]?.organismo?.pulso ?? null,
    temperatura:
      Number(resultSqlite.especimenes[0]?.organismo?.temperatura) ?? null,
    antesDeVararse:
      resultSqlite.especimenes[0]?.organismo?.antesDeVararse ?? null,
    varado: resultSqlite.especimenes[0]?.organismo?.varado ?? null,
    reflotacion: resultSqlite.especimenes[0]?.organismo?.reflotacion === 1,
    despuesDeReflotar:
      resultSqlite.especimenes[0]?.organismo?.despuesDeReflotar ?? null,
    animalTransferido:
      resultSqlite.especimenes[0]?.organismo?.animalTransferido === 1,
    lugarDeRehabilitacion:
      resultSqlite.especimenes[0]?.organismo?.lugarDeRehabilitacion ?? null,
    despuesDeVararse:
      resultSqlite.especimenes[0]?.organismo?.despuesDeVararse ?? null,
  };
};

const generateAccionesYResultados = (
  resultSqlite: AvisoWithRelations
): AccionesYResultados => {
  const tipoDeMuestras =
    typeof resultSqlite.especimenes[0]?.acciones?.tipoDeMuestras === "string"
      ? JSON.parse(resultSqlite.especimenes[0]?.acciones?.tipoDeMuestras).map(
          (item: string) => ({ TipoMuestra: Number(item) })
        )
      : null;
  return {
    autoridades: resultSqlite.especimenes[0]?.acciones?.autoridades ?? "",
    telefonoAutoridades:
      resultSqlite.especimenes[0]?.acciones?.telefonoAutoridades ?? "",
    morfometria: resultSqlite.especimenes[0]?.acciones?.morfometria === 1,
    necropsia: resultSqlite.especimenes[0]?.acciones?.necropsia === 1,
    disposicionDelCadaver:
      Number(resultSqlite.especimenes[0]?.acciones?.disposicionDelCadaver) ?? 0,
    disposicionOtro:
      resultSqlite.especimenes[0]?.acciones?.disposicionOtro ?? "",
    tipoDeMuestras: tipoDeMuestras,
    posibleCausaDelVaramiento:
      resultSqlite.especimenes[0].acciones?.posibleCausaDelVaramiento ?? "",
    participantes: resultSqlite.especimenes[0]?.acciones?.participantes ?? "",
    observaciones: resultSqlite.especimenes[0]?.acciones?.observaciones ?? "",
    posibleCausaDeMuerte:
      resultSqlite.especimenes[0]?.acciones?.posibleCausaDeMuerte ?? "",
  };
};

const generatePeticion = async (idAviso: number): Promise<Peticion | null> => {
  const resultSqlite = await getAvisoBdLocal(idAviso);
  if (!resultSqlite) return null;

  const aviso = generateAviso(resultSqlite);
  const formatoGeneral = generateFormatoGeneral(resultSqlite, aviso);

  return {
    Latitud: resultSqlite.latitud ?? "",
    Longitud: resultSqlite.longitud ?? "",
    EspecieId: resultSqlite.especimenes[0]?.especieId ?? 1,
    Condicion: resultSqlite.condicionDeAnimal ?? 0,
    LongitudTotalRectilinea: resultSqlite.especimenes[0]
      ?.longitudTotalRectilinea
      ? Number(resultSqlite.especimenes[0]?.longitudTotalRectilinea)
      : null,
    Peso: resultSqlite.especimenes[0]?.peso
      ? Number(resultSqlite.especimenes[0]?.peso)
      : null,
    Sexo: resultSqlite.especimenes[0]?.sexo ?? 0,
    GrupoDeEdad: resultSqlite.especimenes[0]?.grupoDeEdad ?? 0,
    OrientacionDelEspecimen:
      resultSqlite.especimenes[0]?.orientacionDelEspecimen ?? "",
    Sustrato: resultSqlite.especimenes[0]?.sustrato ?? 0,
    OtroSustrato: resultSqlite.especimenes[0]?.otroSustrato ?? "",
    HeridasBala: resultSqlite.especimenes[0]?.heridasBala ?? "",
    PresenciaDeRedes: resultSqlite.especimenes[0]?.presenciaDeRedes ?? "",
    Mordidas: resultSqlite.especimenes[0]?.mordidas ?? "",
    Golpes: resultSqlite.especimenes[0]?.golpes ?? "",
    OtroTipoDeHeridas: resultSqlite.especimenes[0]?.otroTipoDeHeridas ?? "",
    Especie:
      (resultSqlite.especimenes[0]?.especie as Especie) ?? ({} as Especie),
    RegistroMorfometricoMisticeto:
      (resultSqlite.especimenes[0]
        ?.misticeto as FormValuesMorfometriaMisticeto) ??
      ({} as FormValuesMorfometriaMisticeto),
    RegistroMorfometricoPinnipedo:
      (resultSqlite.especimenes[0]
        ?.pinnipedo as RegistroMorfometricoPinnipedo) ??
      ({} as RegistroMorfometricoPinnipedo),
    RegistroMorfometricoSirenio:
      (resultSqlite.especimenes[0]?.sirenio as RegistroMorfometricoSirenio) ??
      ({} as RegistroMorfometricoSirenio),
    RegistroMorfometricoOdontoceto:
      (resultSqlite.especimenes[0]
        ?.odontoceto as RegistroMorfometricoOdontoceto) ??
      ({} as RegistroMorfometricoOdontoceto),
    AccionesYResultados: generateAccionesYResultados(resultSqlite),
    FormatoGeneral: formatoGeneral,
    SoloOrganismoVivo: generateSoloOrganismoVivo(resultSqlite),
  };
};

export const getImageUri = async (idAviso: number) => {
  try {
    const result = await db
      .select({ imagen: avisos.fotografia })
      .from(avisos)
      .where(eq(avisos.id, idAviso));
    return result[0].imagen;
  } catch (error) {
    return null;
  }
};

export const saveAviso = async (idAviso: number, token: string) => {
  const hasVaramientoMasivoLocal = await hasVaramientoMasivo(idAviso);
  if (!hasVaramientoMasivoLocal) {
    const peticion = await generatePeticion(idAviso);
    console.log("Peticion generada:", JSON.stringify(peticion, null, 2));

    if (peticion) {
      try {
        const response: Response = await api.post(
          `api/Aviso/ReportarVaramientoIndividual`,
          peticion,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const imagen = await getImageUri(idAviso);
        console.log("Imagen de aviso local:", imagen);
        if (!imagen) {
          return response;
        }

        const UpdateImageAviso = await uploadFileFotoAviso(
          response.data.data.idAviso,
          imagen,
          token
        );
        console.log(
          "Resultado de la subida de la foto de aviso:",
          UpdateImageAviso
        );
        const imagenEspecimen: FotoAndDescription[] = await getImagesEspecimen(
          response.data.data.idEspecimen
        );

        for (const imagen of imagenEspecimen) {
          const UpdateImageEspecimen = await uploadFileEspecimen(
            response.data.data.idEspecimen.toString(),
            imagen.typeImagen,
            imagen.uriPhoto,
            token
          );
          console.log(
            "Resultado de la subida de la foto de especimen:",
            UpdateImageEspecimen
          );
        }

        return response;
      } catch (error) {
        console.error(
          "Error al reportar varamiento individual:",
          // @ts-ignore
          error.response.data
        );
        throw error; // Lanzar el error para que sea manejado por quien invoque la función
      }
    }
  } else {
    console.log("Ya existe un varamiento masivo para este aviso");
  }
};

export const uploadFileFotoAviso = async (
  idAviso: string,
  fileUri: string,
  token: string
) => {
  console.log("Uploading file:", fileUri);
  try {
    const result = await FileSystem.uploadAsync(
      `${BASE_URL}/api/Aviso/GuardarFotoAviso/${idAviso}`,
      fileUri,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        fieldName: "Fotografias",
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      }
    );
    console.log("Resultado de la subida de la foto de aviso:", result.body);
  } catch (error) {
    console.error("Error al subir la foto de aviso:", error);
    throw error;
  }
};
export type ImagenType =
  | "golpes"
  | "heridasDeBala"
  | "otros"
  | "mordidas"
  | "presenciaDeRedes";

export const uploadFileEspecimen = async (
  idEspecimen: string,
  typeImagen: ImagenType,
  fileUri: string,
  token: string
) => {
  console.log("Uploading file:", fileUri);
  try {
    const result = await FileSystem.uploadAsync(
      `${BASE_URL}/api/Aviso/GuardarFotoFormatoIndividual/${idEspecimen}/${typeImagen}`,
      fileUri,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        fieldName: "Fotografias",
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      }
    );
    console.log("Resultado de la subida de la foto de especimen:", result.body);
    console.log("Eliminando archivo temporal:", fileUri);
    await FileSystem.deleteAsync(fileUri);
  } catch (error) {
    console.error("Error al subir la foto de especimen:", error);
    throw error;
  }
};
