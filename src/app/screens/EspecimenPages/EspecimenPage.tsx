import { useHeaderHeight } from "@react-navigation/elements";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform, View } from "react-native";

import {
  addEspecimenIfNotExist,
  deletePhotoEspecimenById,
  getEspecimenByIdEspecimen,
  hasRegistroMorfometrico,
  updateEspecimenById,
} from "../../../database/repository/especimenRepo";
import Especimen from "../../../forms/Especimen/Especimen";
import { FormValuesEspecimen } from "../../../forms/Especimen/FormValuesEspecimen";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";
import { saveImage } from "../../../hooks/helpers";

const EspecimenPage: React.FC = () => {
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
    setIsLoading(true);
    const result = await hasRegistroMorfometrico(idEspecimen);
    setHasMorfometria(result);
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadEspecimen();
      loadHasMorfometria();
    }, [idEspecimen])
  );
  const onSubmitData = async (data: FormValuesEspecimen) => {
    console.dir(data, { depth: null });
    try {
      if (!data.Especie) return;
      if (idEspecimen === null) return;

      if (data.golpesFoto) {
        const response = await saveImage(data.golpesFoto);
        if (!response.existImage) {
          data.golpesFoto = response.uri;
          await deletePhotoEspecimenById(idEspecimen, "golpes");
        }
      }
      if (data.heridasBalaFoto) {
        const response = await saveImage(data.heridasBalaFoto);
        if (!response.existImage) {
          await deletePhotoEspecimenById(idEspecimen, "heridasDeBala");
          data.heridasBalaFoto = response.uri;
        }
      }
      if (data.presenciaDeRedesFoto) {
        const response = await saveImage(data.presenciaDeRedesFoto);
        if (!response.existImage) {
          await deletePhotoEspecimenById(idEspecimen, "presenciaDeRedes");
          data.presenciaDeRedesFoto = response.uri;
        }
      }
      if (data.mordidasFoto) {
        const response = await saveImage(data.mordidasFoto);
        if (!response.existImage) {
          await deletePhotoEspecimenById(idEspecimen, "mordidas");
          data.mordidasFoto = response.uri;
        }
      }
      if (data.otroTipoDeHeridasFoto) {
        const response = await saveImage(data.otroTipoDeHeridasFoto);
        if (!response.existImage) {
          await deletePhotoEspecimenById(idEspecimen, "otros");
          data.otroTipoDeHeridasFoto = response.uri;
        }
      }
      await updateEspecimenById(data, idEspecimen);

      const taxaDelForm = data.Especie?.taxa;
      setIdtaxaEspecie(taxaDelForm);
      switch (taxaDelForm) {
        case MISTICETO:
          router.push("screens/Misticeto/Misticeto");
          break;
        case PINNIPEDO:
          router.push("screens/Pinnipedo/Pinnipedo");
          break;
        case ODONTOCETO:
          router.push("screens/Odontoceto/Odontoceto");
          break;
        case SIRENIO:
          router.push("screens/Sirenio/Sirenio");
          break;
      }
    } catch {
      Alert.alert(
        "Error al enviar los datos intenta volver a seleccionar las fotos"
      );
    }
  };

  const handleValuesChange = async (values: Partial<FormValuesEspecimen>) => {};

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
