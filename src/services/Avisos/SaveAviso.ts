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
  EspecimenWithRelations,
  RecorridoWithRelations,
  VaramientoMasivoWithRelations,
} from "../../database/schemas/avisoSchema";
import api, { BASE_URL } from "../Api";
import {
  IdEspecimenesOnly,
  ImagenType,
  PeticionRecorrido,
  PeticionVaramientoMasivo,
  Response,
  VaramientoMasivoResponse,
} from "./Types";
import {
  generatePeticionAvisoIndividual,
  generatePeticionVaramientoMasivo,
  generateRecorrido,
} from "./adapter";
import { getAvisoBdLocal } from "../../database/repository/avisoRepo";
import { getAllDataRecorrido } from "../../database/repository/RecorridoRepo";

export const getImageUri = async (idAviso: number) => {
  const result = await db
    .select({ imagen: avisos.fotografia })
    .from(avisos)
    .where(eq(avisos.id, idAviso));
  return result[0].imagen;
};

export const saveAviso = async (
  idAviso: number,
  token: string
): Promise<any> => {
  const hasVaramientoMasivoLocal = await hasVaramientoMasivo(idAviso);
  if (!hasVaramientoMasivoLocal) {
    const resultSqlite = await getAvisoBdLocal(idAviso);
    const peticion = await generatePeticionAvisoIndividual(resultSqlite);

    if (peticion) {
      return await handleVaramientoIndividualResponse(idAviso, peticion, token);
    }
  } else {
    const response = await saveVaramientoMasivo(idAviso, token);
    return response;
  }
};
export const uploadFileFotoAviso = async (
  idAviso: string,
  fileUri: string,
  token: string
) => {
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
};

export const uploadFileEspecimen = async (
  idEspecimen: string, //respuesta del endpoint
  typeImagen: ImagenType,
  fileUri: string,
  token: string
) => {
  return await FileSystem.uploadAsync(
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
};

const handleVaramientoIndividualResponse = async (
  idAviso: number,
  peticion: any,
  token: string
): Promise<Response> => {
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
    await uploadFileFotoAviso(response.data.data.idAviso, imagen, token);
  }

  const imagenEspecimen: FotoAndDescription[] =
    await getImagesEspecimen(idAviso);

  for (const imagen of imagenEspecimen) {
    await uploadFileEspecimen(
      response.data.data.idEspecimen.toString(),
      imagen.typeImagen,
      imagen.uriPhoto,
      token
    );
  }

  return response;
};

export const saveVaramientoMasivo = async (idAviso: number, token: string) => {
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
  await saveFotosVaramientoMasivo(varameintoMasivvoLocalDb, response, token);
  return peticion;
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
  if (responseVaramientoMasivo.data.idsEspecimenes) {
    await subirFotosEspecimenes(
      varamientoMasivoLocalDb.especimenes,
      responseVaramientoMasivo.data.idsEspecimenes,
      token
    );
  }
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
  especimenesLocalDb: EspecimenWithRelations[],
  idsEspecimenes: IdEspecimenesOnly,
  token: string
) => {
  if (!idsEspecimenes) {
    return;
  }

  const mappings: Record<string, ImagenType> = {
    golpesFoto: "golpes",
    heridasBalaFoto: "heridasDeBala",
    presenciaDeRedesFoto: "presenciaDeRedes",
    mordidasFoto: "mordidas",
    otroTipoDeHeridasFoto: "otros",
  };

  for (const [index, especimen] of especimenesLocalDb.entries()) {
    const fotosEspecimen = Object.keys(mappings)
      .filter((key) => especimen[key as keyof typeof especimen])
      .map((key) => ({
        uriPhoto: especimen[key as keyof typeof especimen] as string,
        typeImagen: mappings[key],
      }));

    await Promise.all(
      fotosEspecimen.map(async (foto) => {
        const idEspecimen = idsEspecimenes[index].idEspecimen;
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
  const response = await api.post("api/Aviso/ReportarVaramientoMasivo", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${barrerToken}`,
    },
  });
  return response.data;
};

export const saveRecorrido = async (idRecorrido: number, token: string) => {
  const allData: RecorridoWithRelations =
    await getAllDataRecorrido(idRecorrido);
  const peticion = await generateRecorrido(allData);

  const avisosIndividualesLocalDb = allData.avisos.filter(
    (aviso) => aviso.varamientoMasivo === null
  );
  const avisosMasivosLocalDb = allData.avisos.filter(
    (aviso) => aviso.varamientoMasivo != null
  );
  try {
    const respuesta = await handleRecorridoVaraweb(peticion, token);
    for (const idsEspecimenes of respuesta.data.idsEspecimenesIndividuales) {
      const index: any =
        respuesta.data.idsEspecimenesIndividuales.indexOf(idsEspecimenes);
      if (avisosIndividualesLocalDb[index].fotografia) {
        await subirFotoAviso(
          avisosIndividualesLocalDb[index].fotografia,
          idsEspecimenes.idAviso,
          token
        );

        const imagenEspecimen: FotoAndDescription[] = await getImagesEspecimen(
          avisosIndividualesLocalDb[index].id
        );

        for (const imagen of imagenEspecimen) {
          await uploadFileEspecimen(
            idsEspecimenes.idEspecimen,
            imagen.typeImagen,
            imagen.uriPhoto,
            token
          );
        }
      }
    }
    for (let i = 0; i < respuesta.data.idsEspecimenesMasivos.length; i++) {
      if (
        avisosMasivosLocalDb[i].fotografia &&
        avisosMasivosLocalDb[i].fotografia != null
      ) {
        await subirFotoAviso(
          avisosMasivosLocalDb[i].fotografia as string,
          respuesta.data.idsEspecimenesMasivos[i].idAviso,
          token
        );
      }
      await subirFotosEspecimenes(
        avisosMasivosLocalDb[i].especimenes,
        respuesta.data.idsEspecimenesMasivos[i].idsEspecimenes,
        token
      );
    }
  } catch (error: any | Error) {
    if (
      error.message === "La CantidadDeAnimales debe ser mayor 1 y menor 10000"
    )
      throw new Error(
        "Asegúrese de que la cantidad de animales registrados en los avisos sea mayor a uno"
      );
    else {
      throw error;
    }
  }
};

const handleRecorridoVaraweb = async (
  data: Partial<PeticionRecorrido> | null,
  barrerToken: string
) => {
  if (!data) return;
  const response = await api.post("/api/Recorrido/Registrar", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${barrerToken}`,
    },
  });
  return response.data;
};
