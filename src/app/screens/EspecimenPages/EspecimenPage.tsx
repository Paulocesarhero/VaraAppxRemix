import { useHeaderHeight } from "@react-navigation/elements";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";

import {
  addEspecimenIfNotExist,
  getEspecimenByIdEspecimen,
  hasRegistroMorfometrico,
  updateEspecimenById,
} from "../../../database/repository/especimenRepo";
import Especimen from "../../../forms/Especimen/Especimen";
import { FormValuesEspecimen } from "../../../forms/Especimen/FormValuesEspecimen";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";

const EspecimenPage: React.FC = () => {
  const idtaxaEspecie = useAvisoStore((state) => state.idtaxaEspecie);
  const idAviso = useAvisoStore((state) => state.idAvisoSelected);
  const { setIdtaxaEspecie } = useAvisoStore();

  const idEspecimen = useAvisoStore((state) => state.idEspecimen);
  const { setIdEspecimen } = useAvisoStore();
  const [formValues, setFormValues] = useState<FormValuesEspecimen>();
  const [hasMorfometria, setHasMorfometria] = useState<boolean>();
  const router = useRouter();
  const MISTICETO = 0;
  const PINNIPEDO = 1;
  const ODONTOCETO = 2;
  const SIRENIO = 3;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadEspecimen = async () => {
    setIsLoading(true);
    let especimenInfo: any;
    try {
      if (idEspecimen === null) {
        const idEspecimenBD = await addEspecimenIfNotExist(idAviso);
        setIdEspecimen(idEspecimenBD);
        especimenInfo = await getEspecimenByIdEspecimen(idEspecimenBD);
        setFormValues(especimenInfo);
        console.log(
          "info del especimen primera vez :",
          JSON.stringify(especimenInfo, null, 2)
        );
      } else {
        especimenInfo = await getEspecimenByIdEspecimen(idEspecimen);
        console.log(
          "info del especimen segunda vez :",
          JSON.stringify(especimenInfo, null, 2)
        );
        setFormValues(especimenInfo);
      }
    } catch (error) {
      console.error("Error al obtener aviso: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadHasMorfometria = async () => {
    setIsLoading(true);
    try {
      const result = await hasRegistroMorfometrico(idEspecimen);
      setHasMorfometria(result);
    } catch (error) {
      console.error("Error al obtener el valor de morfometria: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log("idEspecimen zustand", idEspecimen);
    loadEspecimen();
  }, [idAviso]);

  useFocusEffect(
    React.useCallback(() => {
      loadEspecimen();
      loadHasMorfometria();
    }, [idAviso, idEspecimen])
  );
  useEffect(() => {
    loadHasMorfometria();
  }, [idEspecimen]);

  const onSubmitData = async (data: FormValuesEspecimen) => {
    if (!data.Especie) return;
    //console.log("data.Especie", JSON.stringify(data, null, 2));
    //await updateEspecimenById(data, idEspecimen);
    const taxaDelForm = data.Especie?.taxa;
    setIdtaxaEspecie(taxaDelForm);
    switch (taxaDelForm) {
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

  const handleValuesChange = async (values: Partial<FormValuesEspecimen>) => {
    await updateEspecimenById(values, idEspecimen);
  };

  const headerHeight = useHeaderHeight();

  if (isLoading || !formValues) {
    return <Text>Cargando datos...</Text>;
  }

  return (
    <View style={{ paddingTop: Platform.OS === "android" ? 0 : headerHeight }}>
      <Especimen
        hasMorfometria={hasMorfometria ?? false}
        initialValues={formValues}
        onValuesChange={async (values: Partial<FormValuesEspecimen>) => {
          await handleValuesChange(values);
        }}
        onSubmitData={onSubmitData}
      />
    </View>
  );
};

export default EspecimenPage;
