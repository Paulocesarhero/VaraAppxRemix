import { db } from "../connection/sqliteConnection";
import { recorrido, RecorridoDb } from "../schemas/avisoSchema";
import { eq } from "drizzle-orm";

export const addRecorrido = async (data: RecorridoDb) => {
  try {
    db.insert(recorrido).values(data);
  } catch (error) {
    console.error("Error al agregar el recorrido:", error);
    throw error;
  }
};
export const updateRecorrido = async (data: Partial<RecorridoDb>) => {
  if (!data.id) {
    throw new Error("El ID del recorrido es obligatorio para actualizar.");
  }
  try {
    await db.update(recorrido).set(data).where(eq(recorrido.id, data.id));
  } catch (error) {
    console.error("Error al actualizar el recorrido:", error);
    throw error;
  }
};
export const selectRecorrido = async (id: number) => {
  try {
    return await db.query.recorrido.findFirst({
      where: (recorrido, { eq }) => eq(recorrido.id, id),
    });
  } catch (error) {
    console.error("Error al obtener el recorrido:", error);
    throw error;
  }
};
