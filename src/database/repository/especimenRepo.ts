import { and, eq } from "drizzle-orm";

import { FormValuesEspecimen } from "../../forms/Especimen/FormValuesEspecimen";
import { db } from "../connection/sqliteConnection";
import {
  especimen,
  misticeto,
  odontoceto,
  pinnipedo,
  sirenio,
} from "../schemas/avisoSchema";

type NewEspecimen = typeof especimen.$inferInsert;

export const addEspecimenIfNotExist = async (idAviso: number) => {
  const newEspecimen: NewEspecimen = {
    condicion: 0,
    especieId: 0,
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
  if (existingEspecimen.length === 0) {
    const result = await db
      .insert(especimen)
      .values(newEspecimen)
      .returning({ updateId: especimen.id });
    return result[0].updateId;
  } else {
    return existingEspecimen[0].id;
  }
};
const linkEspecimenToVaramientoMasivo = async (
  idAviso: number,
  idVaramientoMasivo: number
): Promise<number> => {
  const result = await db
    .insert(especimen)
    .values({ varamientoMasivoId: idVaramientoMasivo, avisoId: idAviso })
    .returning({ updateId: especimen.id });
  return result[0].updateId;
};

export const updateEspecimenByIdAviso = async (
  idAviso: number,
  especimenData: Partial<NewEspecimen>
): Promise<number> => {
  const existingEspecimen = await db
    .select()
    .from(especimen)
    .where(eq(especimen.avisoId, idAviso));

  if (existingEspecimen.length === 0) {
    throw new Error(
      `No se encontró un especimen para el aviso con id ${idAviso}`
    );
  }

  const especimenObjeto = existingEspecimen[0];

  const updatedEspecimen: NewEspecimen = {
    condicion: especimenData.condicion ?? especimenObjeto.condicion,
    especieId: especimenData.especieId ?? especimenObjeto.especieId,
    golpes: especimenData.golpes ?? especimenObjeto.golpes,
    golpesFoto: especimenData.golpesFoto ?? especimenObjeto.golpesFoto,
    grupoDeEdad: especimenData.grupoDeEdad ?? especimenObjeto.grupoDeEdad,
    heridasBala: especimenData.heridasBala ?? especimenObjeto.heridasBala,
    heridasBalaFoto:
      especimenData.heridasBalaFoto ?? especimenObjeto.heridasBalaFoto,
    latitud: especimenData.latitud ?? especimenObjeto.latitud,
    longitud: especimenData.longitud ?? especimenObjeto.longitud,
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
    avisoId: idAviso,
  };

  const result = await db
    .update(especimen)
    .set(updatedEspecimen)
    .where(eq(especimen.avisoId, idAviso))
    .returning({ updateId: especimen.id });

  return result[0].updateId;
};

export const getEspecimenByIdAvisoLocal = async (
  idAviso: number
): Promise<FormValuesEspecimen> => {
  try {
    const result = await db
      .select()
      .from(especimen)
      .where(eq(especimen.avisoId, idAviso));

    if (!result || result.length === 0) {
      throw new Error(
        `No se encontró un especimen para el aviso con id ${idAviso}`
      );
    }

    const especimenResult = result[0];

    return {
      condicion: especimenResult.condicion ?? 0,
      golpes: especimenResult.golpes ?? "",
      golpesFoto: especimenResult.golpesFoto ?? "",
      grupoDeEdad: especimenResult.grupoDeEdad ?? 0,
      heridasBala: especimenResult.heridasBala ?? "",
      heridasBalaFoto: especimenResult.heridasBalaFoto ?? "",
      Latitud: especimenResult.latitud ?? "",
      Longitud: especimenResult.longitud ?? "",
      longitudTotalRectilinea: especimenResult.longitudTotalRectilinea ?? "",
      mordidas: especimenResult.mordidas ?? "",
      mordidasFoto: especimenResult.mordidasFoto ?? "",
      orientacionDelEspecimen: especimenResult.orientacionDelEspecimen ?? "",
      otroSustrato: especimenResult.otroSustrato ?? "",
      otroTipoDeHeridas: especimenResult.otroTipoDeHeridas ?? "",
      otroTipoDeHeridasFoto: especimenResult.otroTipoDeHeridasFoto ?? "",
      peso: especimenResult.peso ?? "",
      presenciaDeRedes: especimenResult.presenciaDeRedes ?? "",
      presenciaDeRedesFoto: especimenResult.presenciaDeRedesFoto ?? "",
      sexo: especimenResult.sexo ?? 0,
      sustrato: especimenResult.sustrato ?? 0,
    };
  } catch (error) {
    console.error("Error al obtener el especimen:", error);
    throw new Error(`Error al obtener el especimen para el aviso ${idAviso}`);
  }
};

export const getAllEspecimen = async () => {
  const result = await db.select().from(especimen);
  return result;
};

export const hasRegistroMorfometrico = async (idEspecimen: number) => {
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

export const getAllEspecimenOfVaramientoMasivo = async (
  idAviso: number,
  idVaramientoMasivo: number
) => {
  const result = await db
    .select({
      idEspecimen: especimen.id,
      longitudTotalRectilinea: especimen.longitudTotalRectilinea,
    })
    .from(especimen)
    .where(
      and(
        eq(especimen.varamientoMasivoId, idVaramientoMasivo),
        eq(especimen.avisoId, idAviso)
      )
    );
  return result;
};
