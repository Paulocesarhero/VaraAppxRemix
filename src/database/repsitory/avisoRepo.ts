import { AvisoValues } from "varaapplib/components/AvisoForm/types";

import { db } from "../connection/sqliteConnection";
import { avisos } from "../schemas/avisoSchema";

type newAviso = typeof avisos.$inferInsert;

export const addAviso = async (
  avisoValues: AvisoValues,
  nombreAviso: string
) => {
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
  return db.insert(avisos).values(aviso).returning();
};
