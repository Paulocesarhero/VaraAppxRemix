import { InferSelectModel, relations } from "drizzle-orm";
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
    avisoId: t
      .int("aviso_id")
      .references(() => avisos.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      avisoIndex: t.index("aviso_idx").on(table.avisoId),
    };
  }
);

export const especimen = table("especimen", {
  id: t.int().primaryKey({ autoIncrement: true }),
  latitud: t.text(),
  longitud: t.text(),
  condicion: t.int(),
  longitudTotalRectilinea: t.text(),
  peso: t.text(),
  sexo: t.int(),
  grupoDeEdad: t.int(),
  orientacionDelEspecimen: t.text(),
  sustrato: t.int(),
  otroSustrato: t.text(),
  heridasBala: t.text(),
  heridasBalaFoto: t.text(),
  presenciaDeRedes: t.text(),
  presenciaDeRedesFoto: t.text(),
  mordidas: t.text(),
  mordidasFoto: t.text(),
  golpes: t.text(),
  golpesFoto: t.text(),
  otroTipoDeHeridas: t.text(),
  otroTipoDeHeridasFoto: t.text(),
  especieId: t.int("especie_id").references(() => especie.id),
  avisoId: t.int("aviso_id").references(() => avisos.id),
  varamientoMasivoId: t
    .int("varamiento_masivo_id")
    .references(() => varamientoMasivo.id, { onDelete: "cascade" }),
  recorridoId: t
    .int("recorrido_id")
    .references(() => recorrido.id, { onDelete: "cascade" }),
});
export const especie = table("especie", {
  id: t.int().primaryKey({ autoIncrement: true }),
  nombre: t.text(),
  nombreLatin: t.text(),
  taxa: t.int(),
  familia: t.int(),
});

export const varamientoMasivo = table("varamiento_masivo", {
  id: t.int().primaryKey({ autoIncrement: true }),
  avesMuertas: t.int().$type<0 | 1>(),
  avesMuertasCantidad: t.text(),
  pecesMuertos: t.int().$type<0 | 1>(),
  pecesMuertosCantidad: t.text(),
  numeroTotalDeAnimales: t.text(),
  subGrupos: t.text(),
  animalesVivos: t.text(),
  animalesMuertos: t.text(),
  observaciones: t.text(),
  avisoId: t
    .int("aviso_id")
    .references(() => avisos.id, { onDelete: "cascade" }),
});

export const localizacion = table("localizacion", {
  id: t.int().primaryKey({ autoIncrement: true }),
  pais: t.text(),
  estado: t.text(),
  ciudad: t.text(),
  localidad: t.text(),
  informacionAdicional: t.text(),
  latitud: t.real().notNull(),
  longitud: t.real().notNull(),
});

export const recorrido = table("recorrido", {
  id: t.int().primaryKey({ autoIncrement: true }),
  fecha: t.text(),
  horaInicio: t.text(),
  horaFin: t.text(),
  coordenadaInicioId: t
    .int("coordenada_inicio_id")
    .references(() => localizacion.id),
  coordenadaFinId: t.int("coordenada_fin_id").references(() => localizacion.id),
  referenciasInicio: t.text(),
  referenciasFin: t.text(),
  distanciaRecorrido: t.real(),
  observaciones: t.text(),
  participantes: t.text(),
  zonaSeguimiento: t.text(),
  ruta: t.text({ mode: "json" }),
  reportesMasivos: t.text(),
});

