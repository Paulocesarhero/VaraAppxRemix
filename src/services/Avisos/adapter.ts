// Mapeo de la taxa a su tipo de animal correspondiente en la API se reailizo con el fin de que se vea en varaweb el registro morfometrico
import {
  AmbienteDb,
  AvisoDb,
  avisosRelations,
  AvisoWithRelations,
} from "../../database/schemas/avisoSchema";
import {
  AccionesYResultados,
  Aviso,
  FormatoGeneral,
  Peticion,
  SoloOrganismoVivo,
} from "./Types";
import { getAvisoBdLocal } from "../../database/repository/avisoRepo";
import { Especie } from "../Especie/GetEspecie";
import { FormValuesMorfometriaMisticeto } from "../../forms/MorfometriaMisticeto/FormValuesMorfometriaMisticeto";
import { RegistroMorfometricoPinnipedo } from "../../forms/MorfometriaPinnipedo/RegistroMorfometricoPinnipedo";
import RegistroMorfometricoSirenio from "../../forms/MorfometriaSirenio/RegistroMorfometricoSirenio";
import RegistroMorfometricoOdontoceto from "../../forms/MorformetriaOdontoceto/RegistroMorfometricoOdontoceto";

const convertirTaxaToTipoDeAnimal = (taxa: number) => {
  switch (taxa) {
    case 0:
      return 1;
    case 1:
      return 2;
    case 2:
      return 0;
    case 3:
      return 3;
    default:
      return 0;
  }
};

const generateAviso = (
  resultSqlite: AvisoDb,
  taxaEspecie: number | null | undefined
): Aviso => ({
  Acantilado: resultSqlite.acantilado === 1,
  FacilAcceso: resultSqlite.facilAcceso === 1,
  LugarDondeSeVio: resultSqlite.lugarDondeSeVio ?? 0,
  Sustrato: resultSqlite.sustrato ?? 0,
  FechaDeAvistamiento: resultSqlite.fechaDeAvistamiento ?? "",
  Observaciones: resultSqlite.observaciones ?? "",
  TipoDeAnimal: convertirTaxaToTipoDeAnimal(taxaEspecie ?? 0),
  CondicionDeAnimal: resultSqlite.condicionDeAnimal ?? 0,
  CantidadDeAnimales: Number(resultSqlite.cantidadDeAnimales) ?? 1,
  InformacionDeLocalizacion: resultSqlite.informacionDeLocalizacion ?? "",
  Latitud: Number(resultSqlite.latitud) ?? 0,
  Longitud: Number(resultSqlite.longitud) ?? 0,
});

