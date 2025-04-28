import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

import {
  addOrganismoIfNotExists,
  getOrganismoByIdEspecimenLocal,
  updateOrganismoByIdEspecimen,
} from "../../../../../database/repository/SoloOrganismosVivosRepo";
import { FormValuesSoloOrganismosVivos } from "../../../../../forms/SoloOrganismosVivos/FormValuesSoloOrganismosVivos";
import SoloOrganismosVivos from "../../../../../forms/SoloOrganismosVivos/SoloOrganismosVivos";
import useAvisoStore from "../../../../../hooks/globalState/useAvisoStore";
import { useFocusEffect, useRouter } from "expo-router";

const SoloOrganismosVivosPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const idEspecimen = useAvisoStore((state) => state.idEspecimen);
  const [formValues, setFormValues] = useState<FormValuesSoloOrganismosVivos>();
  const router = useRouter();

  const loadOrganismo = async () => {
    setIsLoading(true);
    try {
      if (idEspecimen != null && idEspecimen > 0) {
        await addOrganismoIfNotExists(idEspecimen);
        const formValuesDbLocal =
          (await getOrganismoByIdEspecimenLocal(idEspecimen)) || undefined;
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
      loadOrganismo();
    }, [idEspecimen])
  );

  const handleValuesChange = async (
    values: Partial<FormValuesSoloOrganismosVivos>
  ) => {
    const updatedValues = {
      ...values,
      reflotacion: values.reflotacion ? 1 : 0,
      animalTransferido: values.animalTransferido ? 1 : 0,
    };
    await updateOrganismoByIdEspecimen(
      idEspecimen,
      updatedValues as unknown as FormValuesSoloOrganismosVivos
    );
  };
  const onSubmitData = async () => {
    router.back();
  };

  if (isLoading) {
    return <Text>Cargando datos...</Text>;
  }

  return (
    <View style={{ flex: 1, marginHorizontal: 5 }}>
      <SoloOrganismosVivos
        onSubmitData={onSubmitData}
        isDisabled={false}
        initialValues={formValues || ({} as FormValuesSoloOrganismosVivos)}
        onValuesChange={handleValuesChange}
      />
    </View>
  );
};

export default SoloOrganismosVivosPage;
