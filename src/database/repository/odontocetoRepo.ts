import { eq } from "drizzle-orm";

import RegistroMorfometricoOdontoceto from "../../forms/MorformetriaOdontoceto/RegistroMorfometricoOdontoceto";
import { db } from "../connection/sqliteConnection";
import { misticeto, odontoceto } from "../schemas/avisoSchema";

export type NewOdontoceto = typeof odontoceto.$inferInsert;

export const addOdontocetoIfNotExist = async (idEspecimen: number) => {
  const existingOdontoceto = await db
    .select()
    .from(odontoceto)
    .where(eq(odontoceto.especimenId, idEspecimen));
  if (existingOdontoceto.length === 0) {
    await db.insert(odontoceto).values({ especimenId: idEspecimen });
  }
};

export const updateOdontocetoByIdEspecimen = async (
  idEspecimen: number,
  odontocetoData: Partial<NewOdontoceto>
): Promise<number> => {
  const existingOdontoceto = await db
    .select()
    .from(odontoceto)
    .where(eq(odontoceto.especimenId, idEspecimen));
  if (existingOdontoceto.length === 0) {
    throw new Error(
      `No se encontró un misticeto para el aviso con id ${idEspecimen}`
    );
  }

  const odontocetoObjeto = existingOdontoceto[0];
  const campos = Object.keys(odontocetoObjeto).filter(
    (campo) => campo !== "especimenId" && odontocetoData.hasOwnProperty(campo)
  );

  const updatedOdontoceto = campos.reduce((acc, campo) => {
    // @ts-ignore
    acc[campo] = odontocetoData[campo] ?? odontocetoObjeto[campo];
    return acc;
  }, {});
  // @ts-ignore
  updatedOdontoceto.especimenId = idEspecimen;
  const result = await db
    .update(odontoceto)
    .set(updatedOdontoceto)
    .where(eq(odontoceto.especimenId, idEspecimen))
    .returning({ updateId: odontoceto.id });

  return result[0].updateId;
};

export const getOdontocetoByIdEspecimenLocal = async (
  idEspecimen: number
): Promise<RegistroMorfometricoOdontoceto> => {
  try {
    const result = await db
      .select()
      .from(odontoceto)
      .where(eq(odontoceto.especimenId, idEspecimen));
    const item = { ...result[0] };
    // @ts-ignore
    delete item.id;
    // @ts-ignore
    delete item.especimenId;
    return item as RegistroMorfometricoOdontoceto;
  } catch (error) {
    throw new Error(
      `No se encontró un misticeto para el aviso con id ${idEspecimen}`
    );
  }
};
