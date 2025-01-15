import { create } from "zustand";

interface VaramientoMasivoState {
  idVaramientoMasivoSelected: number | null;
  setIdVaramientoMasivoSelected: (id: number) => void;
  clearIdVaramientoMasivoSelected: () => void;
}

const useVaramientoMasivoStore = create<VaramientoMasivoState>((set) => ({
  idVaramientoMasivoSelected: null,
  setIdVaramientoMasivoSelected: (id: number) =>
    set({ idVaramientoMasivoSelected: id }),
  clearIdVaramientoMasivoSelected: () =>
    set({ idVaramientoMasivoSelected: null }),
}));
export default useVaramientoMasivoStore;
