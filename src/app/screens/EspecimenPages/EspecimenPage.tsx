import { useHeaderHeight } from "@react-navigation/elements";
import { SplashScreen, useFocusEffect, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";

import {
  addEspecimenIfNotExist,
  getEspecimenByIdEspecimen,
  hasRegistroMorfometrico,
  updateEspecimenById,
} from "../../../database/repository/especimenRepo";
import Especimen from "../../../forms/Especimen/Especimen";
import { FormValuesEspecimen } from "../../../forms/Especimen/FormValuesEspecimen";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";
import { saveImage } from "../../../hooks/helpers";

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
    console.log("load especimen", idEspecimen);

    if (idEspecimen === null) {
      const idEspecimenBD = await addEspecimenIfNotExist(idAviso);
      setIdEspecimen(idEspecimenBD);
      especimenInfo = await getEspecimenByIdEspecimen(idEspecimenBD);
      setFormValues(especimenInfo);
    } else {
      especimenInfo = await getEspecimenByIdEspecimen(idEspecimen);
      setFormValues(especimenInfo);
    }
    setIsLoading(false);
  };

  const loadHasMorfometria = async () => {
    console.log("loadHasMorfometria", idEspecimen, hasMorfometria);
    setIsLoading(true);
    const result = await hasRegistroMorfometrico(idEspecimen);
    setHasMorfometria(result);
    setIsLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    loadEspecimen().then(() => {
      if (isMounted) loadHasMorfometria();
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadHasMorfometria();
    }, [idEspecimen])
  );
  const onSubmitData = async (data: FormValuesEspecimen) => {
    if (!data.Especie) return;
    const taxaDelForm = data.Especie?.taxa;
    setIdtaxaEspecie(taxaDelForm);
    switch (taxaDelForm) {
      case MISTICETO:
        router.replace("screens/Misticeto/Misticeto");
        break;
      case PINNIPEDO:
        router.replace("screens/Pinnipedo/Pinnipedo");
        break;
      case ODONTOCETO:
        router.replace("screens/Odontoceto/Odontoceto");
        break;
      case SIRENIO:
        router.replace("screens/Sirenio/Sirenio");

        break;
    }
  };

  const handleValuesChange = async (values: Partial<FormValuesEspecimen>) => {
    if (values.golpesFoto) {
      const imagePersistence = await saveImage(values.golpesFoto);
      values.golpesFoto = imagePersistence;
      await updateEspecimenById(values, idEspecimen);
    }
    if (values.heridasBalaFoto) {
      const imagePersistence = await saveImage(values.heridasBalaFoto);
      values.heridasBalaFoto = imagePersistence;
      await updateEspecimenById(values, idEspecimen);
    }
    if (values.presenciaDeRedesFoto) {
      const imagePersistence = await saveImage(values.presenciaDeRedesFoto);
      values.presenciaDeRedesFoto = imagePersistence;
      await updateEspecimenById(values, idEspecimen);
    }
    if (values.mordidasFoto) {
      const imagePersistence = await saveImage(values.mordidasFoto);
      values.mordidasFoto = imagePersistence;
      await updateEspecimenById(values, idEspecimen);
    }
    if (values.otroTipoDeHeridasFoto) {
      const imagePersistence = await saveImage(values.otroTipoDeHeridasFoto);
      values.otroTipoDeHeridasFoto = imagePersistence;
      await updateEspecimenById(values, idEspecimen);
    } else {
      await updateEspecimenById(values, idEspecimen);
    }
  };

  const headerHeight = useHeaderHeight();

  if (
    isLoading ||
    !formValues ||
    idEspecimen === null ||
    hasMorfometria == undefined
  ) {
    return (
      <ActivityIndicator
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        size="large"
      />
    );
  }

  return (
    <View style={{ paddingTop: Platform.OS === "android" ? 0 : headerHeight }}>
      <Especimen
        hasMorfometria={hasMorfometria}
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
