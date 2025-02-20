import api from "../Api";

export interface AvisoApiGet {
  id: number | string;
  fechaDeAvistamiento?: string;
  cantidadDeAnimales?: string;
  fotografia: string | null;
  isModificable?: boolean;
}

export const getAvisosVaraWeb = async (
  barrerToken: string | null
): Promise<AvisoApiGet[]> => {
  if (!barrerToken) {
    return [];
  }
  try {
    const response = await api.get<AvisoApiGet[]>("api/Aviso/Avisos", {
      headers: {
        Authorization: `Bearer ${barrerToken}`,
      },
    });

    return response.data;
  } catch {
    throw new Error("No se pudieron obtener los avisos.");
  }
};