export const misticeto = table("misticeto", {
  id: t.int().primaryKey({ autoIncrement: true }),
  NumeroDeBarbas: t.text(),
  BarbasColor: t.text(),
  BarbaLargo: t.text(),
  BarbaAncho: t.text(),
  M1LongitudTotalLR: t.text(),
  M1LongitudTotalC: t.text(),
  M2LongitudRostroAlCentroDelAnoLR: t.text(),
  M2LongitudRostroAlCentroDelAnoC: t.text(),
  M3LongitudRostroAlCentroDeLaAberturaGenitalLR: t.text(),
  M3LongitudRostroAlCentroDeLaAberturaGenitalC: t.text(),
  M4LongitudDelRostroALosPlieguesGularesLR: t.text(),
  M4LongitudDelRostroALosPlieguesGularesC: t.text(),
  M5LongitudDelRostroAlCentroDelOmbligoLR: t.text(),
  M5LongitudDelRostroAlCentroDelOmbligoC: t.text(),
  M6LongitudDelRostroAPuntaDeAletaDorsalLR: t.text(),
  M7LongitudDelRostroAAletaDorsalEnParteAnteriorLR: t.text(),
  M7LongitudDelRostroAAletaDorsalEnParteAnteriorC: t.text(),
  M8LongitudDelRostroALaInsercionDeLaAletaPectoralLR: t.text(),
  M8LongitudDelRostroALaInsercionDeLaAletaPectoralC: t.text(),
  M9LongitudDelRostroAlCentroDelOrificioRespiratorioLR: t.text(),
  M9LongitudDelRostroAlCentroDelOrificioRespiratorioC: t.text(),
  M10LongitudDelRostroAlCentroDelOjoLR: t.text(),
  M10LongitudDelRostroAlCentroDelOjoC: t.text(),
  M11LongitudDelRostroAlCentroDelOjoLR: t.text(),
  M11LongitudDelRostroAlCentroDelOjoC: t.text(),
  M12LongitudDelRostroALaComisuraDeLaBocaLR: t.text(),
  M13AnchoMaximoDelRostroLR: t.text(),
  M14NumeroDePlieguesGularesLR: t.text(),
  M15NumeroDeProtuberanciasDorsalesLR: t.text(),
  M16ProyeccionDelMaxilarLR: t.text(),
  M17DistanciaMaximaDeOjoAOjoC: t.text(),
  M18AnchoMaximoDelOjoC: t.text(),
  M19LongitudMaximaDelOjoC: t.text(),
  M20LongitudMaximaDelCentroDelOjoALaComisuraDeLaBocaLR: t.text(),
  M20LongitudMaximaDelCentroDelOjoALaComisuraDeLaBocaC: t.text(),
  M21LongitudMaximaDelCentroDelOjoAlCentroDelOidoLR: t.text(),
  M21LongitudMaximaDelCentroDelOjoAlCentroDelOidoC: t.text(),
  M22LongitudMaximaDelCentroDelOjoAlCentroDeLosOrificiosRespiratoriosLR:
    t.text(),
  M22LongitudMaximaDelCentroDelOjoAlCentroDeLosOrificiosRespiratoriosC:
    t.text(),
  M23LongitudMaximaDeLosOrificiosRespiratoriosC: t.text(),
  M24AnchoMaximoDeLosOrificiosRespiratoriosC: t.text(),
  M25AnchoMaximoDeLaAletaPectoralLR: t.text(),
  M26LongitudMaximaDeLaAletaPectoralEnLaParteAnteriorLR: t.text(),
  M27LongitudMaximaDeLaAletaPectoralEnLaPartePosteriorLR: t.text(),
  M28AlturaDeLaAletaDorsalLR: t.text(),
  M29LongitudDeLaBaseDeLaAletaDorsalLR: t.text(),
  M30LongitudDeLaAletaCaudalLR: t.text(),
  M31AnchoDelLobuloCaudalLR: t.text(),
  M32ProfundidadDeLaEscotaduraLR: t.text(),
  M33LongitudDeLaEscotaduraAlAnoLR: t.text(),
  M34LongitudDeLaEscotaduraALaAberturaGenitalLR: t.text(),
  M35LongitudDeLaEscotaduraAlOmbligoLR: t.text(),
  M35LongitudDeLaEscotaduraAlOmbligoC: t.text(),
  M36CircunferenciaDelCuerpoDetrásDeLasPectoralesC: t.text(),
  M37CircunferenciaDelCuerpoANivelDelOmbligoC: t.text(),
  M38CircunferenciaDelCuerpoANivelDeLaAberturaGenitalC: t.text(),
  M39CircunferenciaDelCuerpoEnElPedunculoCaudalC: t.text(),
  M40LongitudDeLaAberturaMamariaC: t.text(),
  M41LongitudDeLaAberturaGenitalC: t.text(),
  M42LongitudDeLaAberturaAnalC: t.text(),
  especimenId: t
    .int("especimen_id")
    .references(() => especimen.id, { onDelete: "cascade" }),
});

