import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import { Text } from "react-native";

import {
  addMisticetoIfNotExist,
  getMisticetoByIdEspecimenLocal,
  updateMisticetoByIdEspecimen,
} from "../../../../../database/repository/misticetoRepo";
import { FormValuesMorfometriaMisticeto } from "../../../../../forms/MorfometriaMisticeto/FormValuesMorfometriaMisticeto";
import MorfometriaMisticeto from "../../../../../forms/MorfometriaMisticeto/MorfometriaMisticeto";
import useAvisoStore from "../../../../../hooks/globalState/useAvisoStore";

const Misticeto: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const idEspecimen = useAvisoStore((state) => state.idEspecimen);
  const [formValues, setFormValues] =
    useState<FormValuesMorfometriaMisticeto>();

  const loadMisticeto = async () => {
    setIsLoading(true);

    try {
      if (idEspecimen != null && idEspecimen > 0) {
        await addMisticetoIfNotExist(idEspecimen);
        const formValuesDbLocal =
          await getMisticetoByIdEspecimenLocal(idEspecimen);
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
      loadMisticeto();
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
    <MorfometriaMisticeto
      data={formValues}
      onValuesChange={async (values) => {
        await updateMisticetoByIdEspecimen(idEspecimen, values);
      }}
      onSubmitData={onSubmitData}
    />
  );
};
export default Misticeto;