const generateFormatoGeneral = (
  resultSqlite: Partial<AmbienteDb>,
  observaciones: string,
  aviso: Aviso
): FormatoGeneral => ({
  TemperaturaAmbiente: resultSqlite?.temperaturaAmbiente ?? 0,
  PrecipitacionHoy: resultSqlite?.precipitacionHoy ?? 0,
  TemperaturaSupMar: resultSqlite?.temperaturaSupMar ?? 0,
  Marea: resultSqlite?.marea ?? 0,
  MareaMedida: resultSqlite?.mareaMedida ?? 0,
  DireccionCorriente: resultSqlite?.direccionCorriente ?? 0,
  DireccionDelViento: resultSqlite?.direccionDelViento ?? 0,
  VelocidadDelViento: resultSqlite?.velocidadDelViento ?? 0,
  Nubosidad: resultSqlite?.nubosidad ?? 0,
  Oleaje: resultSqlite?.oleaje ?? 0,
  Beaufort: resultSqlite?.beaufort ?? 0,
  PrecipitacionTormentaPrevia: resultSqlite?.precipitacionTormentaPrevia ?? 0,
  AnormalidadGeomagnetica: resultSqlite?.anormalidadGeomagnetica === 1,
  MareaRoja: !!resultSqlite?.mareaRoja,
  AnormalidadEnLaPesca: resultSqlite?.anormalidadEnLaPesca ?? "",
  Observaciones: observaciones ?? "",
  Aviso: aviso,
});
const generateSoloOrganismoVivo = (
  resultSqlite: AvisoWithRelations
): SoloOrganismoVivo => {
  return {
    tasaDeRespiracion:
      resultSqlite.especimenes[0]?.organismo?.tasaDeRespiracion ?? null,
    pulso: resultSqlite.especimenes[0]?.organismo?.pulso ?? null,
    temperatura:
      Number(resultSqlite.especimenes[0]?.organismo?.temperatura) ?? null,
    antesDeVararse:
      resultSqlite.especimenes[0]?.organismo?.antesDeVararse ?? null,
    varado: resultSqlite.especimenes[0]?.organismo?.varado ?? null,
    reflotacion: resultSqlite.especimenes[0]?.organismo?.reflotacion === 1,
    despuesDeReflotar:
      resultSqlite.especimenes[0]?.organismo?.despuesDeReflotar ?? null,
    animalTransferido:
      resultSqlite.especimenes[0]?.organismo?.animalTransferido === 1,
    lugarDeRehabilitacion:
      resultSqlite.especimenes[0]?.organismo?.lugarDeRehabilitacion ?? null,
    despuesDeVararse:
      resultSqlite.especimenes[0]?.organismo?.despuesDeVararse ?? null,
  };
};
const generateAccionesYResultados = (
  resultSqlite: AvisoWithRelations
): AccionesYResultados => {
  const tipoDeMuestras =
    typeof resultSqlite.especimenes[0]?.acciones?.tipoDeMuestras === "string"
      ? JSON.parse(resultSqlite.especimenes[0]?.acciones?.tipoDeMuestras).map(
          (item: string) => ({ TipoMuestra: Number(item) })
        )
      : null;
  return {
    autoridades: resultSqlite.especimenes[0]?.acciones?.autoridades ?? "",
    telefonoAutoridades:
      resultSqlite.especimenes[0]?.acciones?.telefonoAutoridades ?? "",
    morfometria: resultSqlite.especimenes[0]?.acciones?.morfometria === 1,
    necropsia: resultSqlite.especimenes[0]?.acciones?.necropsia === 1,
    disposicionDelCadaver:
      Number(resultSqlite.especimenes[0]?.acciones?.disposicionDelCadaver) ?? 0,
    disposicionOtro:
      resultSqlite.especimenes[0]?.acciones?.disposicionOtro ?? "",
    tipoDeMuestras,
    posibleCausaDelVaramiento:
      resultSqlite.especimenes[0].acciones?.posibleCausaDelVaramiento ?? "",
    participantes: resultSqlite.especimenes[0]?.acciones?.participantes ?? "",
    observaciones: resultSqlite.especimenes[0]?.acciones?.observaciones ?? "",
    posibleCausaDeMuerte:
      resultSqlite.especimenes[0]?.acciones?.posibleCausaDeMuerte ?? "",
  };
};
export const generatePeticion = async (
  resultSqlite: AvisoWithRelations | null
): Promise<Peticion | null> => {
  if (!resultSqlite) return null;

  const aviso = generateAviso(
    resultSqlite,
    resultSqlite.especimenes[0]?.especie?.taxa
  );
  const formatoGeneral = generateFormatoGeneral(
    resultSqlite.ambiente ?? {},
    resultSqlite.observaciones ?? "",
    aviso
  );

  return {
    Latitud: resultSqlite.latitud ?? "",
    Longitud: resultSqlite.longitud ?? "",
    EspecieId: resultSqlite.especimenes[0]?.especieId ?? 1,
    Condicion: resultSqlite.condicionDeAnimal ?? 0,
    LongitudTotalRectilinea: resultSqlite.especimenes[0]
      ?.longitudTotalRectilinea
      ? Number(resultSqlite.especimenes[0]?.longitudTotalRectilinea)
      : null,
    Peso: resultSqlite.especimenes[0]?.peso
      ? Number(resultSqlite.especimenes[0]?.peso)
      : null,
    Sexo: resultSqlite.especimenes[0]?.sexo ?? 0,
    GrupoDeEdad: resultSqlite.especimenes[0]?.grupoDeEdad ?? 0,
    OrientacionDelEspecimen:
      resultSqlite.especimenes[0]?.orientacionDelEspecimen ?? "",
    Sustrato: resultSqlite.especimenes[0]?.sustrato ?? 0,
    OtroSustrato: resultSqlite.especimenes[0]?.otroSustrato ?? "",
    HeridasBala: resultSqlite.especimenes[0]?.heridasBala ?? "",
    PresenciaDeRedes: resultSqlite.especimenes[0]?.presenciaDeRedes ?? "",
    Mordidas: resultSqlite.especimenes[0]?.mordidas ?? "",
    Golpes: resultSqlite.especimenes[0]?.golpes ?? "",
    OtroTipoDeHeridas: resultSqlite.especimenes[0]?.otroTipoDeHeridas ?? "",
    Especie:
      (resultSqlite.especimenes[0]?.especie as Especie) ?? ({} as Especie),
    RegistroMorfometricoMisticeto:
      (resultSqlite.especimenes[0]
        ?.misticeto as FormValuesMorfometriaMisticeto) ??
      ({} as FormValuesMorfometriaMisticeto),
    RegistroMorfometricoPinnipedo:
      (resultSqlite.especimenes[0]
        ?.pinnipedo as RegistroMorfometricoPinnipedo) ??
      ({} as RegistroMorfometricoPinnipedo),
    RegistroMorfometricoSirenio:
      (resultSqlite.especimenes[0]?.sirenio as RegistroMorfometricoSirenio) ??
      ({} as RegistroMorfometricoSirenio),
    RegistroMorfometricoOdontoceto:
      (resultSqlite.especimenes[0]
        ?.odontoceto as RegistroMorfometricoOdontoceto) ??
      ({} as RegistroMorfometricoOdontoceto),
    AccionesYResultados: generateAccionesYResultados(resultSqlite),
    FormatoGeneral: formatoGeneral,
    SoloOrganismoVivo: generateSoloOrganismoVivo(resultSqlite),
  };
};
