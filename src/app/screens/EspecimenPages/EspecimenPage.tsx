import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import {
  addEspecimenIfNotExist,
  getEspecimenByIdAvisoLocal,
  updateEspecimenByIdAviso,
} from "../../../database/repository/especimenRepo";
import Especimen from "../../../forms/Especimen/Especimen";
import { FormValuesEspecimen } from "../../../forms/Especimen/FormValuesEspecimen";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";

const EspecimenPage: React.FC = () => {
  const idtaxaEspecie = useAvisoStore((state) => state.idtaxaEspecie);
  const idSelected = useAvisoStore((state) => state.idSelected);
  const idEspecimen = useAvisoStore((state) => state.idEspecimen);
  const { setIdEspecimen } = useAvisoStore();
  const [formValues, setFormValues] = useState<FormValuesEspecimen>();
  const router = useRouter();
  const MISTICETO = 0;
  const PINNIPEDO = 1;
  const ODONTOCETO = 2;
  const SIRENIO = 3;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadEspecimen = async () => {
    setIsLoading(true);
    try {
      if (idSelected > 0) {
        const result = await addEspecimenIfNotExist(idSelected);
        setIdEspecimen(result);
        const formValuesDbLocal = await getEspecimenByIdAvisoLocal(idSelected);
        setFormValues(formValuesDbLocal);
      }
    } catch (error) {
      console.error("Error al obtener aviso: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitData = (data: FormValuesEspecimen) => {
    switch (idtaxaEspecie) {
      case MISTICETO:
        router.navigate("screens/Misticeto/Misticeto");
        break;
      case PINNIPEDO:
        router.navigate("screens/Pinnipedo/Pinnipedo");
        break;
      case ODONTOCETO:
        router.navigate("screens/Odontoceto/Odontoceto");
        break;
      case SIRENIO:
        router.navigate("screens/Sirenio/Sirenio");
        break;
    }
  };
  useEffect(() => {
    loadEspecimen();
  }, [idSelected]);

  if (isLoading) {
    return <Text>Cargando datos...</Text>;
  }

  return (
    <View>
      <Especimen
        initialValues={formValues}
        onValuesChange={async (values: Partial<FormValuesEspecimen>) => {
          await updateEspecimenByIdAviso(idSelected, values);
        }}
        onSubmitData={onSubmitData}
      />
    </View>
  );
};

export default EspecimenPage;
