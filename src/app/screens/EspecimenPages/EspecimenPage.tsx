import React from "react";
import { View } from "react-native";

import Especimen from "../../../forms/Especimen/Especimen";
import { FormValuesEspecimen } from "../../../forms/Especimen/FormValuesEspecimen";

const EspecimenPage: React.FC = () => {
  const initialValues: FormValuesEspecimen = {
    Latitud: "51.1657",
    Longitud: "10.4515",
    EspecieId: 1,
    condicion: 1,
    longitudTotalRectilinea: "30 cm",
    peso: "500 g",
    sexo: 1,
    grupoDeEdad: 2,
    orientacionDelEspecimen: "Norte",
    sustrato: 1,
    otroSustrato: "Hojas",
    heridasBala: "No",
    heridasBalaFoto: "",
    presenciaDeRedes: "No",
    presenciaDeRedesFoto: "",
    mordidas: "No",
    mordidasFoto: "",
    golpes: "No",
    golpesFoto: "",
    otroTipoDeHeridas: "No",
    otroTipoDeHeridasFoto: "",
    Especie: {
      id: 0,
      nombre: "",
      nombreLatin: "",
      taxa: 0,
      familia: 0,
    },
  };

  return (
    <View>
      <Especimen
        initialValues={initialValues}
        onValuesChange={(values: Partial<FormValuesEspecimen>) => {
          console.log(values);
        }}
      />
    </View>
  );
};

export default EspecimenPage;
