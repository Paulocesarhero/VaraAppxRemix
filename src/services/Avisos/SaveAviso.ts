import { eq } from "drizzle-orm";
import * as FileSystem from "expo-file-system";

import { db } from "../../database/connection/sqliteConnection";
import {
  FotoAndDescription,
  getImagesEspecimen,
} from "../../database/repository/especimenRepo";
import {
  getAllDataVaramientoMasivo,
  hasVaramientoMasivo,
} from "../../database/repository/varamientoMasivoRepo";
import {
  avisos,
  VaramientoMasivoWithRelations,
} from "../../database/schemas/avisoSchema";
import api, { BASE_URL } from "../Api";
import {
  ImagenType,
  PeticionVaramientoMasivo,
  Response,
  VaramientoMasivoResponse,
} from "./Types";
import {
  generatePeticionAvisoIndividual,
  generatePeticionVaramientoMasivo,
} from "./adapter";
import { getAvisoBdLocal } from "../../database/repository/avisoRepo";

export const getImageUri = async (idAviso: number) => {
  try {
    const result = await db
      .select({ imagen: avisos.fotografia })
      .from(avisos)
      .where(eq(avisos.id, idAviso));
    return result[0].imagen;
  } catch (error) {
    throw error;
  }
};

export const saveAviso = async (
  idAviso: number,
  token: string
): Promise<any> => {
  const hasVaramientoMasivoLocal = await hasVaramientoMasivo(idAviso);
  if (!hasVaramientoMasivoLocal) {
    const resultSqlite = await getAvisoBdLocal(idAviso);
    const peticion = await generatePeticionAvisoIndividual(resultSqlite);
    console.log("Peticion generada:", JSON.stringify(peticion, null, 2));

    if (peticion) {
      return await handleVaramientoIndividualResponse(idAviso, peticion, token);
    }
  } else {
    try {
      const response = await saveVaramientoMasivo(idAviso, token);
      console.log("Response de la peticion de varamiento masivo:", response);
      return response;
    } catch (error) {
      throw error;
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

const handleVaramientoIndividualResponse = async (
  idAviso: number,
  peticion: any,
  token: string
): Promise<Response> => {
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
    if (imagen) {
      const updateImageAviso = await uploadFileFotoAviso(
        response.data.data.idAviso,
        imagen,
        token
      );
    }

    const imagenEspecimen: FotoAndDescription[] =
      await getImagesEspecimen(idAviso);

    for (const imagen of imagenEspecimen) {
      const result = await uploadFileEspecimen(
        response.data.data.idEspecimen.toString(),
        imagen.typeImagen,
        imagen.uriPhoto,
        token
      );
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const saveVaramientoMasivo = async (idAviso: number, token: string) => {
  try {
    const varameintoMasivvoLocalDb = await getAllDataVaramientoMasivo(idAviso);
    const peticion = await generatePeticionVaramientoMasivo(
      varameintoMasivvoLocalDb
    );
    if (!peticion) return { error: true, message: [], data: {} };
    const response: VaramientoMasivoResponse = await addVaramientoMasivo(
      token,
      peticion
    );
    if (response.error) return response;
    const fotos = await saveFotosVaramientoMasivo(
      varameintoMasivvoLocalDb,
      response,
      token
    );
    console.log("Fotos subidas: ", JSON.stringify(fotos, null, 2));
    return peticion;
  } catch (error) {
    console.error("Error al obtener el varamiento masivo:", error);
    throw error;
  }
};

export const saveFotosVaramientoMasivo = async (
  varamientoMasivoLocalDb: VaramientoMasivoWithRelations,
  responseVaramientoMasivo: VaramientoMasivoResponse,
  token: string
): Promise<void> => {
  if (
    !responseVaramientoMasivo?.data ||
    !varamientoMasivoLocalDb.aviso?.fotografia ||
    !responseVaramientoMasivo.data.idAviso
  ) {
    return;
  }

  await subirFotoAviso(
    varamientoMasivoLocalDb.aviso.fotografia,
    responseVaramientoMasivo.data.idAviso.toString(),
    token
  );
  await subirFotosEspecimenes(
    varamientoMasivoLocalDb,
    responseVaramientoMasivo,
    token
  );
};

const subirFotoAviso = async (
  fileUri: string,
  idAviso: string,
  token: string
) => {
  try {
    await FileSystem.uploadAsync(
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
  } catch (error) {
    throw new Error(
      `Error al subir la foto de aviso del varamiento masivo: ${error}`
    );
  }
};

const subirFotosEspecimenes = async (
  varamientoMasivoLocalDb: VaramientoMasivoWithRelations,
  responseVaramientoMasivo: VaramientoMasivoResponse,
  token: string
) => {
  if (!responseVaramientoMasivo.data?.idsEspecimenes) {
    return;
  }

  const mappings: Record<string, ImagenType> = {
    golpesFoto: "golpes",
    heridasBalaFoto: "heridasDeBala",
    presenciaDeRedesFoto: "presenciaDeRedes",
    mordidasFoto: "mordidas",
    otroTipoDeHeridasFoto: "otros",
  };

  for (const [
    index,
    especimen,
  ] of varamientoMasivoLocalDb.especimenes.entries()) {
    const fotosEspecimen = Object.keys(mappings)
      .filter((key) => especimen[key as keyof typeof especimen])
      .map((key) => ({
        uriPhoto: especimen[key as keyof typeof especimen] as string,
        typeImagen: mappings[key],
      }));

    await Promise.all(
      fotosEspecimen.map(async (foto) => {
        const idEspecimen =
          responseVaramientoMasivo.data?.idsEspecimenes?.[index]?.idEspecimen;
        if (idEspecimen) {
          try {
            await uploadFileEspecimen(
              idEspecimen.toString(),
              foto.typeImagen,
              foto.uriPhoto,
              token
            );
          } catch (error) {
            throw new Error(
              `Error al subir la foto especimen del varamiento masivo: ${error}`
            );
          }
        }
      })
    );
  }
};

export const addVaramientoMasivo = async (
  barrerToken: string,
  data: Partial<PeticionVaramientoMasivo>
): Promise<any> => {
  try {
    const response = await api.post(
      "api/Aviso/ReportarVaramientoMasivo",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${barrerToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