export const odontoceto = table("odontoceto", {
  id: t.int().primaryKey({ autoIncrement: true }),
  maxilarIzquierdo: t.text(),
  maxilarDerecho: t.text(),
  mandibulaIzquierda: t.text(),
  mandibulaDerecha: t.text(),
  m1LongitudTotalLR: t.text(),
  m1LongitudTotalC: t.text(),
  m2LongitudRostroAlCentroDelAnoLR: t.text(),
  m2LongitudRostroAlCentroDelAnoC: t.text(),
  m3LongitudRostroAlCentroDeLaAberturaGenitalLR: t.text(),
  m3LongitudRostroAlCentroDeLaAberturaGenitalC: t.text(),
  m4LongitudDelRostroAlCentroDelOmbligoLR: t.text(),
  m4LongitudDelRostroAlCentroDelOmbligoC: t.text(),
  m5LongitudDelRostroAPuntaDeAletaDorsalLR: t.text(),
  m6LongitudDelRostroAAletaDorsalEnParteAnteriorLR: t.text(),
  m6LongitudDelRostroAAletaDorsalEnParteAnteriorC: t.text(),
  m7LongitudDelRostroAAletaPectoralEnparteAnteriorLR: t.text(),
  m7LongitudDelRostroAAletaPectoralEnparteAnteriorC: t.text(),
  m8LongitudDelRostroAlCentroDelOrificioRespiratorioLR: t.text(),
  m8LongitudDelRostroAlCentroDelOrificioRespiratorioC: t.text(),
  m9LongitudDeLaPuntaDelRostroALaBaseDelRostroLR: t.text(),
  m9LongitudDeLaPuntaDelRostroALaBaseDelRostroC: t.text(),
  m10LongitudDelRostroAlCentroDelOidoLR: t.text(),
  m10LongitudDelRostroAlCentroDelOidoC: t.text(),
  m11LongitudDelRostroAlCentroDelOjoLR: t.text(),
  m11LongitudDelRostroAlCentroDelOjoC: t.text(),
  m12LongitudDelRostroALaComisuraDeLaBocaLR: t.text(),
  m12LongitudDelRostroALaComisuraDeLaBocaC: t.text(),
  m13AnchoMaximoDelRostroLR: t.text(),
  m14ProyeccionDelMaxilarOMandibulaLR: t.text(),
  m15DistanciaMaximaDeOjoAOjoC: t.text(),
  m16AnchoMaximoDelOjoC: t.text(),
  m17LongitudMaximaDelOjoC: t.text(),
  m18LongitudMaximaDelCentroDelOjoALaComisuraDeLaBocaLR: t.text(),
  m18LongitudMaximaDelCentroDelOjoALaComisuraDeLaBocaC: t.text(),
  m19LongitudMaximaDelCentroDelOjoAlCentroDelOidoLR: t.text(),
  m19LongitudMaximaDelCentroDelOjoAlCentroDelOidoC: t.text(),
  m20LongitudMaximaDelCentroDelOjoAlCentroDelOrificioRespiratorioLR: t.text(),
  m20LongitudMaximaDelCentroDelOjoAlCentroDelOrificioRespiratorioC: t.text(),
  m21M21LongitudMaximaDelOrificioRespiratorioC: t.text(),
  m22AnchoMaximoDelOrificioRespiratorioC: t.text(),
  m23AnchoMaximoDeLaAletaPectoralLR: t.text(),
  m24LongitudMaximaDeLaAletaPectoralEnLaParteAnteriorLR: t.text(),
  m25LongitudMaximaDeLaAletaPectoralEnLaPartePosteriorLR: t.text(),
  m26AlturaDeLaAletaDorsalLR: t.text(),
  m27LongitudDeLaBaseDeLaAletaDorsalLR: t.text(),
  m28LongitudDeLaAletaCaudalLR: t.text(),
  m29AnchoDelLobuloCaudalLR: t.text(),
  m30ProfundidadDeLaEscotaduraLR: t.text(),
  m31LongitudDeLaEscotaduraAlAnoLR: t.text(),
  m31LongitudDeLaEscotaduraAlAnoC: t.text(),
  m32LongitudDeLaEscotaduraALaAberturaGenitalLR: t.text(),
  m32LongitudDeLaEscotaduraALaAberturaGenitalC: t.text(),
  m33LongitudDeLaEscotaduraAlOmbligoLR: t.text(),
  m33LongitudDeLaEscotaduraAlOmbligoC: t.text(),
  m34CircunferenciaDelCuerpoDetrásDeLasPectoralesC: t.text(),
  m35CircunferenciaMaximaC: t.text(),
  m36CircunferenciaDelCuerpoANivelDelOmbligoC: t.text(),
  m37CircunferenciaDelCuerpoANivelDeLaAberturaGenitalC: t.text(),
  m38CircunferenciaDelCuerpoEnElPedunculoCaudalC: t.text(),
  m39LongitudDeLaAberturaMamariaC: t.text(),
  m40LongitudDeLaAberturaGenitalC: t.text(),
  m41LongitudDeLaAberturaAnalC: t.text(),
  especimenId: t
    .int("especimen_id")
    .references(() => especimen.id, { onDelete: "cascade" }),
});

