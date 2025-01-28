import { useFocusEffect, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import {
  addVaramientoMasivoIfNotExists,
  getVaramientoMasivoByIdAvisoLocal,
  updateVaramientoMasivoByIdAviso,
} from "../../../database/repository/varamientoMasivoRepo";
import { FormValuesVaramientoMasivo } from "../../../forms/VaramientoMasivo/FormValuesVaramientoMasivo";
import VaramientoMasivo from "../../../forms/VaramientoMasivo/VaramientoMasivo";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";
import useVaramientoMasivoStore from "../../../hooks/globalState/useVaramientoMasivo";

const VaramientoMasivoPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const idAviso = useAvisoStore((state) => state.idAvisoSelected);
  const { setIdVaramientoMasivoSelected } = useVaramientoMasivoStore();
  const [formValues, setFormValues] = useState<FormValuesVaramientoMasivo>();
  const router = useRouter();

  const loadVaramientoMasivo = async () => {
    setIsLoading(true);
    try {
      const idVaramiento = await addVaramientoMasivoIfNotExists(idAviso);
      setIdVaramientoMasivoSelected(idVaramiento);
      console.log(
        "se ejecuto loadVaramientoMasivo idVaramiento: " +
          idVaramiento +
          " idAviso: " +
          idAviso
      );
      if (idVaramiento > 0) {
        const formValuesDbLocal =
          await getVaramientoMasivoByIdAvisoLocal(idAviso);
        console.log(
          "Valores del formulario:",
          JSON.stringify(formValuesDbLocal, null, 2)
        );

        setFormValues(formValuesDbLocal);
      }
    } catch (error) {
      console.error("Error al obtener aviso: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      loadVaramientoMasivo();
    }, [idAviso])
  );

  if (isLoading) {
    return <Text>Cargando datos...</Text>;
  }

  function handleSubmit() {
    router.push("screens/ListaEspecimen/ListaEspecimen");
  }

  if (isLoading) {
    return <Text>Cargando datos...</Text>;
  }

  return (
    <View>
      <VaramientoMasivo
        initialValues={formValues}
        onValuesChange={async (values) => {
          await updateVaramientoMasivoByIdAviso(idAviso, values);
        }}
        onSubmitData={handleSubmit}
      />
    </View>
  );
};
export default VaramientoMasivoPage;
