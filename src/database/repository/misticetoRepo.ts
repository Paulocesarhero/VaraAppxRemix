import { eq } from "drizzle-orm";

import { FormValuesMorfometriaMisticeto } from "../../forms/MorfometriaMisticeto/FormValuesMorfometriaMisticeto";
import { db } from "../connection/sqliteConnection";
import { misticeto } from "../schemas/avisoSchema";

type NewMisticeto = typeof misticeto.$inferInsert;

export const addMisticetoIfNotExist = async (idEspecimen: number) => {
  const newMisticeto: NewMisticeto = {
    BarbaAncho: "",
    BarbaLargo: "",
    BarbasColor: "",
    M10LongitudDelRostroAlCentroDelOjoC: "",
    M10LongitudDelRostroAlCentroDelOjoLR: "",
    M11LongitudDelRostroAlCentroDelOjoC: "",
    M11LongitudDelRostroAlCentroDelOjoLR: "",
    M12LongitudDelRostroALaComisuraDeLaBocaLR: "",
    M13AnchoMaximoDelRostroLR: "",
    M14NumeroDePlieguesGularesLR: "",
    M15NumeroDeProtuberanciasDorsalesLR: "",
    M16ProyeccionDelMaxilarLR: "",
    M17DistanciaMaximaDeOjoAOjoC: "",
    M18AnchoMaximoDelOjoC: "",
    M19LongitudMaximaDelOjoC: "",
    M1LongitudTotalC: "",
    M1LongitudTotalLR: "",
    M20LongitudMaximaDelCentroDelOjoALaComisuraDeLaBocaC: "",
    M20LongitudMaximaDelCentroDelOjoALaComisuraDeLaBocaLR: "",
    M21LongitudMaximaDelCentroDelOjoAlCentroDelOidoC: "",
    M21LongitudMaximaDelCentroDelOjoAlCentroDelOidoLR: "",
    M22LongitudMaximaDelCentroDelOjoAlCentroDeLosOrificiosRespiratoriosC: "",
    M22LongitudMaximaDelCentroDelOjoAlCentroDeLosOrificiosRespiratoriosLR: "",
    M23LongitudMaximaDeLosOrificiosRespiratoriosC: "",
    M24AnchoMaximoDeLosOrificiosRespiratoriosC: "",
    M25AnchoMaximoDeLaAletaPectoralLR: "",
    M26LongitudMaximaDeLaAletaPectoralEnLaParteAnteriorLR: "",
    M27LongitudMaximaDeLaAletaPectoralEnLaPartePosteriorLR: "",
    M28AlturaDeLaAletaDorsalLR: "",
    M29LongitudDeLaBaseDeLaAletaDorsalLR: "",
    M2LongitudRostroAlCentroDelAnoC: "",
    M2LongitudRostroAlCentroDelAnoLR: "",
    M30LongitudDeLaAletaCaudalLR: "",
    M31AnchoDelLobuloCaudalLR: "",
    M32ProfundidadDeLaEscotaduraLR: "",
    M33LongitudDeLaEscotaduraAlAnoLR: "",
    M34LongitudDeLaEscotaduraALaAberturaGenitalLR: "",
    M35LongitudDeLaEscotaduraAlOmbligoC: "",
    M35LongitudDeLaEscotaduraAlOmbligoLR: "",
    M36CircunferenciaDelCuerpoDetrásDeLasPectoralesC: "",
    M37CircunferenciaDelCuerpoANivelDelOmbligoC: "",
    M38CircunferenciaDelCuerpoANivelDeLaAberturaGenitalC: "",
    M39CircunferenciaDelCuerpoEnElPedunculoCaudalC: "",
    M3LongitudRostroAlCentroDeLaAberturaGenitalC: "",
    M3LongitudRostroAlCentroDeLaAberturaGenitalLR: "",
    M40LongitudDeLaAberturaMamariaC: "",
    M41LongitudDeLaAberturaGenitalC: "",
    M42LongitudDeLaAberturaAnalC: "",
    M4LongitudDelRostroALosPlieguesGularesC: "",
    M4LongitudDelRostroALosPlieguesGularesLR: "",
    M5LongitudDelRostroAlCentroDelOmbligoC: "",
    M5LongitudDelRostroAlCentroDelOmbligoLR: "",
    M6LongitudDelRostroAPuntaDeAletaDorsalLR: "",
    M7LongitudDelRostroAAletaDorsalEnParteAnteriorC: "",
    M7LongitudDelRostroAAletaDorsalEnParteAnteriorLR: "",
    M8LongitudDelRostroALaInsercionDeLaAletaPectoralC: "",
    M8LongitudDelRostroALaInsercionDeLaAletaPectoralLR: "",
    M9LongitudDelRostroAlCentroDelOrificioRespiratorioC: "",
    M9LongitudDelRostroAlCentroDelOrificioRespiratorioLR: "",
    NumeroDeBarbas: "",
    especimenId: idEspecimen,
  };

  const existingMisticeto = await db
    .select()
    .from(misticeto)
    .where(eq(misticeto.especimenId, idEspecimen));

  if (existingMisticeto.length === 0) {
    await db.insert(misticeto).values(newMisticeto);
  }
};
export const updateMisticetoByIdEspecimen = async (
  idEspecimen: number | null,
  misticetoData: Partial<NewMisticeto>
): Promise<number> => {
  if (idEspecimen === null) throw new Error("Sin un idEspecimen especificado");
  const existingMisticeto = await db
    .select()
    .from(misticeto)
    .where(eq(misticeto.especimenId, idEspecimen));

  if (existingMisticeto.length === 0) {
    throw new Error(
      `No se encontró un misticeto para el aviso con id ${idEspecimen}`
    );
  }

  const misticetoObjeto = existingMisticeto[0];

  // Genera dinámicamente la lista de campos a actualizar
  const campos = Object.keys(misticetoObjeto).filter(
    (campo) => campo !== "especimenId" && misticetoData.hasOwnProperty(campo)
  );

  // Generar el objeto actualizado dinámicamente
  const updatedMisticeto = campos.reduce((acc, campo) => {
    // @ts-ignore
    acc[campo] = misticetoData[campo] ?? misticetoObjeto[campo];
    return acc;
  }, {});

  // @ts-ignore
  updatedMisticeto.especimenId = idEspecimen;

  const result = await db
    .update(misticeto)
    .set(updatedMisticeto)
    .where(eq(misticeto.especimenId, idEspecimen))
    .returning({ updateId: misticeto.id });

  return result[0].updateId;
};

export const getMisticetoByIdEspecimenLocal = async (
  idEspecimen: number
): Promise<FormValuesMorfometriaMisticeto> => {
  try {
    const result = await db
      .select()
      .from(misticeto)
      .where(eq(misticeto.especimenId, idEspecimen));

    if (!result || result.length === 0) {
      throw new Error(
        `No se encontró un misticeto para el aviso con id ${idEspecimen}`
      );
    }

    const item = { ...result[0] };
    // @ts-ignore
    delete item.id;
    // @ts-ignore
    delete item.especimenId;
    return item as FormValuesMorfometriaMisticeto;
  } catch (error) {
    throw new Error(
      `Error al obtener el misticeto para el aviso ${idEspecimen}`
    );
  }
};

export const getMisticetosBdLocal = async () => {
  const result = await db.select().from(misticeto);
  return result;
};
