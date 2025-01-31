import { eq } from "drizzle-orm";
import * as FileSystem from "expo-file-system";

import { db } from "../../database/connection/sqliteConnection";
import {
  FotoAndDescription,
  getImagesEspecimen,
} from "../../database/repository/especimenRepo";
import { hasVaramientoMasivo } from "../../database/repository/varamientoMasivoRepo";
import { avisos } from "../../database/schemas/avisoSchema";
import api, { BASE_URL } from "../Api";
import { ImagenType, Response } from "./Types";
import { saveVaramientoMasivo } from "./SaveVaramientoMasivo";
import { generatePeticionAvisoIndividual } from "./adapter";
import { getAvisoBdLocal } from "../../database/repository/avisoRepo";

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
    const resultSqlite = await getAvisoBdLocal(idAviso);
    const peticion = await generatePeticionAvisoIndividual(resultSqlite);
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
  } else {
    try {
      const response = await saveVaramientoMasivo(idAviso, token);
      console.log("Response de la peticion de varamiento masivo:", response);
    } catch (error) {
      console.error("Error al obtener el varamiento masivo:", error);
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
