import { create } from "zustand";

interface FormValuesAccionesYresultados {
  Autoridades?: string;
  TelefonoAutoridades?: string;
  Morfometria: boolean;
  Necropsia: boolean;
  DisposicionDelCadaver?: number;
  DisposicionOtro?: string;
  PosibleCausaDelVaramiento?: string;
  PosibleCausaDeMuerte?: string;
  Participantes?: string;
  Observaciones?: string;
  TipoDeMuestras?: TipoMuestra[];
}

type TipoMuestra = {
  TipoMuestra: number;
};

interface FormStore {
  formValues: FormValuesAccionesYresultados;
  setFormValues: (values: Partial<FormValuesAccionesYresultados>) => void;
  resetForm: () => void;
}

const useFormStore = create<FormStore>((set) => ({
  formValues: {
    Autoridades: "",
    TelefonoAutoridades: "",
    Morfometria: false,
    Necropsia: false,
    DisposicionDelCadaver: 0,
    DisposicionOtro: "",
    PosibleCausaDelVaramiento: "",
    PosibleCausaDeMuerte: "",
    Participantes: "",
    Observaciones: "",
    TipoDeMuestras: [], // Inicialización como arreglo vacío
  },

  setFormValues: (values) =>
    set((state) => {
      const newFormValues = { ...state.formValues, ...values };

      if (JSON.stringify(state.formValues) === JSON.stringify(newFormValues)) {
        return state; // No actualiza si no hay cambios
      }

      return { formValues: newFormValues };
    }),
  resetForm: () =>
    set(() => ({
      formValues: {
        Autoridades: "",
        TelefonoAutoridades: "",
        Morfometria: false,
        Necropsia: false,
        DisposicionDelCadaver: 0,
        DisposicionOtro: "",
        PosibleCausaDelVaramiento: "",
        PosibleCausaDeMuerte: "",
        Participantes: "",
        Observaciones: "",
        TipoDeMuestras: [], // Inicialización al reiniciar
      },
    })),
}));

export default useFormStore;
