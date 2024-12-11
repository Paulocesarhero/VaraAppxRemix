import React from "react";
import { View, Text, Pressable } from "react-native";
import RecommendationsPage from "varaapplib/components/Recommendations/RecommendationsPage";
import { ColorsPalete } from "../../Constants/Colors";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AccionesYResultadosForm from "../../forms/AccionesYResultados/AccionesYResultados";
import FormValuesAccionesYresultados from "../../forms/AccionesYResultados/FormValuesAccionesYresultados";
import { SafeAreaView } from "react-native-safe-area-context";
import accionesResultadosFormStore from "../../hooks/accionesResultadosFormStore";
import Menu from "../../components/Menu/Menu";

const Recommendations: React.FC = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const handleSubmit = () => {};
  const handleRegistrarAviso = () => {
    router.push("src/screens/Stranding/StrandingPage");
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
      ></CustomizableHeader>
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
      ></AccionesYResultadosForm>
      <CustomizableHeader
        containerStyle={{
          position: "sticky",
          bottom: "4%",
          backgroundColor: ColorsPalete.dark,
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
      ></CustomizableHeader>
    </SafeAreaView>
  );
};
export default Recommendations;