export const pinnipedo = table("pinnipedo", {
  id: t.int().primaryKey({ autoIncrement: true }),
  lrNarizAColaCm: t.text(),
  lcNarizAColaCm: t.text(),
  cCuerpoDetrasDePectorales: t.text(),
  cCuerpoANivelDelOmbligo: t.text(),
  lNarizAlCentroDelOjo: t.text(),
  lNarizAlCentroDelOido: t.text(),
  lAletaPectoralEnParteAnterior: t.text(),
  aAletaPectoralANivelAxila: t.text(),
  aMaximoDeAletapectora: t.text(),
  lAletaPosteriorParteAnterior: t.text(),
  anchoMaximoAletaPosterior: t.text(),
  lCola: t.text(),
  eCapaDeGrasa: t.text(),
  cCraneoAlturaDeOrejas: t.text(),
  aRostro: t.text(),
  aCabeza: t.text(),
  lCabeza: t.text(),
  lPoscaninosSuperiores: t.text(),
  anchoInterorbital: t.text(),
  anchoCigomatico: t.text(),
  anchoCondilobasal: t.text(),
  maxilarIzquierdoPosCanino: t.text(),
  maxilarIzquierdoCanino: t.text(),
  maxilarIzquierdoIncisivo: t.text(),
  maxilarDerechoPosCanino: t.text(),
  maxilarDerechoCanino: t.text(),
  maxilarDerechoIncisivo: t.text(),
  mandibulaIzquierdoPosCanino: t.text(),
  mandibulaIzquierdoCanino: t.text(),
  mandibulaIzquierdoIncisivo: t.text(),
  mandibulaDerechoPosCanino: t.text(),
  mandibulaDerechoCanino: t.text(),
  mandibulaDerechoIncisivo: t.text(),
  especimenId: t
    .int("especimen_id")
    .references(() => especimen.id, { onDelete: "cascade" }),
});

