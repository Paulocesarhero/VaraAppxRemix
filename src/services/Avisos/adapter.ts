import {
  AccionesDb,
  AmbienteDb,
  AvisoDb,
  AvisoWithRelations,
  OrganismoDb,
  RecorridoWithRelations,
  VaramientoMasivoWithRelations,
} from "../../database/schemas/avisoSchema";
import {
  AccionesYResultados,
  Aviso,
  FormatoGeneral,
  Peticion,
  PeticionRecorrido,
  PeticionVaramientoMasivo,
  SoloOrganismoVivo,
} from "./Types";
import { Especie } from "../Especie/GetEspecie";
import { FormValuesMorfometriaMisticeto } from "../../forms/MorfometriaMisticeto/FormValuesMorfometriaMisticeto";
import { RegistroMorfometricoPinnipedo } from "../../forms/MorfometriaPinnipedo/RegistroMorfometricoPinnipedo";
import RegistroMorfometricoSirenio from "../../forms/MorfometriaSirenio/RegistroMorfometricoSirenio";
import RegistroMorfometricoOdontoceto from "../../forms/MorformetriaOdontoceto/RegistroMorfometricoOdontoceto";
import { formatHora, obtenerUbicacion } from "../../hooks/helpers";

// Mapeo de la taxa a su tipo de animal correspondiente en la API se reailizo con el fin de que se vea en varaweb el registro morfometrico
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
  resultSqlite: OrganismoDb
): SoloOrganismoVivo => {
  return {
    tasaDeRespiracion: resultSqlite.tasaDeRespiracion ?? null,
    pulso: resultSqlite.pulso ?? null,
    temperatura: Number(resultSqlite.temperatura) ?? null,
    antesDeVararse: resultSqlite.antesDeVararse ?? null,
    varado: resultSqlite.varado ?? null,
    reflotacion: resultSqlite.reflotacion === 1,
    despuesDeReflotar: resultSqlite.despuesDeReflotar ?? null,
    animalTransferido: resultSqlite.animalTransferido === 1,
    lugarDeRehabilitacion: resultSqlite.lugarDeRehabilitacion ?? null,
    despuesDeVararse: resultSqlite.despuesDeVararse ?? null,
  };
};
const generateAccionesYResultados = (
  resultSqlite: AccionesDb | null
): AccionesYResultados | {} => {
  if (!resultSqlite) return {};
  const tipoDeMuestras =
    typeof resultSqlite.tipoDeMuestras === "string"
      ? JSON.parse(resultSqlite.tipoDeMuestras).map((item: string) => ({
          TipoMuestra: Number(item),
        }))
      : null;
  return {
    autoridades: resultSqlite.autoridades ?? "",
    telefonoAutoridades: resultSqlite.telefonoAutoridades ?? "",
    morfometria: resultSqlite.morfometria === 1,
    necropsia: resultSqlite.necropsia === 1,
    disposicionDelCadaver: Number(resultSqlite.disposicionDelCadaver) ?? 0,
    disposicionOtro: resultSqlite.disposicionOtro ?? "",
    tipoDeMuestras,
    posibleCausaDelVaramiento: resultSqlite.posibleCausaDelVaramiento ?? "",
    participantes: resultSqlite.participantes ?? "",
    observaciones: resultSqlite.observaciones ?? "",
    posibleCausaDeMuerte: resultSqlite.posibleCausaDeMuerte ?? "",
  };
};

export const generatePeticionAvisoIndividual = async (
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
    AccionesYResultados: generateAccionesYResultados(
      resultSqlite.especimenes[0].acciones ?? ({} as AccionesDb)
    ),
    FormatoGeneral: formatoGeneral,
    SoloOrganismoVivo: generateSoloOrganismoVivo(
      resultSqlite.especimenes[0].organismo ?? ({} as OrganismoDb)
    ),
  };
};

