import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  addAccionesIfNotExists,
  getAccionesByIdEspecimenLocal,
  updateAccionesByIdEspecimen,
} from "../../../../../database/repository/AccionesRepo";
import AccionesYResultadosForm from "../../../../../forms/AccionesYResultados/AccionesYResultados";
import FormValuesAccionesYresultados from "../../../../../forms/AccionesYResultados/FormValuesAccionesYresultados";
import useAvisoStore from "../../../../../hooks/globalState/useAvisoStore";

const Recommendations: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formValues, setFormValues] = useState<FormValuesAccionesYresultados>();
  const idEspecimen = useAvisoStore((state) => state.idEspecimen);
  const loadAcciones = async () => {
    setIsLoading(true);
    try {
      if (idEspecimen != null && idEspecimen > 0) {
        await addAccionesIfNotExists(idEspecimen);
        const formValuesDbLocal =
          await getAccionesByIdEspecimenLocal(idEspecimen);
        setFormValues(formValuesDbLocal);
      }
    } catch (error) {
      console.error("Error al obtener aviso: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadAcciones();
  }, [idEspecimen]);
  const handleValuesChange = async (
    values: Partial<FormValuesAccionesYresultados>
  ) => {
    await updateAccionesByIdEspecimen(idEspecimen, values);
  };

  if (isLoading) {
    return <Text>Cargando datos...</Text>;
  }
  return (
    <View style={{ flex: 1, marginHorizontal: 5 }}>
      <AccionesYResultadosForm
        onSubmitData={(data: FormValuesAccionesYresultados) => {
          console.log("Datos enviados:", data);
        }}
        initialValues={formValues}
        onValuesChange={handleValuesChange}
      />
    </View>
  );
};
export default Recommendations;
