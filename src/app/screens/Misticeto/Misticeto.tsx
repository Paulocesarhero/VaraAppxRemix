import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import {
  addEspecimenIfNotExist,
  getEspecimenByIdAvisoLocal,
} from "../../../database/repository/especimenRepo";
import {
  addMisticetoIfNotExist,
  getMisticetoByIdEspecimenLocal,
  updateMisticetoByIdEspecimen,
} from "../../../database/repository/misticetoRepo";
import { FormValuesEspecimen } from "../../../forms/Especimen/FormValuesEspecimen";
import { FormValuesMorfometriaMisticeto } from "../../../forms/MorfometriaMisticeto/FormValuesMorfometriaMisticeto";
import MorfometriaMisticeto from "../../../forms/MorfometriaMisticeto/MorfometriaMisticeto";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";

const Misticeto: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const idEspecimen = useAvisoStore((state) => state.idEspecimen);
  const [formValues, setFormValues] =
    useState<FormValuesMorfometriaMisticeto>();

  const loadMisticeto = async () => {
    setIsLoading(true);

    try {
      if (idEspecimen > 0) {
        const result = await addMisticetoIfNotExist(idEspecimen);
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

  useEffect(() => {
    loadMisticeto();
  }, [idEspecimen]);

  if (isLoading) {
    return <Text>Cargando datos...</Text>;
  }

  return (
    <MorfometriaMisticeto
      data={formValues}
      onValuesChange={async (values) => {
        await updateMisticetoByIdEspecimen(idEspecimen, values);
      }}
    />
  );
};
export default Misticeto;
