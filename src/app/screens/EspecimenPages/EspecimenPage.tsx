import React from "react";
import { View } from "react-native";

import Especimen from "../../../forms/Especimen/Especimen";
import { FormValuesEspecimen } from "../../../forms/Especimen/FormValuesEspecimen";

const EspecimenPage: React.FC = () => {
  const initialValues: FormValuesEspecimen = {
    Latitud: "",
    Longitud: "",
    EspecieId: 1,
    condicion: 1,
    longitudTotalRectilinea: "",
    peso: "",
    sexo: 1,
    grupoDeEdad: 2,
    orientacionDelEspecimen: "",
    sustrato: 1,
    otroSustrato: "Hojas",
    heridasBala: "No",
    heridasBalaFoto: "",
    presenciaDeRedes: "No",
    presenciaDeRedesFoto: "",
    mordidas: "",
    mordidasFoto: "",
    golpes: "",
    golpesFoto: "",
    otroTipoDeHeridas: "",
    otroTipoDeHeridasFoto: "",
  };

  const onSubmitData = (data: FormValuesEspecimen) => {
    console.log(data);
  };

  return (
    <View>
      <Especimen
        initialValues={initialValues}
        onValuesChange={(values: Partial<FormValuesEspecimen>) => {
          console.log(values);
        }}
        onSubmitData={onSubmitData}
      />
    </View>
  );
};

export default EspecimenPage;
