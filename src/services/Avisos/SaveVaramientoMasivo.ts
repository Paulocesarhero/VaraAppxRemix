import { getAllDataVaramientoMasivo } from "../../database/repository/varamientoMasivoRepo";
import { PeticionVaramientoMasivo } from "./Types";
import { VaramientoMasivoWithRelations } from "../../database/schemas/avisoSchema";

export const saveVaramientoMasivo = async (idAviso: number) => {
  try {
    const varameintoMasivvoLocalDb = await getAllDataVaramientoMasivo(idAviso);
  } catch (error) {
    console.error("Error al obtener el varamiento masivo:", error);
    throw error;
  }
};
