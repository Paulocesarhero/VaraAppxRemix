import { eq } from "drizzle-orm";

import { db } from "../connection/sqliteConnection";
import { acciones, sirenio } from "../schemas/avisoSchema";

type NewAcciones = typeof acciones.$inferInsert;

export const addAccionesIfNotExists = async (idEspecimen: number) => {
  const existingAcciones = await db
    .select()
    .from(acciones)
    .where(eq(acciones.especimenId, idEspecimen));
  if (existingAcciones.length === 0) {
    await db.insert(acciones).values({ especimenId: idEspecimen });
  }
};
export const updateAccionesByIdEspecimen = async (
  idEspecimen: number,
  accionesData: Partial<NewAcciones>
): Promise<number> => {
  const existingAcciones = await db
    .select()
    .from(acciones)
    .where(eq(acciones.especimenId, idEspecimen));
  if (existingAcciones.length === 0) {
    throw new Error(
      `No se encontró un acciones para el aviso con id ${idEspecimen}`
    );
  }
  const accionesObjeto = existingAcciones[0];
  const campos = Object.keys(accionesObjeto).filter(
    (campo) => campo !== "especimenId" && accionesData.hasOwnProperty(campo)
  );

  const updatedAcciones = campos.reduce((acc, campo) => {
    // @ts-ignore
    acc[campo] = accionesData[campo] ?? accionesObjeto[campo];
    return acc;
  }, {});
  // @ts-ignore
  updatedAcciones.especimenId = idEspecimen;
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
    const item = { ...result[0] };
    // @ts-ignore
    delete item.id;
    // @ts-ignore
    delete item.especimenId;
    return item;
  } catch (error) {
    console.error("Error al obtener acciones:", error);
  }
};
