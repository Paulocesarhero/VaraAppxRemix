import { getAllDataVaramientoMasivo } from "../../database/repository/varamientoMasivoRepo";
import { PeticionVaramientoMasivo } from "./Types";
import { VaramientoMasivoWithRelations } from "../../database/schemas/avisoSchema";
import api from "../Api";
import { generatePeticionVaramientoMasivo } from "./adapter";

export const saveVaramientoMasivo = async (idAviso: number, token: string) => {
  try {
    const varameintoMasivvoLocalDb = await getAllDataVaramientoMasivo(idAviso);
    console.log(
      "varameintoMasivvoLocalDb",
      JSON.stringify(varameintoMasivvoLocalDb, null, 2)
    );
    const peticion = await generatePeticionVaramientoMasivo(
      varameintoMasivvoLocalDb
    );
    console.log("Peticion generada:", JSON.stringify(peticion, null, 2));
    if (!peticion) return;
    const response = await addVaramientoMasivo(token, peticion);
    return response;
  } catch (error) {
    console.error("Error al obtener el varamiento masivo:", error);
    throw error;
  }
};

export const addVaramientoMasivo = async (
  barrerToken: string,
  data: Partial<PeticionVaramientoMasivo>
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
    return response.data;
  } catch (error) {
    throw error;
  }
};
