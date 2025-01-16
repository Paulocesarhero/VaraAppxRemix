import { AvisoValues } from "varaapplib/components/AvisoForm/types";

import FormValuesAccionesYresultados from "../../forms/AccionesYResultados/FormValuesAccionesYresultados";
import { FormValuesCaracteristicasFisicasYAmbientales } from "../../forms/CaracteristicasFisicasYAmbientales/FormValuesCaracteristicasFisicasYAmbientales";
import { FormValuesMorfometriaMisticeto } from "../../forms/MorfometriaMisticeto/FormValuesMorfometriaMisticeto";
import { RegistroMorfometricoPinnipedo } from "../../forms/MorfometriaPinnipedo/RegistroMorfometricoPinnipedo";
import RegistroMorfometricoSirenio from "../../forms/MorfometriaSirenio/RegistroMorfometricoSirenio";
import RegistroMorfometricoOdontoceto from "../../forms/MorformetriaOdontoceto/RegistroMorfometricoOdontoceto";
import { FormValuesSoloOrganismosVivos } from "../../forms/SoloOrganismosVivos/FormValuesSoloOrganismosVivos";
import { FormValuesVaramientoMasivo } from "../../forms/VaramientoMasivo/FormValuesVaramientoMasivo";
import api from "../Api";

interface VaramientoMasivo extends FormValuesVaramientoMasivo {
  FormatoGeneral: FormatoGeneral;
  Especimenes: Especimen[];
}

interface FormatoGeneral extends FormValuesCaracteristicasFisicasYAmbientales {
  Aviso: AvisoValues;
}

interface Especie {
  Id: number;
  Nombre: string;
  NombreLatin: string;
  Taxa: number;
  Familia: number;
}

interface Especimen {
  especieId: number;
  Especie: Especie;
  SoloOrganismosVivos: FormValuesSoloOrganismosVivos;
  RegistroMorfometricoMisticeto?: FormValuesMorfometriaMisticeto;
  RegistroMorfometricoPinnipedo?: RegistroMorfometricoPinnipedo;
  RegistroMorfometricoSirenio?: RegistroMorfometricoSirenio;
  RegistroMorfometricoOdontoceto?: RegistroMorfometricoOdontoceto;
  AccionesYResultados?: FormValuesAccionesYresultados;
  FormatoGeneral: FormatoGeneral;
}

export const addVaramientoMasivo = async (
  barrerToken: string,
  data: any
): Promise<any> => {
  try {
    const response = await api.post(
      "api/Aviso/ReportarVaramientoMasivo",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${barrerToken}`,
        },
      }
    );
    return response.data; // Retorna solo los datos de la respuesta
  } catch (error) {
    console.error("Error al reportar varamiento masivo:", error);
    throw error; // Lanzar el error para que sea manejado por quien invoque la función
  }
};
