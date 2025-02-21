import { eq } from "drizzle-orm";

import { db } from "../connection/sqliteConnection";
import {
  recorrido,
  RecorridoDb,
  RecorridoWithRelations,
} from "../schemas/avisoSchema";
import { deleteAvisoById } from "./avisoRepo";
import { all } from "axios";

export const addRecorrido = async () => {
  try {
    await db.insert(recorrido).values({ fecha: new Date().toString() });
  } catch (_error) {
    throw new Error(
      "No se pudo agregar el recorrido. Por favor, intenta nuevamente. "
    );
  }
};
export const updateRecorrido = async (data: Partial<RecorridoDb>) => {
  if (!data.id) {
    throw new Error("El ID del recorrido es obligatorio para actualizar.");
  }
  try {
    await db.update(recorrido).set(data).where(eq(recorrido.id, data.id));
  } catch (_error) {
    throw new Error("Error al actualizar el recorrido: ");
  }
};

export const deleteRecorrido = async (id: number) => {
  try {
    const allRecorrido = await getAllDataRecorrido(id);
    console.log("all recorrido ", allRecorrido);
    for (const aviso of allRecorrido.avisos) {
      await deleteAvisoById(aviso.id);
    }
    await db.delete(recorrido).where(eq(recorrido.id, id));
  } catch (_error) {
    console.error(_error);
    throw new Error("Error al eliminar el recorrido: ");
  }
};

export const deleteCorrdenadaRecorrido = async (id: number | null) => {
  if (id == null) return;
  try {
    await db.update(recorrido).set({ ruta: null }).where(eq(recorrido.id, id));
  } catch (_error) {
    throw new Error("Error al limpar la ruta del recorrido: ");
  }
};

export const getAllDataRecorrido = async (id: number) => {
  const result = await db.query.recorrido.findFirst({
    where: (recorrido, { eq }) => eq(recorrido.id, id),
    with: {
      avisos: {
        with: {
          especimenes: {
            with: {
              especie: true,
              misticeto: true,
              odontoceto: true,
              pinnipedo: true,
              sirenio: true,
              organismo: true,
              acciones: true,
            },
          },
          ambiente: true,
          varamientoMasivo: {
            with: {
              aviso: true,
              especimenes: {
                with: {
                  especie: true,
                  misticeto: true,
                  odontoceto: true,
                  pinnipedo: true,
                  sirenio: true,
                  organismo: true,
                  acciones: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return result as RecorridoWithRelations;
};
