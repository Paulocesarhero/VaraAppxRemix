import { create } from "zustand";
// este hook se usa para manejar el estado del aviso seleccionado tanto en lista de avisos como su formulario
interface AvisosState {
  idSelected: number;
  setIdSelected: (id: number) => void;
  clearIdSelected: () => void;
}

const useAvisoStore = create<AvisosState>((set) => ({
  idSelected: 0,
  setIdSelected: (id: number) => set({ idSelected: id }),
  clearIdSelected: () => set({ idSelected: 0 }),
}));

export default useAvisoStore;