export const sirenio = table("sirenio", {
  id: t.int().primaryKey({ autoIncrement: true }),
  extremoHocicoAExtremoAletaCaudalL: t.text(),
  extremoHocicoAExtremoAletaCaudalC: t.text(),
  extremoHocicoACentroAno: t.text(),
  extremoHocicoAAberturaGenital: t.text(),
  extremoHocicoACentroOmbligo: t.text(),
  extremoHocicoAOrigenAnteriorDeAletasPectorales: t.text(),
  extremoHocicoACentroOjo: t.text(),
  extremoHocicoACentroMeatoAuditivoExterno: t.text(),
  centroOjoACentroMeatoAuditivoExterno: t.text(),
  distanciaOjoAOjoDorso: t.text(),
  centroOjoAlCentroAberturaNasal: t.text(),
  aletaPectoralOrigenAnteriorAlExtremo: t.text(),
  aletaPectoralDeAxilaAlExtremo: t.text(),
  anchoMaxAletaPectoral: t.text(),
  longuitudPerpenticularTetillasDerechas: t.text(),
  longuitudPerpenticularTetillasIzquierdas: t.text(),
  baseAletaCaudalAlExtremo: t.text(),
  anchoMaxAletaCaudal: t.text(),
  diametroNivelDeBaseAletaCaudal: t.text(),
  diametroNivelAno: t.text(),
  diametroNivelOmbligo: t.text(),
  diametroNivelAxila: t.text(),
  grosorPielDorsal: t.text(),
  grosorPielLateral: t.text(),
  grosorPielVentral: t.text(),
  grosorCapasGrasaSuperiorDerecha: t.text(),
  grosorCapasGrasaSuperiorIzquierda: t.text(),
  grosorCapasGrasaInferiorDerecha: t.text(),
  grosorCapasGrasaInferiorIzquierda: t.text(),
  responsablesMorfometria: t.text(),
  responsablesFormatoE1: t.text(),
  grosorCapasGrasaExternaDorsal: t.text(),
  grosorCapasGrasaExternaLateral: t.text(),
  grosorCapasGrasaExternaVentral: t.text(),
  grosorCapasGrasaInternaDorsal: t.text(),
  grosorCapasGrasaInternaLateral: t.text(),
  grosorCapasGrasaInternaVentral: t.text(),
  numeroDientesSuperiorDerecha: t.text(),
  numeroDientesSuperiorIzquierda: t.text(),
  numeroDientesInferiorDerecha: t.text(),
  numeroDientesInferiorIzquierda: t.text(),
  especimenId: t
    .int("especimen_id")
    .references(() => especimen.id, { onDelete: "cascade" }),
});

export const organismo = table("organismo", {
  id: t.int().primaryKey({ autoIncrement: true }),
  tasaDeRespiracion: t.text(),
  pulso: t.text(),
  temperatura: t.text(),
  antesDeVararse: t.text(),
  varado: t.text(),
  reflotacion: t.int().$type<0 | 1>(),
  despuesDeReflotar: t.text(),
  animalTransferido: t.int().$type<0 | 1>(),
  lugarDeRehabilitacion: t.text(),
  despuesDeVararse: t.text(),
  especimenId: t
    .int("especimen_id")
    .references(() => especimen.id, { onDelete: "cascade" }),
});

export const acciones = table("acciones", {
  id: t.int().primaryKey({ autoIncrement: true }),
  autoridades: t.text(),
  telefonoAutoridades: t.text(),
  morfometria: t.int().$type<0 | 1>(),
  necropsia: t.int().$type<0 | 1>(),
  disposicionDelCadaver: t.int(),
  disposicionOtro: t.text(),
  posibleCausaDelVaramiento: t.text(),
  posibleCausaDeMuerte: t.text(),
  participantes: t.text(),
  observaciones: t.text(),
  tipoDeMuestras: t.text({ mode: "json" }),
  especimenId: t
    .int("especimen_id")
    .references(() => especimen.id, { onDelete: "cascade" }),
});
export const varamientoMasivoRealtions = relations(
  varamientoMasivo,
  ({ one, many }) => ({
    especimenes: many(especimen),
    aviso: one(avisos, {
      fields: [varamientoMasivo.avisoId],
      references: [avisos.id],
    }),
    ambiente: one(ambiente, {
      fields: [varamientoMasivo.avisoId],
      references: [ambiente.avisoId],
    }),
  })
);

export const avisosRelations = relations(avisos, ({ many, one }) => ({
  especimenes: many(especimen),
  ambiente: one(ambiente, {
    fields: [avisos.id],
    references: [ambiente.avisoId],
  }),
  varamientoMasivo: one(varamientoMasivo),
}));

