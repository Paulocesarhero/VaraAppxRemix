import { eq } from "drizzle-orm";

import FormValuesAccionesYresultados from "../../forms/AccionesYResultados/FormValuesAccionesYresultados";
import { db } from "../connection/sqliteConnection";
import { acciones, sirenio } from "../schemas/avisoSchema";

export type NewAcciones = typeof acciones.$inferInsert;

export const addAccionesIfNotExists = async (idEspecimen: number) => {
  const existingAcciones = await db
    .select()
    .from(acciones)
    .where(eq(acciones.especimenId, idEspecimen));
  if (existingAcciones.length === 0) {
    await db
      .insert(acciones)
      .values({ especimenId: idEspecimen, tipoDeMuestras: "[0]" });
  }
};

export const updateAccionesByIdEspecimen = async (
  idEspecimen: number | null,
  accionesData: Partial<FormValuesAccionesYresultados>
): Promise<number> => {
  if (idEspecimen === null) throw new Error("Sin un idEspecimen especificado");
  const existingAcciones = await db
    .select()
    .from(acciones)
    .where(eq(acciones.especimenId, idEspecimen));
  if (existingAcciones.length === 0) {
    throw new Error(
      `No se encontró un acciones para el aviso con id ${idEspecimen}`
    );
  }

  const updatedAcciones = {
    autoridades: accionesData.Autoridades ?? existingAcciones[0].autoridades,
    telefonoAutoridades:
      accionesData.TelefonoAutoridades ??
      existingAcciones[0].telefonoAutoridades,
    morfometria:
      accionesData.Morfometria !== undefined
        ? accionesData.Morfometria
          ? 1
          : 0
        : existingAcciones[0].morfometria,
    necropsia:
      accionesData.Necropsia !== undefined
        ? accionesData.Necropsia
          ? 1
          : 0
        : existingAcciones[0].necropsia,
    disposicionDelCadaver:
      accionesData.DisposicionDelCadaver ??
      existingAcciones[0].disposicionDelCadaver,
    disposicionOtro:
      accionesData.DisposicionOtro ?? existingAcciones[0].disposicionOtro,
    posibleCausaDelVaramiento:
      accionesData.PosibleCausaDelVaramiento ??
      existingAcciones[0].posibleCausaDelVaramiento,
    posibleCausaDeMuerte:
      accionesData.PosibleCausaDeMuerte ??
      existingAcciones[0].posibleCausaDeMuerte,
    participantes:
      accionesData.Participantes ?? existingAcciones[0].participantes,
    observaciones:
      accionesData.Observaciones ?? existingAcciones[0].observaciones,
    tipoDeMuestras: accionesData.TipoDeMuestras
      ? JSON.stringify(accionesData.TipoDeMuestras)
      : existingAcciones[0].tipoDeMuestras,
    especimenId: idEspecimen,
  };

  const result = await db
    .update(acciones)
    .set(updatedAcciones)
    .where(eq(acciones.especimenId, idEspecimen))
    .returning({ updateId: acciones.id });
  return result[0].updateId;
};

export const getAccionesByIdEspecimenLocal = async (idEspecimen: number) => {
  try {
    const result = await db
      .select()
      .from(acciones)
      .where(eq(acciones.especimenId, idEspecimen));
    if (result.length === 0) {
      throw new Error(
        `No se encontró un acciones para el aviso con id ${idEspecimen}`
      );
    }

    const item = result[0];

    const formValues: FormValuesAccionesYresultados = {
      Autoridades: item.autoridades ?? undefined,
      TelefonoAutoridades: item.telefonoAutoridades ?? undefined,
      Morfometria: item.morfometria === 1,
      Necropsia: item.necropsia === 1,
      DisposicionDelCadaver: item.disposicionDelCadaver ?? undefined,
      DisposicionOtro: item.disposicionOtro ?? undefined,
      PosibleCausaDelVaramiento: item.posibleCausaDelVaramiento ?? undefined,
      PosibleCausaDeMuerte: item.posibleCausaDeMuerte ?? undefined,
      Participantes: item.participantes ?? undefined,
      Observaciones: item.observaciones ?? undefined,
      TipoDeMuestras: JSON.parse(item.tipoDeMuestras as string),
    };

    return formValues;
  } catch (error) {
    throw error;
  }
};
