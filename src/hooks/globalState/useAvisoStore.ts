import { create } from "zustand";

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
