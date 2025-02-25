import { eq } from "drizzle-orm";

import RegistroMorfometricoSirenio from "../../forms/MorfometriaSirenio/RegistroMorfometricoSirenio";
import { db } from "../connection/sqliteConnection";
import { sirenio } from "../schemas/avisoSchema";

type NewSirenio = typeof sirenio.$inferInsert;

export const addSirenioIfNotExists = async (idEspecimen: number) => {
  const existingSirenio = await db
    .select()
    .from(sirenio)
    .where(eq(sirenio.especimenId, idEspecimen));
  if (existingSirenio.length === 0) {
    await db.insert(sirenio).values({ especimenId: idEspecimen });
  }
};

export const updateSirenioByIdEspecimen = async (
  idEspecimen: number | null,
  sirenioData: Partial<NewSirenio>
): Promise<number> => {
  if (idEspecimen === null) throw new Error("Sin un idEspecimen especificado");
  const existingSirenio = await db
    .select()
    .from(sirenio)
    .where(eq(sirenio.especimenId, idEspecimen));
  if (existingSirenio.length === 0) {
    throw new Error(
      `No se encontró un sirenio para el aviso con id ${idEspecimen}`
    );
  }
  const sirenioObjeto = existingSirenio[0];
  const campos = Object.keys(sirenioObjeto).filter(
    (campo) =>
      campo !== "especimenId" &&
      Object.prototype.hasOwnProperty.call(sirenioData, campo)
  );

  const updatedSirenio = campos.reduce((acc, campo) => {
    // @ts-ignore
    acc[campo] = sirenioData[campo] ?? sirenioObjeto[campo];
    return acc;
  }, {});
  // @ts-ignore
  updatedSirenio.especimenId = idEspecimen;
  const result = await db
    .update(sirenio)
    .set(updatedSirenio)
    .where(eq(sirenio.especimenId, idEspecimen))
    .returning({ updateId: sirenio.id });
  return result[0].updateId;
};

export const getSirenioByIdEspecimenLocal = async (idEspecimen: number) => {
  try {
    const result = await db
      .select()
      .from(sirenio)
      .where(eq(sirenio.especimenId, idEspecimen));
    const item = { ...result[0] };
    // @ts-ignore
    delete item.id;
    // @ts-ignore
    delete item.especimenId;
    return item as RegistroMorfometricoSirenio;
  } catch {
    return null;
  }
};
