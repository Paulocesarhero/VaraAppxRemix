import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ColorsPalete } from "../../../constants/COLORS";
import {
  addAccionesIfNotExists,
  getAccionesByIdEspecimenLocal,
  NewAcciones,
  updateAccionesByIdEspecimen,
} from "../../../database/repository/AccionesRepo";
import { updateOrganismoByIdEspecimen } from "../../../database/repository/SoloOrganismosVivosRepo";
import AccionesYResultadosForm from "../../../forms/AccionesYResultados/AccionesYResultados";
import FormValuesAccionesYresultados from "../../../forms/AccionesYResultados/FormValuesAccionesYresultados";
import { FormValuesSoloOrganismosVivos } from "../../../forms/SoloOrganismosVivos/FormValuesSoloOrganismosVivos";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";

const Recommendations: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const idSelected = useAvisoStore((state) => state.idAvisoSelected);
  const [formValues, setFormValues] = useState<FormValuesAccionesYresultados>();
  const idEspecimen = useAvisoStore((state) => state.idEspecimen);
  const router = useRouter();
  const loadAcciones = async () => {
    setIsLoading(true);
    try {
      if (idSelected > 0) {
        const result = await addAccionesIfNotExists(idSelected);
        const formValuesDbLocal =
          await getAccionesByIdEspecimenLocal(idSelected);
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
  }, [idSelected]);
  const handleValuesChange = async (
    values: Partial<FormValuesAccionesYresultados>
  ) => {
    await updateAccionesByIdEspecimen(idEspecimen, values);
  };

  if (isLoading) {
    return <Text>Cargando datos...</Text>;
  }
  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: ColorsPalete.light }}
    >
      <AccionesYResultadosForm
        onSubmitData={(data: FormValuesAccionesYresultados) => {
          console.log("Datos enviados:", data);
        }}
        initialValues={formValues}
        onValuesChange={handleValuesChange}
      />
    </SafeAreaView>
  );
};
export default Recommendations;
