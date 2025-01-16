import { create } from "zustand";
// este hook se usa para manejar el estado del aviso seleccionado tanto en lista de avisos como su formulario
interface AvisosState {
  idAvisoSelected: number;
  idtaxaEspecie: number;
  idEspecimen: number | null;
  setIdEspecimen: (id: number) => void;
  setIdtaxaEspecie: (id: number) => void;
  setIdAvisoSelected: (id: number) => void;
  clearIdAvisoSelected: () => void;
  clearIdEspecimen: () => void;
}

const useAvisoStore = create<AvisosState>((set) => ({
  idAvisoSelected: 0,
  idtaxaEspecie: 0,
  idEspecimen: null,
  setIdEspecimen: (id: number) => set({ idEspecimen: id }),
  setIdtaxaEspecie: (id: number) => set({ idtaxaEspecie: id }),
  setIdAvisoSelected: (id: number) => set({ idAvisoSelected: id }),
  clearIdAvisoSelected: () => set({ idAvisoSelected: 0 }),
  clearIdEspecimen: () => set({ idEspecimen: null }),
}));

export default useAvisoStore;
