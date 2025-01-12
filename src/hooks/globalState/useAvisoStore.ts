import { create } from "zustand";
// este hook se usa para manejar el estado del aviso seleccionado tanto en lista de avisos como su formulario
interface AvisosState {
  idSelected: number;
  idtaxaEspecie: number;
  idEspecimen: number;
  setIdEspecimen: (id: number) => void;
  setIdtaxaEspecie: (id: number) => void;
  setIdSelected: (id: number) => void;
  clearIdSelected: () => void;
}

const useAvisoStore = create<AvisosState>((set) => ({
  idSelected: 0,
  idtaxaEspecie: 0,
  idEspecimen: 0,
  setIdEspecimen: (id: number) => set({ idEspecimen: id }),
  setIdtaxaEspecie: (id: number) => set({ idtaxaEspecie: id }),
  setIdSelected: (id: number) => set({ idSelected: id }),
  clearIdSelected: () => set({ idSelected: 0 }),
}));

export default useAvisoStore;
