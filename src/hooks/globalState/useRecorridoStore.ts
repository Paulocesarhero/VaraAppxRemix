import { create } from "zustand";

interface RecorridoState {
  idRecorridoSelected: number | null;
  setIdRecorridoSelected: (id: number) => void;
  clearIdRecorridoSelected: () => void;
}
const useRecorridoStore = create<RecorridoState>((set) => ({
  idRecorridoSelected: null,
  setIdRecorridoSelected: (id: number) => {
    set({ idRecorridoSelected: id });
  },
  clearIdRecorridoSelected: () => {
    set({ idRecorridoSelected: null });
  },
}));

export default useRecorridoStore;
