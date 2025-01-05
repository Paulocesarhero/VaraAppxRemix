// useListAvisosStore.ts
import { create } from "zustand";

import { getAvisosBdLocal } from "../../database/repository/avisoRepo";
import {
  AvisoApiGet,
  getAvisosVaraWeb,
} from "../../services/Avisos/GetAvisosVaraWeb";

interface ListAvisosStore {
  avisos: AvisoApiGet[];
  setAvisos: (newAvisos: AvisoApiGet[]) => void;
  addAvisoStore: (newAviso: AvisoApiGet) => void;
  deleteAviso: (id: string | number) => void;
  addAvisos: (newAvisos: AvisoApiGet[]) => void;
  updateAviso: (updatedAviso: AvisoApiGet) => void;
  fetchAvisosLocales: () => Promise<void>;
  fetchAvisosRemotos: (token: string) => Promise<void>;
}

const useListAvisoStore = create<ListAvisosStore>((set) => ({
  avisos: [],
  setAvisos: (newAvisos) => set({ avisos: newAvisos }),
  addAvisoStore: (newAviso) =>
    set((state) => ({ avisos: [...state.avisos, newAviso] })),
  deleteAviso: (id) =>
    set((state) => ({
      avisos: state.avisos.filter((aviso) => aviso.id !== id),
    })),
  addAvisos: (newAvisos) =>
    set((state) => ({ avisos: [...state.avisos, ...newAvisos] })),
  updateAviso: (updatedAviso) =>
    set((state) => ({
      avisos: state.avisos.map((aviso) =>
        aviso.id === updatedAviso.id ? { ...aviso, ...updatedAviso } : aviso
      ),
    })),

  fetchAvisosLocales: async () => {
    try {
      const avisosBdLocal = await getAvisosBdLocal();
      const avisosTransformados: AvisoApiGet[] = avisosBdLocal.map((aviso) => ({
        isModificable: true,
        id: aviso.id,
        fechaDeAvistamiento: aviso.FechaDeAvistamiento,
        cantidadDeAnimales: aviso.CantidadDeAnimales,
        fotografia: aviso.Fotografia,
      }));
      set({ avisos: avisosTransformados });
    } catch (error) {
      console.error(
        "Error al obtener avisos desde la base de datos local:",
        error
      );
    }
  },

  fetchAvisosRemotos: async (token) => {
    try {
      const avisosApi = await getAvisosVaraWeb(token);
      const avisosTransformados: AvisoApiGet[] = avisosApi.map((aviso) => ({
        fechaDeAvistamiento: aviso.fechaDeAvistamiento,
        cantidadDeAnimales: aviso.cantidadDeAnimales,
        fotografia: aviso.fotografia,
        id: `${Date.now()}_${Math.random()}`,
        isModificable: false,
      }));
      set((state) => ({
        avisos: [...state.avisos, ...avisosTransformados],
      }));
    } catch (error) {
      console.error("Error al obtener avisos desde la API:", error);
    }
  },
}));

export default useListAvisoStore;
