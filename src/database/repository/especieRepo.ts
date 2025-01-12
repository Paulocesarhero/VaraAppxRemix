import { sql } from "drizzle-orm";

import { db } from "../connection/sqliteConnection";
import { especie } from "../schemas/avisoSchema";

type especieBd = typeof especie.$inferInsert;

export const getEspeciesBdLocal = async (): Promise<especieBd[]> => {
  const result = await db.select().from(especie);
  return result;
};

export const setEspeciesBdLocal = async (especies: especieBd[]) => {
  await db
    .insert(especie)
    .values(especies)
    .onConflictDoUpdate({
      target: especie.id,
      set: { ...especies, id: sql`${especie.id}` },
    })
    .execute();
};
