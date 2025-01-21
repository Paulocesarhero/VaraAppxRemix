import { eq } from "drizzle-orm";
import { SQLiteRunResult } from "expo-sqlite";
import { AvisoValues } from "varaapplib/components/AvisoForm/types";

import { db } from "../connection/sqliteConnection";
import { avisos, AvisoWithRelations } from "../schemas/avisoSchema";

type newAviso = typeof avisos.$inferInsert;

export const addAviso = async (
  avisoValues: AvisoValues,
  nombreAviso: string
): Promise<number> => {
  const aviso: newAviso = {
    nombre: nombreAviso,
    nombreObservador: avisoValues.Nombre,
    telefono: avisoValues.Telefono,
    facilAcceso: avisoValues.FacilAcceso ? 1 : 0,
    acantilado: avisoValues.Acantilado ? 1 : 0,
    sustrato: avisoValues.Sustrato,
    lugarDondeSeVio: avisoValues.LugarDondeSeVio,
    fechaDeAvistamiento: avisoValues.FechaDeAvistamiento,
    tipoDeAnimal: avisoValues.TipoDeAnimal,
    condicionDeAnimal: avisoValues.CondicionDeAnimal,
    informacionDeLocalizacion: avisoValues.InformacionDeLocalizacion,
    cantidadDeAnimales: +avisoValues.CantidadDeAnimales,
    latitud: avisoValues.Latitud,
    longitud: avisoValues.Longitud,
    observaciones: avisoValues.Observaciones,
    fotografia: avisoValues.Fotografia,
  };
  const result = await db
    .insert(avisos)
    .values(aviso)
    .returning({ insertId: avisos.id });
  return result[0].insertId;
};

export const updateAviso = async (
  avisoValues: Partial<AvisoValues>,
  nombreAviso: string | null,
  idAviso: number
): Promise<number> => {
  const avisoExistente = await db
    .select()
    .from(avisos)
    .where(eq(avisos.id, idAviso));

  const avisoObjeto = avisoExistente[0];

  const aviso: newAviso = {
    nombre: nombreAviso ?? avisoObjeto.nombre, // Si no se pasa nombreAviso, mantener el valor actual
    nombreObservador: avisoValues.Nombre ?? avisoObjeto.nombreObservador,
    telefono: avisoValues.Telefono ?? avisoObjeto.telefono,
    // @ts-ignore
    facilAcceso: avisoValues.FacilAcceso ? 1 : (0 ?? avisoObjeto.facilAcceso),
    // @ts-ignore
    acantilado: avisoValues.Acantilado ? 1 : (0 ?? avisoObjeto.acantilado),
    sustrato: avisoValues.Sustrato ?? avisoObjeto.sustrato,
    lugarDondeSeVio: avisoValues.LugarDondeSeVio ?? avisoObjeto.lugarDondeSeVio,
    fechaDeAvistamiento:
      avisoValues.FechaDeAvistamiento ?? avisoObjeto.fechaDeAvistamiento,
    tipoDeAnimal: avisoValues.TipoDeAnimal ?? avisoObjeto.tipoDeAnimal,
    condicionDeAnimal:
      avisoValues.CondicionDeAnimal ?? avisoObjeto.condicionDeAnimal,
    informacionDeLocalizacion:
      avisoValues.InformacionDeLocalizacion ??
      avisoObjeto.informacionDeLocalizacion,
    cantidadDeAnimales: +(
      (avisoValues.CantidadDeAnimales ?? avisoObjeto.cantidadDeAnimales) ||
      "0"
    ),
    latitud: avisoValues.Latitud ?? avisoObjeto.latitud,
    longitud: avisoValues.Longitud ?? avisoObjeto.longitud,
    observaciones: avisoValues.Observaciones ?? avisoObjeto.observaciones,
    fotografia: avisoValues.Fotografia ?? avisoObjeto.fotografia,
  };

  const result = await db
    .update(avisos)
    .set(aviso)
    .where(eq(avisos.id, idAviso))
    .returning({ updateId: avisos.id });
  return result[0].updateId;
};

export const deleteAvisoById = async (
  idAviso: number
): Promise<SQLiteRunResult> => {
  const result = await db.delete(avisos).where(eq(avisos.id, idAviso));
  return result;
};

export const getAvisoByIdLocalDb = async (
  idAviso: number
): Promise<AvisoValues> => {
  const result = await db.select().from(avisos).where(eq(avisos.id, idAviso));

  if (!result[0]) {
    throw new Error(`Aviso with id ${idAviso} not found`);
  }

  const aviso = result[0];

  return {
    Nombre: aviso.nombre ?? "",
    Telefono: aviso.telefono ?? "",
    FacilAcceso: aviso.facilAcceso === 1,
    Acantilado: aviso.acantilado === 1,
    Sustrato: aviso.sustrato ?? 0,
    LugarDondeSeVio: aviso.lugarDondeSeVio ?? 0,
    FechaDeAvistamiento: aviso.fechaDeAvistamiento ?? "",
    TipoDeAnimal: aviso.tipoDeAnimal ?? 0,
    Observaciones: aviso.observaciones ?? "",
    CondicionDeAnimal: aviso.condicionDeAnimal ?? 0,
    CantidadDeAnimales: (aviso.cantidadDeAnimales ?? "").toString(),
    InformacionDeLocalizacion: aviso.informacionDeLocalizacion ?? "",
    Latitud: aviso.latitud ?? "",
    Longitud: aviso.longitud ?? "",
    Fotografia: aviso.fotografia ?? "",
  };
};

export const getAvisosBdLocal = async (): Promise<AvisoWithId[]> => {
  const result = await db.select().from(avisos);

  if (!result || result.length === 0) {
    return [];
  }

  return result.map((aviso) => ({
    id: aviso.id,
    Nombre: aviso.nombre ?? "",
    Telefono: aviso.telefono ?? "",
    FacilAcceso: aviso.facilAcceso === 1,
    Acantilado: aviso.acantilado === 1,
    Sustrato: aviso.sustrato ?? 0,
    LugarDondeSeVio: aviso.lugarDondeSeVio ?? 0,
    FechaDeAvistamiento: aviso.fechaDeAvistamiento ?? "",
    TipoDeAnimal: aviso.tipoDeAnimal ?? 0,
    Observaciones: aviso.observaciones ?? "",
    CondicionDeAnimal: aviso.condicionDeAnimal ?? 0,
    CantidadDeAnimales: (aviso.cantidadDeAnimales ?? "").toString(),
    InformacionDeLocalizacion: aviso.informacionDeLocalizacion ?? "",
    Latitud: aviso.latitud ?? "",
    Longitud: aviso.longitud ?? "",
    Fotografia: aviso.fotografia ?? "",
  }));
};

export const getAvisoBdLocal = async (
  idAviso: number
): Promise<AvisoWithRelations | null> => {
  try {
    const aviso = await db.query.avisos.findFirst({
      where: (avisos, { eq }) => eq(avisos.id, idAviso),
      with: {
        ambiente: true,
        especimenes: {
          with: {
            especie: true,
            varamientoMasivo: true,
            recorrido: true,
            misticeto: true,
            odontoceto: true,
            pinnipedo: true,
            sirenio: true,
            organismo: true,
            acciones: true,
          },
        },
      },
    });
    console.log("aviso", JSON.stringify(aviso, null, 2));

    return aviso as AvisoWithRelations;
  } catch (error) {
    console.error("Error al obtener aviso bd local:", error);
    throw error;
  }
};

export interface AvisoWithId extends AvisoValues {
  id: number;
}
