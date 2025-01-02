import * as t from "drizzle-orm/sqlite-core";
import { sqliteTable as table } from "drizzle-orm/sqlite-core/table";

export const avisos = table("avisos", {
  id: t.int().primaryKey({ autoIncrement: true }),
  nombre: t.text(),
  nombreObservador: t.text(),
  telefono: t.text(),
  facilAcceso: t.int().$type<0 | 1>().default(0),
  acantilado: t.int().$type<0 | 1>().default(0),
  sustrato: t.int(),
  lugarDondeSeVio: t.int(),
  fechaDeAvistamiento: t.text(),
  tipoDeAnimal: t.int(),
  observaciones: t.text(),
  condicionDeAnimal: t.int(),
  cantidadDeAnimales: t.int(),
  informacionDeLocalizacion: t.text(),
  latitud: t.text(),
  longitud: t.text(),
  fotografia: t.text(),
});

export const ambiente = table(
  "ambiente",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    temperaturaAmbiente: t.int(),
    precipitacionHoy: t.int(),
    temperaturaSupMar: t.int(),
    marea: t.int(),
    mareaMedida: t.int(),
    direccionCorriente: t.int(),
    direccionDelViento: t.int(),
    velocidadDelViento: t.int(),
    nubosidad: t.int(),
    oleaje: t.int(),
    beaufort: t.int(),
    precipitacionTormentaPrevia: t.int(),
    anormalidadGeomagnetica: t.int(),
    mareaRoja: t.int().$type<0 | 1>().default(0),
    anormalidadEnLaPesca: t.text(),
    avisoId: t.int("aviso_id").references(() => avisos.id),
  },
  (table) => {
    return {
      avisoIndex: t.index("aviso_idx").on(table.avisoId),
    };
  }
);
