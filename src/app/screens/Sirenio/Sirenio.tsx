import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text } from "react-native";

import {
  addSirenioIfNotExists,
  getSirenioByIdEspecimenLocal,
  updateSirenioByIdEspecimen,
} from "../../../database/repository/sirenioRepo";
import MorfometriaSirenio from "../../../forms/MorfometriaSirenio/MorfometriaSirenio";
import RegistroMorfometricoSirenio from "../../../forms/MorfometriaSirenio/RegistroMorfometricoSirenio";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";

const Sirenio: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const idEspecimen = useAvisoStore((state) => state.idEspecimen);
  const [formValues, setFormValues] = useState<RegistroMorfometricoSirenio>();

  const loadSirenio = async () => {
    setIsLoading(true);
    try {
      if (idEspecimen != null && idEspecimen > 0) {
        await addSirenioIfNotExists(idEspecimen);
        const formValuesDbLocal =
          await getSirenioByIdEspecimenLocal(idEspecimen);

        setFormValues(formValuesDbLocal);
      }
    } catch {
      Alert.alert("Error", "Ocurrió un error inesperado");
    } finally {
      setIsLoading(false);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      loadSirenio();
    }, [idEspecimen])
  );
  const router = useRouter();
  const onSubmitData = async () => {
    router.navigate("screens/SoloOrganismosVivosPage/SoloOrganismosVivosPage");
  };

  if (isLoading) {
    return <Text>Cargando datos...</Text>;
  }

  return (
    <MorfometriaSirenio
      onSubmitData={onSubmitData}
      data={formValues}
      onValuesChange={async (values) => {
        await updateSirenioByIdEspecimen(idEspecimen, values);
      }}
    />
  );
};
export default Sirenio;
