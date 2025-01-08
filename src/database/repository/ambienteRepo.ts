import { eq } from "drizzle-orm";

import { FormValuesCaracteristicasFisicasYAmbientales } from "../../forms/CaracteristicasFisicasYAmbientales/FormValuesCaracteristicasFisicasYAmbientales";
import { db } from "../connection/sqliteConnection";
import { ambiente } from "../schemas/avisoSchema";

type ambienteType = typeof ambiente.$inferInsert;

export const getIdAmbienteByIdAviso = async (idAviso: number) => {
  try {
    const idambiente = await db
      .select({ idAmbiente: ambiente.id })
      .from(ambiente)
      .where(eq(ambiente.avisoId, idAviso));

    if (idambiente.length > 0) {
      return idambiente[0].idAmbiente;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener idAmbiente:", error);
  }
};

export const getAmbienteByIdAvisoLocalDb = async (
  idAviso: number
): Promise<FormValuesCaracteristicasFisicasYAmbientales> => {
  try {
    const result = await db
      .select()
      .from(ambiente)
      .where(eq(ambiente.avisoId, idAviso));
    if (!result || result.length === 0) {
      throw new Error(`No se encontró un aviso con id ${idAviso}`);
    }

    const ambienteResult = result[0];

    return {
      temperaturaAmbiente: ambienteResult.temperaturaAmbiente
        ? ambienteResult.temperaturaAmbiente.toString()
        : "0",
      precipitacionHoy: ambienteResult.precipitacionHoy?.toString() ?? "0",
      temperaturaSupMar: ambienteResult.temperaturaSupMar?.toString() ?? "0",
      marea: ambienteResult.marea?.toString() ?? "0",
      mareaMedida: ambienteResult.mareaMedida?.toString() ?? "0",
      direccionCorriente: ambienteResult.direccionCorriente?.toString() ?? "0",
      direccionDelViento: ambienteResult.direccionDelViento?.toString() ?? "0",
      velocidadDelViento: ambienteResult.velocidadDelViento?.toString() ?? "0",
      nubosidad: ambienteResult.nubosidad?.toString() ?? "0",
      oleaje: ambienteResult.oleaje?.toString() ?? "0",
      beaufort: ambienteResult.beaufort?.toString() ?? "0",
      precipitacionTormentaPrevia:
        ambienteResult.precipitacionTormentaPrevia?.toString() ?? "0",
      anormalidadGeomagnetica: Boolean(
        ambienteResult.anormalidadGeomagnetica ?? false
      ),
      mareaRoja: Boolean(ambienteResult.mareaRoja ?? false),
      anormalidadEnLaPesca: ambienteResult.anormalidadEnLaPesca ?? "",
    };
  } catch (error) {
    console.error("Error al obtener el ambiente:", error);
    throw new Error(`Error al obtener el ambiente para el aviso ${idAviso}`);
  }
};

export const addAmbienteIfNotExist = async (idAviso: number): Promise<void> => {
  const newambiente: ambienteType = {
    temperaturaAmbiente: 0,
    precipitacionHoy: 0,
    temperaturaSupMar: 0,
    marea: 0,
    mareaMedida: 0,
    direccionCorriente: 0,
    direccionDelViento: 0,
    velocidadDelViento: 0,
    nubosidad: 0,
    oleaje: 0,
    beaufort: 0,
    precipitacionTormentaPrevia: 0,
    anormalidadGeomagnetica: 0,
    mareaRoja: 0,
    anormalidadEnLaPesca: "",
    avisoId: idAviso,
  };
  const idambiente = await getIdAmbienteByIdAviso(idAviso);

  if (idambiente === null) {
    await db.insert(ambiente).values(newambiente);
  }
};

export const updateAmbienteByIdAviso = async (
  idAviso: number,
  ambienteData: Partial<FormValuesCaracteristicasFisicasYAmbientales>
): Promise<number> => {
  // Obtener los valores existentes de la base de datos
  const ambienteExistente = await db
    .select()
    .from(ambiente)
    .where(eq(ambiente.avisoId, idAviso));

  const ambienteObjeto = ambienteExistente[0];

  if (!ambienteObjeto) {
    throw new Error(
      `No se encontró un ambiente para el aviso con id ${idAviso}`
    );
  }

  // Crear un nuevo objeto con los valores actualizados
  const newAmbiente: ambienteType = {
    temperaturaAmbiente:
      ambienteData.temperaturaAmbiente !== undefined
        ? Number(ambienteData.temperaturaAmbiente)
        : ambienteObjeto.temperaturaAmbiente,
    precipitacionHoy:
      ambienteData.precipitacionHoy !== undefined
        ? Number(ambienteData.precipitacionHoy)
        : ambienteObjeto.precipitacionHoy,
    temperaturaSupMar:
      ambienteData.temperaturaSupMar !== undefined
        ? Number(ambienteData.temperaturaSupMar)
        : ambienteObjeto.temperaturaSupMar,
    marea:
      ambienteData.marea !== undefined
        ? Number(ambienteData.marea)
        : ambienteObjeto.marea,
    mareaMedida:
      ambienteData.mareaMedida !== undefined
        ? Number(ambienteData.mareaMedida)
        : ambienteObjeto.mareaMedida,
    direccionCorriente:
      ambienteData.direccionCorriente !== undefined
        ? Number(ambienteData.direccionCorriente)
        : ambienteObjeto.direccionCorriente,
    direccionDelViento:
      ambienteData.direccionDelViento !== undefined
        ? Number(ambienteData.direccionDelViento)
        : ambienteObjeto.direccionDelViento,
    velocidadDelViento:
      ambienteData.velocidadDelViento !== undefined
        ? Number(ambienteData.velocidadDelViento)
        : ambienteObjeto.velocidadDelViento,
    nubosidad:
      ambienteData.nubosidad !== undefined
        ? Number(ambienteData.nubosidad)
        : ambienteObjeto.nubosidad,
    oleaje:
      ambienteData.oleaje !== undefined
        ? Number(ambienteData.oleaje)
        : ambienteObjeto.oleaje,
    beaufort:
      ambienteData.beaufort !== undefined
        ? Number(ambienteData.beaufort)
        : ambienteObjeto.beaufort,
    precipitacionTormentaPrevia:
      ambienteData.precipitacionTormentaPrevia !== undefined
        ? Number(ambienteData.precipitacionTormentaPrevia)
        : ambienteObjeto.precipitacionTormentaPrevia,
    anormalidadGeomagnetica: ambienteData.anormalidadGeomagnetica
      ? 1
      : ambienteObjeto.anormalidadGeomagnetica,
    mareaRoja: ambienteData.mareaRoja ? 1 : ambienteObjeto.mareaRoja,
    anormalidadEnLaPesca:
      ambienteData.anormalidadEnLaPesca ?? ambienteObjeto.anormalidadEnLaPesca,
    avisoId: idAviso,
  };

  const idambiente = await getIdAmbienteByIdAviso(idAviso);

  if (idambiente === null) {
    return 0;
  } else {
    const result = await db
      .update(ambiente)
      .set(newAmbiente)
      .where(eq(ambiente.id, Number(idambiente)))
      .returning({ id: ambiente.id });
    return result[0].id;
  }
};

export const getAllAmbiente = async () => {
  const result = await db.select().from(ambiente);
  return result;
};

export const deleteAmbienteById = async (id: number) => {
  const result = await db.delete(ambiente).where(eq(ambiente.id, id));
  return result;
};

export const deleteAllAmbiente = async () => {
  const result = await db.delete(ambiente);
  return result;
};
