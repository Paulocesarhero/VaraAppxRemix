import api from "./Api";

export interface Aviso {
  id: number;
  fechaDeAvistamiento?: string;
  cantidadDeAnimales?: string;
  fotografia: string | null;
  isModificable?: boolean;
}

export const getAvisos = async (barrerToken: string): Promise<Aviso[]> => {
  try {
    const response = await api.get<Aviso[]>("api/Aviso/Avisos", {
      headers: {
        Authorization: `Bearer ${barrerToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("No se pudieron obtener los avisos.");
  }
};
