import { eq } from "drizzle-orm";

import { getEspecieById, getFistEspecie } from "./especieRepo";
import { FormValuesEspecimen } from "../../forms/Especimen/FormValuesEspecimen";
import { db } from "../connection/sqliteConnection";
import {
  especimen,
  misticeto,
  odontoceto,
  pinnipedo,
  sirenio,
} from "../schemas/avisoSchema";
import { deleteImage } from "../../hooks/helpers";
import { ImagenType } from "../../services/Avisos/Types";

type NewEspecimen = typeof especimen.$inferInsert;

export const getEspecimenByIdEspecimen = async (
  idEspecimen: number
): Promise<FormValuesEspecimen> => {
  try {
    const result = await db
      .select()
      .from(especimen)
      .where(eq(especimen.id, idEspecimen));

    if (!result || result.length === 0) {
      throw new Error(`No se encontró un especimen con id ${idEspecimen}`);
    }

    const EspecieBdLocal = await getEspecieById(result[0].especieId);

    const item = result[0];

    const formValues: FormValuesEspecimen = {
      Especie: EspecieBdLocal,
      Latitud: item.latitud ?? "",
      Longitud: item.longitud ?? "",
      EspecieId: item.especieId ?? undefined,
      condicion: item.condicion ?? 0,
      longitudTotalRectilinea: item.longitudTotalRectilinea ?? "",
      peso: item.peso ?? "",
      sexo: item.sexo ?? 0,
      grupoDeEdad: item.grupoDeEdad ?? 0,
      orientacionDelEspecimen: item.orientacionDelEspecimen ?? "",
      sustrato: item.sustrato ?? 0,
      otroSustrato: item.otroSustrato ?? "",
      heridasBala: item.heridasBala ?? "",
      heridasBalaFoto: item.heridasBalaFoto ?? "",
      presenciaDeRedes: item.presenciaDeRedes ?? "",
      presenciaDeRedesFoto: item.presenciaDeRedesFoto ?? "",
      mordidas: item.mordidas ?? "",
      mordidasFoto: item.mordidasFoto ?? "",
      golpes: item.golpes ?? "",
      golpesFoto: item.golpesFoto ?? "",
      otroTipoDeHeridas: item.otroTipoDeHeridas ?? "",
      otroTipoDeHeridasFoto: item.otroTipoDeHeridasFoto ?? "",
    };

    return formValues;
  } catch (error) {
    throw new Error(
      `Error al obtener el especimen para el id ${idEspecimen}: `
    );
  }
};
export const addEspecimenIfNotExist = async (idAviso: number) => {
  const getEspecie = await getFistEspecie();
  const newEspecimen: NewEspecimen = {
    condicion: 0,
    especieId: getEspecie.id,
    golpes: "",
    golpesFoto: "",
    grupoDeEdad: 0,
    heridasBala: "",
    heridasBalaFoto: "",
    latitud: "",
    longitud: "",
    longitudTotalRectilinea: "",
    mordidas: "",
    mordidasFoto: "",
    orientacionDelEspecimen: "",
    otroSustrato: "",
    otroTipoDeHeridas: "",
    otroTipoDeHeridasFoto: "",
    peso: "",
    presenciaDeRedes: "",
    presenciaDeRedesFoto: "",
    sexo: 0,
    sustrato: 0,
    avisoId: idAviso,
  };

  const existingEspecimen = await db
    .select()
    .from(especimen)
    .where(eq(especimen.avisoId, idAviso));
  if (existingEspecimen.length <= 0) {
    const result = await db
      .insert(especimen)
      .values(newEspecimen)
      .returning({ updateId: especimen.id });
    return result[0].updateId;
  } else {
    return existingEspecimen[0].id;
  }
};
export const addEspecimenToVaramientoMasivo = async (
  idAviso: number,
  idVaramientoMasivo: number
): Promise<number> => {
  const result = await db
    .insert(especimen)
    .values({ varamientoMasivoId: idVaramientoMasivo, avisoId: idAviso })
    .returning({ updateId: especimen.id });
  return result[0].updateId;
};

