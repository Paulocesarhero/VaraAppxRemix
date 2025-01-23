import { hasVaramientoMasivo } from "../../database/repository/varamientoMasivoRepo";
import api from "../Api";
import { Especie } from "../Especie/GetEspecie";
import RegistroMorfometricoSirenio from "../../forms/MorfometriaSirenio/RegistroMorfometricoSirenio";
import RegistroMorfometricoOdontoceto from "../../forms/MorformetriaOdontoceto/RegistroMorfometricoOdontoceto";
import { RegistroMorfometricoPinnipedo } from "../../forms/MorfometriaPinnipedo/RegistroMorfometricoPinnipedo";
import { FormValuesMorfometriaMisticeto } from "../../forms/MorfometriaMisticeto/FormValuesMorfometriaMisticeto";
import FormValuesAccionesYresultados from "../../forms/AccionesYResultados/FormValuesAccionesYresultados";
import { FormValuesSoloOrganismosVivos } from "../../forms/SoloOrganismosVivos/FormValuesSoloOrganismosVivos";
import { getAvisoBdLocal } from "../../database/repository/avisoRepo";

type Aviso = {
  Acantilado: boolean;
  FacilAcceso: boolean;
  LugarDondeSeVio: number;
  Sustrato: number;
  FechaDeAvistamiento: string;
  Observaciones: string;
  TipoDeAnimal: number;
  CondicionDeAnimal: number;
  CantidadDeAnimales: number;
  InformacionDeLocalizacion: string;
  Latitud: number;
  Longitud: number;
};
type FormatoGeneral = {
  id: number;
  TemperaturaAmbiente: number;
  PrecipitacionHoy: number;
  TemperaturaSupMar: number;
  Marea: number;
  MareaMedida: number;
  DireccionCorriente: number;
  DireccionDelViento: number;
  VelocidadDelViento: number;
  Nubosidad: number;
  Oleaje: number;
  Beaufort: number;
  PrecipitacionTormentaPrevia: number;
  AnormalidadGeomagnetica: boolean;
  MareaRoja: boolean;
  AnormalidadEnLaPesca: string;
  Observaciones: string;
  Aviso: Aviso;
};

interface Peticion {
  Latitud: string;
  Longitud: string;
  EspecieId: number;
  Especie: Especie;
  FormatoGeneral: FormatoGeneral;
  RegistroMorfometricoSirenio: RegistroMorfometricoSirenio;
  RegistroMorfometricoOdontoceto: RegistroMorfometricoOdontoceto;
  RegistroMorfometricoPinnipedo: RegistroMorfometricoPinnipedo;
  RegistroMorfometricoMisticeto: FormValuesMorfometriaMisticeto;
  AccionesYResultados: FormValuesAccionesYresultados;
  SoloOrganismoVivo: FormValuesSoloOrganismosVivos;
  Condicion: number;
  LongitudTotalRectilinea: number | null;
  Peso: number | null;
  Sexo: number;
  GrupoDeEdad: number;
  OrientacionDelEspecimen: string;
  Sustrato: number;
  OtroSustrato: string;
  HeridasBala: string;
  PresenciaDeRedes: string;
  Mordidas: string;
  Golpes: string;
  OtroTipoDeHeridas: string;
}

interface Response {
  error: boolean;
  message: any[];
  data: {
    idEspecimen: number;
    idAviso: number;
  };
}

const generatePeticion = async (idAviso: number): Promise<Peticion | null> => {
  const resultSqlite = await getAvisoBdLocal(idAviso);
  if (!resultSqlite) return null;
  const aviso: Aviso = {
    Acantilado: resultSqlite.acantilado === 1,
    FacilAcceso: resultSqlite.facilAcceso === 1,
    LugarDondeSeVio: resultSqlite.lugarDondeSeVio ?? 0,
    Sustrato: resultSqlite.sustrato ?? 0,
    FechaDeAvistamiento: resultSqlite.fechaDeAvistamiento ?? "",
    Observaciones: resultSqlite.observaciones ?? "",
    TipoDeAnimal: resultSqlite.tipoDeAnimal ?? 0,
    CondicionDeAnimal: resultSqlite.condicionDeAnimal ?? 0,
    CantidadDeAnimales: Number(resultSqlite.cantidadDeAnimales) ?? 1,
    InformacionDeLocalizacion: resultSqlite.informacionDeLocalizacion ?? "",
    Latitud: Number(resultSqlite.latitud) ?? 0,
    Longitud: Number(resultSqlite.longitud) ?? 0,
  };

  const formatoGeneral: FormatoGeneral = {
    id: resultSqlite.id,
    TemperaturaAmbiente: resultSqlite.ambiente?.temperaturaAmbiente ?? 0,
    PrecipitacionHoy: resultSqlite.ambiente?.precipitacionHoy ?? 0,
    TemperaturaSupMar: resultSqlite.ambiente?.temperaturaSupMar ?? 0,
    Marea: resultSqlite.ambiente?.marea ?? 0,
    MareaMedida: resultSqlite.ambiente?.mareaMedida ?? 0,
    DireccionCorriente: resultSqlite.ambiente?.direccionCorriente ?? 0,
    DireccionDelViento: resultSqlite.ambiente?.direccionDelViento ?? 0,
    VelocidadDelViento: resultSqlite.ambiente?.velocidadDelViento ?? 0,
    Nubosidad: resultSqlite.ambiente?.nubosidad ?? 0,
    Oleaje: resultSqlite.ambiente?.oleaje ?? 0,
    Beaufort: resultSqlite.ambiente?.beaufort ?? 0,
    PrecipitacionTormentaPrevia:
      resultSqlite.ambiente?.precipitacionTormentaPrevia ?? 0,
    AnormalidadGeomagnetica:
      resultSqlite.ambiente?.anormalidadGeomagnetica === 1,
    MareaRoja: !!resultSqlite.ambiente?.mareaRoja,
    AnormalidadEnLaPesca: resultSqlite.ambiente?.anormalidadEnLaPesca ?? "",
    Observaciones: resultSqlite.observaciones ?? "",
    Aviso: aviso,
  };
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
    AccionesYResultados:
      (resultSqlite.especimenes[0]
        ?.acciones as unknown as FormValuesAccionesYresultados) ??
      ({} as FormValuesAccionesYresultados),
    FormatoGeneral: formatoGeneral,
    SoloOrganismoVivo:
      (resultSqlite.especimenes[0]
        ?.organismo as unknown as FormValuesSoloOrganismosVivos) ??
      ({} as FormValuesSoloOrganismosVivos),
  };
};

export const saveAviso = async (idAviso: number, token: string) => {
  const hasVaramientoMasivoLocal = await hasVaramientoMasivo(idAviso);
  if (!hasVaramientoMasivoLocal) {
    const peticion = await generatePeticion(idAviso);
    console.log("Peticion generada:", JSON.stringify(peticion, null, 2));
    if (peticion) {
      try {
        const response: Response = await api.post(
          `api/Aviso/ReportarVaramientoIndividual`,
          peticion,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response;
      } catch (error) {
        console.error(
          "Error al reportar varamiento individual:",
          // @ts-ignore
          error.response.data
        );
        throw error; // Lanzar el error para que sea manejado por quien invoque la función
      }
    }
  } else {
    console.log("Ya existe un varamiento masivo para este aviso");
  }
};
export const saveFotoAviso = async (idAviso: number, token: string) => {};
