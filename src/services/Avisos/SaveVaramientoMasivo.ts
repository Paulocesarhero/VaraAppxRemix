import { getAllDataVaramientoMasivo } from "../../database/repository/varamientoMasivoRepo";
import {
  ImagenType,
  PeticionVaramientoMasivo,
  VaramientoMasivoResponse,
} from "./Types";
import { VaramientoMasivoWithRelations } from "../../database/schemas/avisoSchema";
import api, { BASE_URL } from "../Api";
import { generatePeticionVaramientoMasivo } from "./adapter";
import * as FileSystem from "expo-file-system";
import {
  FotoAndDescription,
  getImagesEspecimen,
} from "../../database/repository/especimenRepo";
import { uploadFileEspecimen } from "./SaveAviso";

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
    return fotos;
  } catch (error) {
    console.error("Error al obtener el varamiento masivo:", error);
    throw error;
  }
};

export const saveFotosVaramientoMasivo = async (
  varameintoMasivvoLocalDb: VaramientoMasivoWithRelations,
  responseVaramientoMasivo: VaramientoMasivoResponse,
  token: string
) => {
  if (
    !responseVaramientoMasivo ||
    !responseVaramientoMasivo.data ||
    !varameintoMasivvoLocalDb.aviso?.fotografia
  ) {
    return;
  } else {
    const idAviso = responseVaramientoMasivo.data.idAviso;
    const fileUri = varameintoMasivvoLocalDb.aviso.fotografia;
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
    } catch (error) {
      throw new Error(
        `Error al subir la foto de aviso del varamiento masivo: ${error}`
      );
    }
  }
  const mappings: Record<string, ImagenType> = {
    golpesFoto: "golpes",
    heridasBalaFoto: "heridasDeBala",
    presenciaDeRedesFoto: "presenciaDeRedes",
    mordidasFoto: "mordidas",
    otroTipoDeHeridasFoto: "otros",
  };
  let ejecucion = 0;
  for (const especimen of varameintoMasivvoLocalDb.especimenes) {
    const FotosEspecimen: FotoAndDescription[] = Object.entries(mappings)
      .filter(([key]) => {
        const value = especimen[key as keyof typeof especimen];
        return value !== null && value !== undefined && value !== "";
      })
      .map(([key, typeImagen]) => ({
        uriPhoto: especimen[key as keyof typeof especimen] as string,
        typeImagen,
      }));
    for (const foto of FotosEspecimen) {
      if (
        responseVaramientoMasivo.data.idsEspecimenes &&
        responseVaramientoMasivo.data.idsEspecimenes[ejecucion]?.idEspecimen !==
          undefined
      ) {
        try {
          await uploadFileEspecimen(
            // @ts-ignore
            responseVaramientoMasivo.data.idsEspecimenes[
              ejecucion
            ].idEspecimen.toString(),
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
    }
    ejecucion++;
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
