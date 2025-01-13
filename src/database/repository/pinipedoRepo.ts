import { eq } from "drizzle-orm";

import { RegistroMorfometricoPinnipedo } from "../../forms/MorfometriaPinnipedo/RegistroMorfometricoPinnipedo";
import { db } from "../connection/sqliteConnection";
import { ambiente, pinnipedo } from "../schemas/avisoSchema";

type NewPinipedo = typeof pinnipedo.$inferInsert;

export const addPinnipedoIfNotExists = async (idEspecimen: number) => {
  const existingPinipedo = await db
    .select()
    .from(pinnipedo)
    .where(eq(pinnipedo.especimenId, idEspecimen));
  if (existingPinipedo.length === 0) {
    await db.insert(pinnipedo).values({ especimenId: idEspecimen });
  }
};

export const updatePinnipedoByIdEspecimen = async (
  idEspecimen: number,
  pinnipedoData: Partial<NewPinipedo>
): Promise<number> => {
  const existingPinnipedo = await db
    .select()
    .from(pinnipedo)
    .where(eq(pinnipedo.especimenId, idEspecimen));
  if (existingPinnipedo.length === 0) {
    throw new Error(
      `No se encontró un pinnipedo para el aviso con id ${idEspecimen}`
    );
  }
  const pinnipedoObjeto = existingPinnipedo[0];
  const campos = Object.keys(pinnipedoObjeto).filter(
    (campo) => campo !== "especimenId" && pinnipedoData.hasOwnProperty(campo)
  );

  const updatedPinnipedo = campos.reduce((acc, campo) => {
    // @ts-ignore
    acc[campo] = pinnipedoData[campo] ?? pinnipedoObjeto[campo];
    return acc;
  }, {});
  // @ts-ignore
  updatedPinnipedo.especimenId = idEspecimen;
  const result = await db
    .update(pinnipedo)
    .set(updatedPinnipedo)
    .where(eq(pinnipedo.especimenId, idEspecimen))
    .returning({ updateId: pinnipedo.id });
  return result[0].updateId;
};

export const getPinnipedoByIdEspecimenLocal = async (idEspecimen: number) => {
  try {
    const result = await db
      .select()
      .from(pinnipedo)
      .where(eq(pinnipedo.especimenId, idEspecimen));
    const item = { ...result[0] };
    // @ts-ignore
    delete item.id;
    // @ts-ignore
    delete item.especimenId;
    return item as RegistroMorfometricoPinnipedo;
  } catch (error) {
    throw new Error(
      `No se encontró un pinnipedo para el aviso con id ${idEspecimen}`
    );
  }
};
