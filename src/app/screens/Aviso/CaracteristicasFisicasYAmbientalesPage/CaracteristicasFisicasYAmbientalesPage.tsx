import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import {
  addAmbienteIfNotExist,
  getAllAmbiente,
  getAmbienteByIdAvisoLocalDb,
} from "../../../../database/repository/ambienteRepo";
import { getAvisoByIdLocalDb } from "../../../../database/repository/avisoRepo";
import CaracteristicasFisicasYAmbientales from "../../../../forms/CaracteristicasFisicasYAmbientales/CaracteristicasFisicasYAmbientales";
import { FormValuesCaracteristicasFisicasYAmbientales } from "../../../../forms/CaracteristicasFisicasYAmbientales/FormValuesCaracteristicasFisicasYAmbientales";
import useAvisoStore from "../../../../hooks/globalState/useAvisoStore";

const CaracteristicasFisicasYAmbientalesPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const idSelected = useAvisoStore((state) => state.idSelected);
  const [formValues, setFormValues] =
    useState<FormValuesCaracteristicasFisicasYAmbientales>();

  const loadAmbiente = async () => {
    setIsLoading(true);
    try {
      if (idSelected > 0) {
        const result = await addAmbienteIfNotExist(idSelected);
        const formValuesDbLocal = await getAmbienteByIdAvisoLocalDb(idSelected);
        setFormValues(formValuesDbLocal);
      }
    } catch (error) {
      console.error("Error al obtener aviso: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAmbiente();
  }, [idSelected]);
  const onSubmitData = async (data: any) => {};

  if (isLoading) {
    return <Text>Cargando datos...</Text>;
  }

  return (
    <View>
      <CaracteristicasFisicasYAmbientales
        initalValues={formValues}
        onSubmitData={onSubmitData}
        loading={false}
        setLoading={function (loading: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />
    </View>
  );
};
export default CaracteristicasFisicasYAmbientalesPage;
