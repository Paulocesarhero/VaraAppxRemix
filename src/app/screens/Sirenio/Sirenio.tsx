import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import {
  addSirenioIfNotExists,
  getSirenioByIdEspecimenLocal,
  updateSirenioByIdEspecimen,
} from "../../../database/repository/sirenioRepo";
import MorfometriaSirenio from "../../../forms/MorfometriaSirenio/MorfometriaSirenio";
import RegistroMorfometricoSirenio from "../../../forms/MorfometriaSirenio/RegistroMorfometricoSirenio";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";

const Sirenio: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const idEspecimen = useAvisoStore((state) => state.idEspecimen);
  const [formValues, setFormValues] = useState<RegistroMorfometricoSirenio>();

  const loadSirenio = async () => {
    setIsLoading(true);
    try {
      if (idEspecimen > 0) {
        await addSirenioIfNotExists(idEspecimen);
        const formValuesDbLocal =
          await getSirenioByIdEspecimenLocal(idEspecimen);

        setFormValues(formValuesDbLocal);
      }
    } catch (error) {
      console.error("Error al obtener aviso: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadSirenio();
  }, [idEspecimen]);

  if (isLoading) {
    return <Text>Cargando datos...</Text>;
  }

  return (
    <MorfometriaSirenio
      data={formValues}
      onValuesChange={async (values) => {
        await updateSirenioByIdEspecimen(idEspecimen, values);
      }}
    />
  );
};
export default Sirenio;
