import { eq } from "drizzle-orm";

import { FormValuesSoloOrganismosVivos } from "../../forms/SoloOrganismosVivos/FormValuesSoloOrganismosVivos";
import { db } from "../connection/sqliteConnection";
import { organismo, sirenio } from "../schemas/avisoSchema";

type NewOrganismo = typeof organismo.$inferInsert;

export const addOrganismoIfNotExists = async (idEspecimen: number) => {
  const existingOrganismo = await db
    .select()
    .from(organismo)
    .where(eq(organismo.especimenId, idEspecimen));
  if (existingOrganismo.length === 0) {
    await db.insert(organismo).values({ especimenId: idEspecimen });
  }
};

export const updateOrganismoByIdEspecimen = async (
  idEspecimen: number | null,
  organismoData: FormValuesSoloOrganismosVivos
): Promise<number> => {
  if (idEspecimen === null) throw new Error("Sin un idEspecimen especificado");
  const existingOrganismo = await db
    .select()
    .from(organismo)
    .where(eq(organismo.especimenId, idEspecimen));
  if (existingOrganismo.length === 0) {
    throw new Error(
      `No se encontró un organismo para el aviso con id ${idEspecimen}`
    );
  }
  const organismoObjeto = existingOrganismo[0];
  const campos = Object.keys(organismoObjeto).filter(
    (campo) => campo !== "especimenId" && organismoData.hasOwnProperty(campo)
  );

  const updatedOrganismo = campos.reduce((acc, campo) => {
    // @ts-ignore
    acc[campo] = organismoData[campo] ?? organismoObjeto[campo];
    return acc;
  }, {});
  // @ts-ignore
  updatedOrganismo.especimenId = idEspecimen;
  const result = await db
    .update(organismo)
    .set(updatedOrganismo)
    .where(eq(organismo.especimenId, idEspecimen))
    .returning({ updateId: organismo.id });
  return result[0].updateId;
};

export const getOrganismoByIdEspecimenLocal = async (idEspecimen: number) => {
  try {
    const result = await db
      .select()
      .from(organismo)
      .where(eq(organismo.especimenId, idEspecimen));
    const item = { ...result[0] };
    // @ts-ignore
    delete item.id;
    // @ts-ignore
    delete item.especimenId;
    // @ts-ignore
    const formValues: FormValuesSoloOrganismosVivos = {
      ...item,
      reflotacion: item.reflotacion === 1,
      animalTransferido: item.animalTransferido === 1,
    };
    return formValues;
  } catch (error) {
    return null;
  }
};
