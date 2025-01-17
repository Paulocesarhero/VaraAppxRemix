import { eq, sql } from "drizzle-orm";

import { db } from "../connection/sqliteConnection";
import { especie } from "../schemas/avisoSchema";
import { Especie } from "../../services/Especie/GetEspecie";

type especieBd = typeof especie.$inferInsert;

export const getEspeciesBdLocal = async (): Promise<especieBd[]> => {
  const result = await db.select().from(especie);
  return result;
};

export const setEspeciesBdLocal = async (especies: Especie[]) => {
  const especiesInset: especieBd[] = especies.map((e) => ({
    id: e.id,
    nombre: e.nombre,
    nombreLatin: e.nombreLatin,
    taxa: e.taxa,
    familia: e.familia,
  }));
  console.log("datos a insertar", especiesInset);
  await db
    .insert(especie)
    .values(especiesInset)
    .onConflictDoUpdate({
      target: especie.id,
      set: {
        nombre: sql`excluded.nombre`,
        nombreLatin: sql`excluded.nombreLatin`,
        taxa: sql`excluded.taxa`,
        familia: sql`excluded.familia`,
      },
    })
    .execute();
};

export const getEspecieById = async (id: number | null): Promise<Especie> => {
  if (id === null) return {} as Especie;
  const result = await db.select().from(especie).where(eq(especie.id, id));
  if (result.length === 0) {
    return {} as Especie;
  }
  let resultItem: Especie = {
    id: result[0].id,
    nombre: result[0].nombre ?? "",
    nombreLatin: result[0].nombreLatin ?? "",
    taxa: result[0].taxa ?? 0,
    familia: result[0].familia ?? 0,
  };
  return resultItem;
};

export const getFistEspecie = async (): Promise<Especie> => {
  const result = await db.select().from(especie);
  if (result.length === 0) {
    return {} as Especie;
  }
  let resultItem: Especie = {
    id: result[0].id,
    nombre: result[0].nombre ?? "",
    nombreLatin: result[0].nombreLatin ?? "",
    taxa: result[0].taxa ?? 0,
    familia: result[0].familia ?? 0,
  };
  return resultItem;
};
