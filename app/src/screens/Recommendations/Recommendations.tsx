import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";

import { ColorsPalete } from "../../constants/COLORS";
import Especimen from "../../forms/Especimen/Especimen";
import { FormValuesEspecimen } from "../../forms/Especimen/FormValuesEspecimen";

const Recommendations: React.FC = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const handleRegistrarAviso = () => {
    router.push("src/components/ListaAvisos/ListaAvisos");
  };

  const initialValues: FormValuesEspecimen = {
    Latitud: "",
    Longitud: "",
    EspecieId: 0,
    Especie: {
      id: 0,
      nombre: "",
      nombreLatin: "",
      taxa: 0,
      familia: 0,
    },
    condicion: 0,
    longitudTotalRectilinea: "",
    peso: "",
    sexo: 0,
    grupoDeEdad: 0,
    orientacionDelEspecimen: "",
    sustrato: 0,
    otroSustrato: "",
    CantidadDeAnimales: 0,
    heridasBala: "",
    heridasBalaFoto: "",
    presenciaDeRedes: "",
    presenciaDeRedesFoto: "",
    mordidas: "",
    mordidasFoto: "",
    golpes: "",
    golpesFoto: "",
    otroTipoDeHeridas: "",
    otroTipoDeHeridasFoto: "",
  };

  return (
    <View style={{ flex: 1, backgroundColor: ColorsPalete.light }}>
      <Especimen
        initialValues={initialValues}
        onValuesChange={(value) => {
          console.log(value);
        }}
      />
      <CustomizableHeader
        containerStyle={{
          backgroundColor: ColorsPalete.dark,
          height: "6%",
        }}
        leftComponent={
          <Pressable onPress={handleBack}>
            <MaterialIcons name="logout" size={24} color={ColorsPalete.light} />
          </Pressable>
        }
        centerComponent={
          <Pressable onPress={handleRegistrarAviso}>
            <Text style={{ color: ColorsPalete.light }}>Avisos</Text>
          </Pressable>
        }
        rightComponent={
          <Pressable>
            <Ionicons name="settings" size={24} color="white" />
          </Pressable>
        }
      />
    </View>
  );
};
export default Recommendations;
