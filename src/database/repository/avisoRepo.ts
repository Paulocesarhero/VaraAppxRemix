import { eq } from "drizzle-orm";
import { AvisoValues } from "varaapplib/components/AvisoForm/types";

import {
  deleteAllImages,
  deleteImage,
  deleteImageOfAviso,
} from "../../hooks/helpers";
import { db } from "../connection/sqliteConnection";
import {
  acciones,
  ambiente,
  avisos,
  AvisoWithRelations,
  especimen,
  localizacion,
  misticeto,
  odontoceto,
  organismo,
  pinnipedo,
  recorrido,
  sirenio,
  varamientoMasivo,
} from "../schemas/avisoSchema";
import { deleteEspecimenById } from "./especimenRepo";

type newAviso = typeof avisos.$inferInsert;

export const addAviso = async (
  avisoValues: AvisoValues,
  nombreAviso: string,
  idRecorrido: number | null
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
    recorridoId: idRecorrido ?? null,
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
    recorridoId: avisoObjeto.recorridoId ?? null,
  };

  const result = await db
    .update(avisos)
    .set(aviso)
    .where(eq(avisos.id, idAviso))
    .returning({ updateId: avisos.id });
  return result[0].updateId;
};
export const deletePhotoByIdAviso = async (idAviso: number): Promise<any> => {
  const result = await db.select().from(avisos).where(eq(avisos.id, idAviso));
  const avisoObjeto = result[0];
  const fotografia = avisoObjeto.fotografia;
  if (fotografia) {
    const fotografiaUri = fotografia;
    return await deleteImage(fotografiaUri);
  }
  return null;
};

export const deleteAvisoById = async (idAviso: number): Promise<boolean> => {
  const allAviso = await getAvisoBdLocal(idAviso);
  if (allAviso) {
    await deleteImageOfAviso(allAviso);
  }
  await db.delete(avisos).where(eq(avisos.id, idAviso));
  for (const especimen of allAviso?.especimenes ?? []) {
    await deleteEspecimenById(especimen.id);
  }
  await db.delete(ambiente).where(eq(ambiente.avisoId, idAviso));
  await db
    .delete(varamientoMasivo)
    .where(eq(varamientoMasivo.avisoId, idAviso));

  return true;
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

    return aviso as AvisoWithRelations;
  } catch (error) {
    console.error("Error al obtener aviso bd local:", error);
    throw error;
  }
};

export const hasEspecieAviso = async (
  idAviso: number
): Promise<boolean | null> => {
  try {
    const aviso = await db.query.avisos.findFirst({
      where: (avisos, { eq }) => eq(avisos.id, idAviso),
      with: {
        especimenes: {
          with: {
            especie: true,
          },
        },
      },
    });

    // @ts-ignore
    if (aviso && aviso.especimenes[0]?.especie != null) {
      const especimenes = await db.query.especimen.findMany({
        where: (especimen, { eq }) => eq(especimen.avisoId, idAviso),
        with: {
          especie: true,
        },
      });
      for (const especimen of especimenes) {
        if (especimen.especie?.id == null) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error al obtener aviso bd local:", error);
    throw error;
  }
};

export interface AvisoWithId extends AvisoValues {
  id: number;
}

export const setSubidoAviso = async (idAviso: number) => {
  await db
    .update(avisos)
    .set({ nombre: "Subido" })
    .where(eq(avisos.id, idAviso));
};

export const clearDataBase = async () => {
  await db.delete(avisos);
  await db.delete(ambiente);
  await db.delete(especimen);
  await db.delete(varamientoMasivo);
  await db.delete(localizacion);
  await db.delete(recorrido);
  await db.delete(misticeto);
  await db.delete(odontoceto);
  await db.delete(pinnipedo);
  await db.delete(sirenio);
  await db.delete(organismo);
  await db.delete(acciones);
  await deleteAllImages();
};