export const especimenRelations = relations(especimen, ({ one }) => ({
  aviso: one(avisos, {
    fields: [especimen.avisoId],
    references: [avisos.id],
  }),
  especie: one(especie, {
    fields: [especimen.especieId],
    references: [especie.id],
  }),
  varamientoMasivo: one(varamientoMasivo, {
    fields: [especimen.varamientoMasivoId],
    references: [varamientoMasivo.id],
  }),
  recorrido: one(recorrido, {
    fields: [especimen.recorridoId],
    references: [recorrido.id],
  }),
  // Relaciones one-to-one con las tablas de medidas
  misticeto: one(misticeto), // opcional
  odontoceto: one(odontoceto), // opcional
  pinnipedo: one(pinnipedo), // opcional
  sirenio: one(sirenio), // opcional
  organismo: one(organismo), // opcional
  acciones: one(acciones), // opcional
}));

// Relaciones inversas desde las tablas de medidas
export const misticetoRelations = relations(misticeto, ({ one }) => ({
  especimen: one(especimen, {
    fields: [misticeto.especimenId],
    references: [especimen.id],
  }),
}));

export const odontocetoRelations = relations(odontoceto, ({ one }) => ({
  especimen: one(especimen, {
    fields: [odontoceto.especimenId],
    references: [especimen.id],
  }),
}));

export const pinnipedoRelations = relations(pinnipedo, ({ one }) => ({
  especimen: one(especimen, {
    fields: [pinnipedo.especimenId],
    references: [especimen.id],
  }),
}));

export const sirenioRelations = relations(sirenio, ({ one }) => ({
  especimen: one(especimen, {
    fields: [sirenio.especimenId],
    references: [especimen.id],
  }),
}));

export const organismoRelations = relations(organismo, ({ one }) => ({
  especimen: one(especimen, {
    fields: [organismo.especimenId],
    references: [especimen.id],
  }),
}));

export const accionesRelations = relations(acciones, ({ one }) => ({
  especimen: one(especimen, {
    fields: [acciones.especimenId],
    references: [especimen.id],
  }),
}));

export const especieRelations = relations(especie, ({ one }) => ({
  aviso: one(especimen, {
    fields: [especie.id],
    references: [especimen.especieId],
  }),
}));
export const ambienteRelations = relations(ambiente, ({ one }) => ({
  aviso: one(avisos, {
    fields: [ambiente.avisoId],
    references: [avisos.id],
  }),
}));

export type AvisoDb = InferSelectModel<typeof avisos>;
export type EspecimenDb = InferSelectModel<typeof especimen>;
export type EspecieDb = InferSelectModel<typeof especie>;
export type VaramientoMasivoDb = InferSelectModel<typeof varamientoMasivo>;
export type RecorridoDb = InferSelectModel<typeof recorrido>;
export type MisticetoDb = InferSelectModel<typeof misticeto>;
export type OdontocetoDb = InferSelectModel<typeof odontoceto>;
export type PinnipedoDb = InferSelectModel<typeof pinnipedo>;
export type SirenioDb = InferSelectModel<typeof sirenio>;
export type OrganismoDb = InferSelectModel<typeof organismo>;
export type AccionesDb = InferSelectModel<typeof acciones>;
export type AmbienteDb = InferSelectModel<typeof ambiente>;
export type VaramientoMasivoWithRelations = VaramientoMasivoDb & {
  aviso: AvisoDb | null;
  ambiente: AmbienteDb | null;
  especimenes: EspecimenWithRelations[];
};

export type AvisoWithRelations = AvisoDb & {
  ambiente: InferSelectModel<typeof ambiente> | null;
  pinnipedo: InferSelectModel<typeof pinnipedo> | null;
  misticeto: InferSelectModel<typeof misticeto> | null;
  odontoceto: InferSelectModel<typeof odontoceto> | null;
  sirenio: InferSelectModel<typeof sirenio> | null;
  especimenes: EspecimenWithRelations[];
};
export type EspecimenWithRelations = EspecimenDb & {
  especie: EspecieDb | null;
  varamientoMasivo: VaramientoMasivoDb | null;
  recorrido: RecorridoDb | null;
  misticeto: MisticetoDb | null;
  odontoceto: OdontocetoDb | null;
  pinnipedo: PinnipedoDb | null;
  sirenio: SirenioDb | null;
  organismo: OrganismoDb | null;
  acciones: AccionesDb | null;
};