export const updateEspecimenById = async (
  especimenData: Partial<FormValuesEspecimen>,
  idEspecimen: number | null
): Promise<number> => {
  if (idEspecimen === null) throw new Error("Sin un idEspecimen especificado");
  let existingEspecimen;
  let result;
  existingEspecimen = await db
    .select()
    .from(especimen)
    .where(eq(especimen.id, idEspecimen));

  if (existingEspecimen.length === 0) {
    throw new Error(
      `No se encontró un especimen para el aviso con id ${idEspecimen}`
    );
  }

  const especimenObjeto = existingEspecimen[0];

  const updatedEspecimen: NewEspecimen = {
    condicion: especimenData.condicion ?? especimenObjeto.condicion,
    especieId: especimenData.EspecieId ?? especimenObjeto.especieId,
    golpes: especimenData.golpes ?? especimenObjeto.golpes,
    golpesFoto: especimenData.golpesFoto ?? especimenObjeto.golpesFoto,
    grupoDeEdad: especimenData.grupoDeEdad ?? especimenObjeto.grupoDeEdad,
    heridasBala: especimenData.heridasBala ?? especimenObjeto.heridasBala,
    heridasBalaFoto:
      especimenData.heridasBalaFoto ?? especimenObjeto.heridasBalaFoto,
    latitud: especimenData.Latitud ?? especimenObjeto.latitud,
    longitud: especimenData.Longitud ?? especimenObjeto.longitud,
    longitudTotalRectilinea:
      especimenData.longitudTotalRectilinea ??
      especimenObjeto.longitudTotalRectilinea,
    mordidas: especimenData.mordidas ?? especimenObjeto.mordidas,
    mordidasFoto: especimenData.mordidasFoto ?? especimenObjeto.mordidasFoto,
    orientacionDelEspecimen:
      especimenData.orientacionDelEspecimen ??
      especimenObjeto.orientacionDelEspecimen,
    otroSustrato: especimenData.otroSustrato ?? especimenObjeto.otroSustrato,
    otroTipoDeHeridas:
      especimenData.otroTipoDeHeridas ?? especimenObjeto.otroTipoDeHeridas,
    otroTipoDeHeridasFoto:
      especimenData.otroTipoDeHeridasFoto ??
      especimenObjeto.otroTipoDeHeridasFoto,
    peso: especimenData.peso ?? especimenObjeto.peso,
    presenciaDeRedes:
      especimenData.presenciaDeRedes ?? especimenObjeto.presenciaDeRedes,
    presenciaDeRedesFoto:
      especimenData.presenciaDeRedesFoto ??
      especimenObjeto.presenciaDeRedesFoto,
    sexo: especimenData.sexo ?? especimenObjeto.sexo,
    sustrato: especimenData.sustrato ?? especimenObjeto.sustrato,
    avisoId: especimenObjeto.avisoId,
  };
  result = await db
    .update(especimen)
    .set(updatedEspecimen)
    .where(eq(especimen.id, idEspecimen))
    .returning({ updateId: especimen.id });
  const resultInsercion = await db
    .select()
    .from(especimen)
    .where(eq(especimen.id, idEspecimen));

  return result[0].updateId;
};

export const getAllEspecimen = async () => {
  const result = await db.select().from(especimen);
  return result;
};

export const hasRegistroMorfometrico = async (idEspecimen: number | null) => {
  if (idEspecimen === null) return false;
  const misticetoRequest = await db
    .select()
    .from(misticeto)
    .where(eq(misticeto.especimenId, idEspecimen));
  const odontocetoRequest = await db
    .select()
    .from(odontoceto)
    .where(eq(odontoceto.especimenId, idEspecimen));
  const pinnipedoRequest = await db
    .select()
    .from(pinnipedo)
    .where(eq(pinnipedo.especimenId, idEspecimen));
  const sirenioRequest = await db
    .select()
    .from(sirenio)
    .where(eq(sirenio.especimenId, idEspecimen));

  return (
    misticetoRequest.length > 0 ||
    odontocetoRequest.length > 0 ||
    pinnipedoRequest.length > 0 ||
    sirenioRequest.length > 0
  );
};

export const deleteEspecimenById = async (idEspecimen: number | null) => {
  if (idEspecimen === null) throw new Error("Sin un idEspecimen especificado");
  const existingEspecimen = await db
    .select()
    .from(especimen)
    .where(eq(especimen.id, idEspecimen));

  if (existingEspecimen.length === 0) {
    throw new Error(
      `No se encontró un especimen para el aviso con id ${idEspecimen}`
    );
  }

  const especimenObjeto = existingEspecimen[0];

  await db.delete(especimen).where(eq(especimen.id, idEspecimen));

  return especimenObjeto.id;
};

export type FotoAndDescription = {
  uriPhoto: string;
  typeImagen: ImagenType;
};

export const getImagesEspecimen = async (
  idAviso: number
): Promise<FotoAndDescription[]> => {
  try {
    const resultDb = await db.query.especimen.findFirst({
      where: (especimen, { eq }) => eq(especimen.avisoId, idAviso),
      with: {
        aviso: true,
      },
    });

    console.log(
      "Resultado de getImagesEspecimen: ",
      JSON.stringify(resultDb, null, 2)
    );

    if (!resultDb) return [];

    const especimenData = resultDb;

    const mappings: Record<string, ImagenType> = {
      golpesFoto: "golpes",
      heridasBalaFoto: "heridasDeBala",
      presenciaDeRedesFoto: "presenciaDeRedes",
      mordidasFoto: "mordidas",
      otroTipoDeHeridasFoto: "otros",
    };

    const result: FotoAndDescription[] = Object.entries(mappings)
      .filter(([key]) => {
        const value = especimenData[key as keyof typeof especimenData];
        return value !== null && value !== undefined && value !== "";
      })
      .map(([key, typeImagen]) => ({
        uriPhoto: especimenData[key as keyof typeof especimenData] as string,
        typeImagen,
      }));

    return result;
  } catch (error) {
    console.error("Error en getImagesEspecimen:", error);
    throw new Error("Error al obtener las imágenes del espécimen");
  }
};

export const deletePhotoEspecimenById = async (
  idEspecimen: number,
  imageType: ImagenType
) => {
  const query = await db
    .select()
    .from(especimen)
    .where(eq(especimen.id, idEspecimen));

  const imageMap: Record<ImagenType, string | null> = {
    golpes: query[0].golpesFoto,
    heridasDeBala: query[0].heridasBalaFoto,
    presenciaDeRedes: query[0].presenciaDeRedesFoto,
    mordidas: query[0].mordidasFoto,
    otros: query[0].otroTipoDeHeridasFoto,
  };

  const imageToDelete = imageMap[imageType];

  if (imageToDelete) {
    return await deleteImage(imageToDelete);
  }
};
