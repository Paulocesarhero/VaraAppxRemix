import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import {
  addOdontocetoIfNotExist,
  getOdontocetoByIdEspecimenLocal,
  updateOdontocetoByIdEspecimen,
} from "../../../database/repository/odontocetoRepo";
import MorfometriaOdontoceto from "../../../forms/MorformetriaOdontoceto/MorfometriaOdontoceto";
import RegistroMorfometricoOdontoceto from "../../../forms/MorformetriaOdontoceto/RegistroMorfometricoOdontoceto";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";

const Odontoceto: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const idEspecimen = useAvisoStore((state) => state.idEspecimen);
  const [formValues, setFormValues] =
    useState<RegistroMorfometricoOdontoceto>();

  const loadOdontoceto = async () => {
    setIsLoading(true);

    try {
      if (idEspecimen > 0) {
        const result = await addOdontocetoIfNotExist(idEspecimen);
        const formValuesDbLocal =
          await getOdontocetoByIdEspecimenLocal(idEspecimen);
        setFormValues(formValuesDbLocal);
      }
    } catch (error) {
      console.error("Error al obtener aviso: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadOdontoceto();
  }, [idEspecimen]);

  if (isLoading) {
    return <Text>Cargando datos...</Text>;
  }
  return (
    <MorfometriaOdontoceto
      data={formValues}
      onValuesChange={async (values) => {
        await updateOdontocetoByIdEspecimen(idEspecimen, values);
      }}
    />
  );
};
export default Odontoceto;
