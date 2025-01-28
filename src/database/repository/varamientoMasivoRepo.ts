import { eq } from "drizzle-orm";

import { FormValuesVaramientoMasivo } from "../../forms/VaramientoMasivo/FormValuesVaramientoMasivo";
import { db } from "../connection/sqliteConnection";
import { varamientoMasivo } from "../schemas/avisoSchema";

type NewVaramientoMasivo = typeof varamientoMasivo.$inferInsert;

export const addVaramientoMasivoIfNotExists = async (
  avisoId: number
): Promise<number> => {
  const existingVaramientoMasivo = await db
    .select()
    .from(varamientoMasivo)
    .where(eq(varamientoMasivo.avisoId, avisoId));
  if (existingVaramientoMasivo.length === 0) {
    const insertedId = await db
      .insert(varamientoMasivo)
      .values({ avisoId })
      .returning({ insertId: varamientoMasivo.id });
    return insertedId[0].insertId;
  } else {
    return existingVaramientoMasivo[0].id;
  }
};

export const updateVaramientoMasivoByIdAviso = async (
  idAviso: number,
  formData: Partial<FormValuesVaramientoMasivo>
): Promise<number> => {
  // Verificar si existe el registro
  const existingVaramientoMasivo = await db
    .select()
    .from(varamientoMasivo)
    .where(eq(varamientoMasivo.avisoId, idAviso));

  if (existingVaramientoMasivo.length === 0) {
    throw new Error(
      `No se encontró un varamiento masivo para el aviso con id ${idAviso}`
    );
  }

  const varamientoMasivoObjeto = existingVaramientoMasivo[0];

  // Mapear los valores del formulario al esquema de la base de datos
  const updatedVaramientoMasivo = {
    ...varamientoMasivoObjeto, // Valores existentes
    avesMuertas:
      formData.AvesMuertas !== undefined
        ? formData.AvesMuertas
          ? 1
          : 0
        : varamientoMasivoObjeto.avesMuertas,
    avesMuertasCantidad:
      formData.AvesMuertasCantidad ??
      varamientoMasivoObjeto.avesMuertasCantidad,
    pecesMuertos:
      formData.PecesMuertos !== undefined
        ? formData.PecesMuertos
          ? 1
          : 0
        : varamientoMasivoObjeto.pecesMuertos,
    pecesMuertosCantidad:
      formData.PecesMuertosCantidad ??
      varamientoMasivoObjeto.pecesMuertosCantidad,
    numeroTotalDeAnimales:
      formData.NumeroTotalDeAnimales ??
      varamientoMasivoObjeto.numeroTotalDeAnimales,
    subGrupos: formData.SubGrupos ?? varamientoMasivoObjeto.subGrupos,
    animalesVivos:
      formData.AnimalesVivos ?? varamientoMasivoObjeto.animalesVivos,
    animalesMuertos:
      formData.AnimalesMuertos ?? varamientoMasivoObjeto.animalesMuertos,
    observaciones:
      formData.Observaciones ?? varamientoMasivoObjeto.observaciones,
    avisoId: idAviso, // Aseguramos que el avisoId sea correcto
  };

  // Actualizar en la base de datos
  const result = await db
    .update(varamientoMasivo)
    .set(updatedVaramientoMasivo)
    .where(eq(varamientoMasivo.avisoId, idAviso))
    .returning({ updateId: varamientoMasivo.id });

  return result[0].updateId;
};

export const getVaramientoMasivoByIdAvisoLocal = async (
  idAviso: number
): Promise<FormValuesVaramientoMasivo> => {
  try {
    const result = await db
      .select()
      .from(varamientoMasivo)
      .where(eq(varamientoMasivo.avisoId, idAviso));

    // Validar si se encontró el registro
    if (result.length === 0) {
      throw new Error(
        `No se encontró un varamiento masivo con avisoId ${idAviso}`
      );
    }

    const dbItem = result[0];

    const formValues: FormValuesVaramientoMasivo = {
      AvesMuertas: dbItem.avesMuertas === 1,
      AvesMuertasCantidad: dbItem.avesMuertasCantidad || "",
      PecesMuertos: dbItem.pecesMuertos === 1,
      PecesMuertosCantidad: dbItem.pecesMuertosCantidad || "",
      NumeroTotalDeAnimales: dbItem.numeroTotalDeAnimales || "",
      SubGrupos: dbItem.subGrupos || "",
      AnimalesVivos: dbItem.animalesVivos || "",
      AnimalesMuertos: dbItem.animalesMuertos || "",
      Observaciones: dbItem.observaciones || "",
    };

    return formValues;
  } catch (error) {
    console.error("Error al obtener el varamiento masivo:", error);
    throw error;
  }
};

export const hasVaramientoMasivo = async (idAviso: number | null) => {
  if (idAviso === null) return false;
  const varamientoMasivoRequest = await db
    .select()
    .from(varamientoMasivo)
    .where(eq(varamientoMasivo.avisoId, idAviso));

  return varamientoMasivoRequest.length > 0;
};
