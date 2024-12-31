import AsyncStorage from "@react-native-async-storage/async-storage";
import { AvisoValues } from "varaapplib/components/AvisoForm/types";
import { create } from "zustand";

import { FormValuesCaracteristicasFisicasYAmbientales } from "../../forms/CaracteristicasFisicasYAmbientales/FormValuesCaracteristicasFisicasYAmbientales";

interface Formularios {
  Aviso: AvisoValues;
  caracteristicasFisicasYAmbientales: FormValuesCaracteristicasFisicasYAmbientales;
}

interface Avisos {
  mySymbolDict: {
    [key: string]: {
      formulario: string;
      data: Formularios;
    };
  };
  actions: {
    setFormulario: (grupoId: string, formulario: string, data: any) => void;
    loadFormularios: () => void;
    removeFormulario: (grupoId: string) => void;
    updateFormulario: (grupoId: string, formulario: string, data: any) => void;
  };
}

const useAvisoStore = create<Avisos>((set) => ({
  mySymbolDict: {},
  actions: {
    setFormulario: async (grupoId: string, formulario: string, data: any) => {
      try {
        const existingData = await AsyncStorage.getItem(grupoId);
        const parsedData = existingData ? JSON.parse(existingData) : {};

        const updatedData = {
          ...parsedData,
          [formulario]: {
            ...parsedData[formulario],
            ...data,
          },
        };

        await AsyncStorage.setItem(grupoId, JSON.stringify(updatedData));

        set((state) => ({
          mySymbolDict: {
            ...state.mySymbolDict,
            [grupoId]: updatedData,
          },
        }));
      } catch (error) {
        console.error(`Error al guardar el formulario ${formulario}:`, error);
      }
    },

    loadFormularios: async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const formularioPromises = keys.map(async (key) => {
          const formulario = await AsyncStorage.getItem(key);
          if (formulario) {
            return { key, data: JSON.parse(formulario) };
          }
          return undefined;
        });

        const formularios = (await Promise.all(formularioPromises)).filter(
          (item) => item !== undefined
        ) as { key: string; data: any }[];

        const mySymbolDict: {
          [grupoId: string]: { formulario: string; data: any };
        } = {};

        formularios.forEach(({ key, data }) => {
          if (key) {
            mySymbolDict[key] = { formulario: "Formulario_" + key, data };
          }
        });

        set({ mySymbolDict });
      } catch (error) {
        console.error("Error al cargar los formularios:", error);
      }
    },

    removeFormulario: async (grupoId: string) => {
      try {
        await AsyncStorage.removeItem(grupoId);

        set((state) => {
          const newSymbolDict = { ...state.mySymbolDict };
          delete newSymbolDict[grupoId];
          return { mySymbolDict: newSymbolDict };
        });
      } catch (error) {
        console.error("Error al eliminar el grupo de formularios:", error);
      }
    },

    updateFormulario: async (
      grupoId: string,
      formulario: string,
      data: any
    ) => {
      try {
        await AsyncStorage.setItem(grupoId, JSON.stringify(data));

        set((state) => ({
          mySymbolDict: {
            ...state.mySymbolDict,
            [grupoId]: {
              ...state.mySymbolDict[grupoId],
              [formulario]: data,
            },
          },
        }));
      } catch (error) {
        console.error(
          `Error al actualizar el formulario ${formulario}:`,
          error
        );
      }
    },
  },
}));

export default useAvisoStore;
