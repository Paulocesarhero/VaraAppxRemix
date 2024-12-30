import { Especie } from "../../services/Especie/GetEspecie";

export interface FormValuesEspecimen {
  Latitud: string;
  Longitud: string;
  EspecieId: number;
  Especie: Especie;
  condicion: number;
  longitudTotalRectilinea: string;
  peso: string;
  sexo: number;
  grupoDeEdad: number;
  orientacionDelEspecimen: string;
  sustrato: number;
  otroSustrato: string;
  heridasBala: string;
  heridasBalaFoto: string;
  presenciaDeRedes: string;
  presenciaDeRedesFoto: string;
  mordidas: string;
  mordidasFoto: string;
  golpes: string;
  golpesFoto: string;
  otroTipoDeHeridas: string;
  otroTipoDeHeridasFoto: string;
}