export const generatePeticionVaramientoMasivo = async (
  varamientoMasivo: VaramientoMasivoWithRelations | null
): Promise<PeticionVaramientoMasivo | null> => {
  if (!varamientoMasivo) return null;
  const avisoRaiz = generateAviso(
    varamientoMasivo.aviso ?? ({} as AvisoDb),
    varamientoMasivo.especimenes[0]?.especie?.taxa
  );
  const formatoGeneralRaiz = generateFormatoGeneral(
    varamientoMasivo.ambiente ?? ({} as AmbienteDb),
    varamientoMasivo.observaciones ?? "",
    avisoRaiz
  );

  return {
    AvesMuertas: varamientoMasivo.avesMuertas === 1,
    AvesMuertasCantidad: Number(varamientoMasivo.avesMuertasCantidad) ?? 0,
    PecesMuertos: varamientoMasivo.pecesMuertos === 1,
    PecesMuertosCantidad: Number(varamientoMasivo.pecesMuertosCantidad) ?? 0,
    NumeroTotalDeAnimales: Number(varamientoMasivo.numeroTotalDeAnimales) ?? 0,
    SubGrupos: Number(varamientoMasivo.subGrupos) ?? 0,
    AnimalesVivos: Number(varamientoMasivo.animalesVivos) ?? 0,
    AnimalesMuertos: Number(varamientoMasivo.animalesMuertos) ?? 0,
    Observaciones: varamientoMasivo.observaciones ?? "",
    FormatoGeneral: formatoGeneralRaiz,
    Especimenes: varamientoMasivo.especimenes.map((especimen) => {
      return {
        Latitud: especimen.latitud ?? "",
        Longitud: especimen.longitud ?? "",
        EspecieId: especimen.especieId ?? 0,
        Condicion: especimen.condicion ?? 0,
        LongitudTotalRectilinea: Number(especimen.longitudTotalRectilinea),
        Peso: Number(especimen.peso),
        Sexo: especimen.sexo ?? 0,
        GrupoDeEdad: especimen.grupoDeEdad ?? 0,
        OrientacionDelEspecimen: especimen.orientacionDelEspecimen ?? "",
        Sustrato: especimen.sustrato ?? 0,
        OtroSustrato: especimen.otroSustrato ?? "",
        HeridasBala: especimen.heridasBala ?? "",
        PresenciaDeRedes: especimen.presenciaDeRedes ?? "",
        Mordidas: especimen.mordidas ?? "",
        Golpes: especimen.golpes ?? "",
        OtroTipoDeHeridas: especimen.otroTipoDeHeridas ?? "",
        FormatoGeneral: {
          Aviso: {
            cantidadDeAnimales: 1,
            TipoDeAnimal: convertirTaxaToTipoDeAnimal(
              especimen.especie?.taxa ?? 0
            ),
          },
        },
        Especie: especimen.especie as Especie,
        SoloOrganismoVivo: generateSoloOrganismoVivo(
          especimen.organismo ?? ({} as OrganismoDb)
        ),
        RegistroMorfometricoMisticeto:
          especimen.misticeto as FormValuesMorfometriaMisticeto,
        RegistroMorfometricoPinnipedo:
          especimen.pinnipedo as RegistroMorfometricoPinnipedo,
        RegistroMorfometricoSirenio:
          especimen.sirenio as RegistroMorfometricoSirenio,
        RegistroMorfometricoOdontoceto:
          especimen.odontoceto as RegistroMorfometricoOdontoceto,
        AccionesYResultados: generateAccionesYResultados(especimen.acciones),
      };
    }, null),
  };
};

// @ts-ignore
export const generateRecorrido = async (
  recorrido: RecorridoWithRelations
): Promise<PeticionRecorrido | null> => {
  if (!recorrido) return null;

  const ubicuacionInicio = await obtenerUbicacion(
    // @ts-ignore
    recorrido.ruta[0].latitude,
    // @ts-ignore
    recorrido.ruta[0].longitude
  );

  // @ts-ignore
  const ultmaCoordenada = recorrido.ruta[recorrido.ruta.length - 1];
  const ubicuacionFin = await obtenerUbicacion(
    // @ts-ignore
    ultmaCoordenada.latitude,
    // @ts-ignore
    ultmaCoordenada.longitude
  );

  const varamientosIndividuales = recorrido.avisos.map(async (aviso) => {
    if (aviso.varamientoMasivo) {
      return {} as Peticion;
    } else {
      return await generatePeticionAvisoIndividual(aviso);
    }
  });

  console.log(
    "Varamientos individuales",
    JSON.stringify(await Promise.all(varamientosIndividuales), null, 2)
  );

  const varamientosMasivos = recorrido.avisos.map(async (aviso) => {
    if (aviso.varamientoMasivo) {
      return await generatePeticionVaramientoMasivo(aviso.varamientoMasivo);
    } else {
      return {} as PeticionVaramientoMasivo;
    }
  });
  console.log(
    "Varamientos masivos",
    JSON.stringify(await Promise.all(varamientosMasivos), null, 2)
  );

  const resultadosVaramientosMasivos = (
    await Promise.all(varamientosMasivos)
  ).filter((resultado) => resultado !== null);
  const resultadosVaramientosIndividuales = (
    await Promise.all(varamientosIndividuales)
  ).filter((resultado) => resultado !== null);

  return {
    fecha: recorrido.fecha ?? "",
    horaInicio: formatHora(recorrido.horaInicio),
    horaFin: formatHora(recorrido.horaFin),
    referenciasInicio: recorrido.referenciasInicio ?? "",
    referenciasFin: recorrido.referenciasFin ?? "",
    observaciones: recorrido.observaciones ?? "",
    participantes: recorrido.participantes ?? "",
    zonaSeguimiento: recorrido.zonaSeguimiento ?? "",
    distanciaRecorrido: recorrido.distanciaRecorrido ?? 0,
    coordenadaInicio: {
      pais: ubicuacionInicio?.pais,
      estado: ubicuacionInicio?.estado,
      ciudad: ubicuacionInicio?.ciudad,
      localidad: ubicuacionInicio?.localidad,
      informacionAdicional: ubicuacionInicio?.informacionAdicional,
      // @ts-ignore
      latitud: recorrido.ruta[0].latitud ?? 0,
      // @ts-ignore
      longitud: recorrido.ruta[0].longitud ?? 0,
    },
    coordenadaFin: {
      pais: ubicuacionFin?.pais,
      estado: ubicuacionFin?.estado,
      ciudad: ubicuacionFin?.ciudad,
      localidad: ubicuacionFin?.localidad,
      informacionAdicional: ubicuacionFin?.informacionAdicional,
      // @ts-ignore
      latitud: ultmaCoordenada.latitude ?? 0,
      // @ts-ignore
      longitud: ultmaCoordenada.longitude ?? 0,
    },
    // @ts-ignore
    ruta: recorrido.ruta.map(
      (coordenada: { latitude: number; longitude: number }) => ({
        latitud: coordenada.latitude ?? 0,
        longitud: coordenada.longitude ?? 0,
      })
    ),
    reportesIndividuales:
      resultadosVaramientosIndividuales.length > 0
        ? resultadosVaramientosIndividuales
        : null,

    reportesMasivo:
      resultadosVaramientosMasivos.length > 0
        ? resultadosVaramientosMasivos
        : null,
  };
};
