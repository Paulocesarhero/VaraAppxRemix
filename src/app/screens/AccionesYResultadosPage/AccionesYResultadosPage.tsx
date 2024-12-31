import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";

import Menu from "../../../components/Menu/Menu";
import { ColorsPalete } from "../../../constants/COLORS";
import AccionesYResultadosForm from "../../../forms/AccionesYResultados/AccionesYResultados";
import FormValuesAccionesYresultados from "../../../forms/AccionesYResultados/FormValuesAccionesYresultados";
import accionesResultadosFormStore from "../../../hooks/accionesResultadosFormStore";

const Recommendations: React.FC = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const handleSubmit = () => {};
  const handleRegistrarAviso = () => {
    router.push("screens/Stranding/StrandingPage");
  };
  const { formValues, setFormValues, resetForm } =
    accionesResultadosFormStore();

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: ColorsPalete.light }}
    >
      <CustomizableHeader
        containerStyle={{ backgroundColor: ColorsPalete.dark }}
        centerComponent={
          <View>
            <Text style={{ color: "white" }}>Acciones y resultados</Text>
          </View>
        }
      />
      <AccionesYResultadosForm
        onSubmitData={(data: FormValuesAccionesYresultados) => {
          console.log("Datos enviados:", data);
        }}
        loading={false}
        setLoading={function (loading: boolean): void {
          throw new Error("Function not implemented.");
        }}
        initialValues={formValues}
        onValuesChange={setFormValues}
      />
      <CustomizableHeader
        containerStyle={{
          position: "sticky",
          bottom: "4%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        leftComponent={
          <Pressable onPress={handleBack}>
            <MaterialIcons name="logout" size={24} color={ColorsPalete.light} />
          </Pressable>
        }
        centerComponent={
          <View>
            <Menu />
          </View>
        }
        rightComponent={
          <Pressable>
            <Ionicons name="settings" size={24} color="white" />
          </Pressable>
        }
      />
    </SafeAreaView>
  );
};
export default Recommendations;
