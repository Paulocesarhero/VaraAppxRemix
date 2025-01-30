import { eq } from "drizzle-orm";
import * as FileSystem from "expo-file-system";

import { db } from "../../database/connection/sqliteConnection";
import { getAvisoBdLocal } from "../../database/repository/avisoRepo";
import {
  FotoAndDescription,
  getImagesEspecimen,
} from "../../database/repository/especimenRepo";
import { hasVaramientoMasivo } from "../../database/repository/varamientoMasivoRepo";
import { avisos, AvisoWithRelations } from "../../database/schemas/avisoSchema";
import { FormValuesMorfometriaMisticeto } from "../../forms/MorfometriaMisticeto/FormValuesMorfometriaMisticeto";
import { RegistroMorfometricoPinnipedo } from "../../forms/MorfometriaPinnipedo/RegistroMorfometricoPinnipedo";
import RegistroMorfometricoSirenio from "../../forms/MorfometriaSirenio/RegistroMorfometricoSirenio";
import RegistroMorfometricoOdontoceto from "../../forms/MorformetriaOdontoceto/RegistroMorfometricoOdontoceto";
import api, { BASE_URL } from "../Api";
import { Especie } from "../Especie/GetEspecie";
import {
  AccionesYResultados,
  Aviso,
  FormatoGeneral,
  ImagenType,
  Peticion,
  Response,
  SoloOrganismoVivo,
} from "./Types";
// Mapeo de la taxa a su tipo de animal correspondiente en la API se reailizo con el fin de que se vea en varaweb el registro morfometrico
const convertirTaxaToTipoDeAnimal = (taxa: number) => {
  switch (taxa) {
    case 0:
      return 1;
    case 1:
      return 2;
    case 2:
      return 0;
    case 3:
      return 3;
    default:
      return 0;
  }
};

const generateAviso = (resultSqlite: AvisoWithRelations): Aviso => ({
  Acantilado: resultSqlite.acantilado === 1,
  FacilAcceso: resultSqlite.facilAcceso === 1,
  LugarDondeSeVio: resultSqlite.lugarDondeSeVio ?? 0,
  Sustrato: resultSqlite.sustrato ?? 0,
  FechaDeAvistamiento: resultSqlite.fechaDeAvistamiento ?? "",
  Observaciones: resultSqlite.observaciones ?? "",
  TipoDeAnimal: convertirTaxaToTipoDeAnimal(
    resultSqlite.especimenes[0]?.especie?.taxa ?? 0
  ),
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
    tipoDeMuestras,
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
        const reportarVaramientoIndividualResponse: Response = await api.post(
          `api/Aviso/ReportarVaramientoIndividual`,
          peticion,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(
          JSON.stringify(reportarVaramientoIndividualResponse, null, 2)
        );
        const imagen = await getImageUri(idAviso);
        if (!imagen) {
          return reportarVaramientoIndividualResponse;
        }

        const UpdateImageAviso = await uploadFileFotoAviso(
          reportarVaramientoIndividualResponse.data.data.idAviso,
          imagen,
          token
        );
        console.log(
          "Resultado de la subida de la foto de aviso:",
          JSON.stringify(UpdateImageAviso, null, 2)
        );
        const imagenEspecimen: FotoAndDescription[] =
          await getImagesEspecimen(idAviso);

        console.log(
          "Fotos especimen: ",
          JSON.stringify(imagenEspecimen, null, 2)
        );

        for (const imagen of imagenEspecimen) {
          uploadFileEspecimen(
            reportarVaramientoIndividualResponse.data.data.idEspecimen.toString(),
            imagen.typeImagen,
            imagen.uriPhoto,
            token
          ).then((result) => {
            console.log(
              "Resultado de la subida de la foto de especimen:",
              result
            );
            return result;
          });
        }

        return reportarVaramientoIndividualResponse;
      } catch (error) {
        throw error;
      }
    }
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
    return result;
  } catch (error) {
    throw error;
  }
};

export const uploadFileEspecimen = async (
  idEspecimen: string,
  typeImagen: ImagenType,
  fileUri: string,
  token: string
) => {
  try {
    const upload = await FileSystem.uploadAsync(
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
    return upload;
  } catch (error) {
    throw error;
  }
};
