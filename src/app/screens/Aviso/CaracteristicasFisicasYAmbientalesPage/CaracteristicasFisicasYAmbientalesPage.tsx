import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import {
  addAmbienteIfNotExist,
  getAmbienteByIdAvisoLocalDb,
} from "../../../../database/repository/ambienteRepo";
import CaracteristicasFisicasYAmbientales from "../../../../forms/CaracteristicasFisicasYAmbientales/CaracteristicasFisicasYAmbientales";
import { FormValuesCaracteristicasFisicasYAmbientales } from "../../../../forms/CaracteristicasFisicasYAmbientales/FormValuesCaracteristicasFisicasYAmbientales";
import useAvisoStore from "../../../../hooks/globalState/useAvisoStore";

const CaracteristicasFisicasYAmbientalesPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const idSelected = useAvisoStore((state) => state.idAvisoSelected);
  const [formValues, setFormValues] =
    useState<FormValuesCaracteristicasFisicasYAmbientales>();
  const router = useRouter();

  const loadAmbiente = async () => {
    setIsLoading(true);
    try {
      if (idSelected > 0) {
        const result = await addAmbienteIfNotExist(idSelected);
        const formValuesDbLocal = await getAmbienteByIdAvisoLocalDb(idSelected);
        setFormValues(formValuesDbLocal);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAmbiente();
  }, [idSelected]);
  const onSubmitData = async (data: any) => {
    router.push("screens/MenuRegistrarAviso/MenuRegistrarAviso");
  };

  if (isLoading) {
    return <Text>Cargando datos...</Text>;
  }

  return (
    <View>
      <CaracteristicasFisicasYAmbientales
        initalValues={formValues}
        onSubmitData={onSubmitData}
      />
    </View>
  );
};
export default CaracteristicasFisicasYAmbientalesPage;
