import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text } from "react-native";

import {
  addPinnipedoIfNotExists,
  getPinnipedoByIdEspecimenLocal,
  updatePinnipedoByIdEspecimen,
} from "../../../../../database/repository/pinipedoRepo";
import MorfometriaPinnipedo from "../../../../../forms/MorfometriaPinnipedo/MorfometriaPinnipedo";
import { RegistroMorfometricoPinnipedo } from "../../../../../forms/MorfometriaPinnipedo/RegistroMorfometricoPinnipedo";
import useAvisoStore from "../../../../../hooks/globalState/useAvisoStore";

const Pinnipedo: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const idEspecimen = useAvisoStore((state) => state.idEspecimen);
  const [formValues, setFormValues] = useState<RegistroMorfometricoPinnipedo>();

  const loadPinnipedo = async () => {
    setIsLoading(true);
    try {
      if (idEspecimen != null && idEspecimen > 0) {
        await addPinnipedoIfNotExists(idEspecimen);
        const formValuesDbLocal =
          await getPinnipedoByIdEspecimenLocal(idEspecimen);

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
      loadPinnipedo();
    }, [idEspecimen])
  );

  const router = useRouter();
  const onSubmitData = async () => {
    router.back();
  };

  if (isLoading) {
    return <Text>Cargando datos...</Text>;
  }

  return (
    <MorfometriaPinnipedo
      data={formValues}
      onValuesChange={async (values) => {
        await updatePinnipedoByIdEspecimen(idEspecimen, values);
      }}
      onSubmitData={onSubmitData}
    />
  );
};
export default Pinnipedo;
