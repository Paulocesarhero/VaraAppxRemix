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
  idEspecimen: 0,
  setIdEspecimen: (id: number) => {
    console.log("idEspecimen actualizado:", id); // Depuración
    set({ idEspecimen: id });
  },
  setIdtaxaEspecie: (id: number) => {
    console.log("idtaxaEspecie actualizado:", id); // Depuración
    set({ idtaxaEspecie: id });
  },
  setIdAvisoSelected: (id: number) => {
    console.log("idAvisoSelected actualizado:", id); // Depuración
    set({ idAvisoSelected: id });
  },
  clearIdAvisoSelected: () => {
    console.log("idAvisoSelected limpiado"); // Depuración
    set({ idAvisoSelected: 0 });
  },
  clearIdEspecimen: () => {
    console.log("idEspecimen limpiado"); // Depuración
    set({ idEspecimen: null });
  },
}));

export default useAvisoStore;
