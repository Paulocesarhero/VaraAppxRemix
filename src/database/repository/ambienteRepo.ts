import { eq } from "drizzle-orm";

import { FormValuesCaracteristicasFisicasYAmbientales } from "../../forms/CaracteristicasFisicasYAmbientales/FormValuesCaracteristicasFisicasYAmbientales";
import { db } from "../connection/sqliteConnection";
import { ambiente } from "../schemas/avisoSchema";

export const getAmbienteByIdAvisoLocalDb = async (
  idAviso: number
): Promise<FormValuesCaracteristicasFisicasYAmbientales> => {
  // Valores predeterminados
  const defaultValues: FormValuesCaracteristicasFisicasYAmbientales = {
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
    anormalidadGeomagnetica: false,
    mareaRoja: false,
    anormalidadEnLaPesca: "",
  };

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
      ...defaultValues,
      temperaturaAmbiente: Number(ambienteResult.temperaturaAmbiente ?? 0),
      precipitacionHoy: Number(ambienteResult.precipitacionHoy ?? 0),
      temperaturaSupMar: Number(ambienteResult.temperaturaSupMar ?? 0),
      marea: Number(ambienteResult.marea ?? 0),
      mareaMedida: Number(ambienteResult.mareaMedida ?? 0),
      direccionCorriente: Number(ambienteResult.direccionCorriente ?? 0),
      direccionDelViento: Number(ambienteResult.direccionDelViento ?? 0),
      velocidadDelViento: Number(ambienteResult.velocidadDelViento ?? 0),
      nubosidad: Number(ambienteResult.nubosidad ?? 0),
      oleaje: Number(ambienteResult.oleaje ?? 0),
      beaufort: Number(ambienteResult.beaufort ?? 0),
      precipitacionTormentaPrevia: Number(
        ambienteResult.precipitacionTormentaPrevia ?? 0
      ),
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
