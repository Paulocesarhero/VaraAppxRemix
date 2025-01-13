import { useHeaderHeight } from "@react-navigation/elements";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import React, { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";

import {
  addOrganismoIfNotExists,
  getOrganismoByIdEspecimenLocal,
  updateOrganismoByIdEspecimen,
} from "../../../database/repository/SoloOrganismosVivosRepo";
import { FormValuesSoloOrganismosVivos } from "../../../forms/SoloOrganismosVivos/FormValuesSoloOrganismosVivos";
import SoloOrganismosVivos from "../../../forms/SoloOrganismosVivos/SoloOrganismosVivos";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";

const SoloOrganismosVivosPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const idEspecimen = useAvisoStore((state) => state.idEspecimen);
  const [formValues, setFormValues] = useState<FormValuesSoloOrganismosVivos>();
  const router = useExpoRouter();

  const loadOrganismo = async () => {
    setIsLoading(true);
    try {
      if (idEspecimen > 0) {
        await addOrganismoIfNotExists(idEspecimen);
        const formValuesDbLocal =
          (await getOrganismoByIdEspecimenLocal(idEspecimen)) || undefined;
        setFormValues(formValuesDbLocal);
      }
    } catch (error) {
      console.error("Error al obtener aviso: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrganismo();
  }, [idEspecimen]);

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
  const headerHeight = useHeaderHeight();
  const onSubmitData = async () => {
    router.navigate("screens/AccionesYResultadosPage/AccionesYResultadosPage");
  };

  if (isLoading) {
    return <Text>Cargando datos...</Text>;
  }

  return (
    <View style={{ paddingTop: Platform.OS === "android" ? 0 : headerHeight }}>
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
