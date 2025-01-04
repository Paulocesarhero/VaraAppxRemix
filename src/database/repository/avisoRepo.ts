import { eq } from "drizzle-orm";
import { AvisoValues } from "varaapplib/components/AvisoForm/types";

import { db } from "../connection/sqliteConnection";
import { avisos } from "../schemas/avisoSchema";

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
  avisoValues: AvisoValues,
  nombreAviso: string,
  idAviso: number
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
    .update(avisos)
    .set(aviso)
    .where(eq(avisos.id, idAviso))
    .returning({ updateId: avisos.id });
  return result[0].updateId;
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

export interface AvisoWithId extends AvisoValues {
  id: number;
}
