import React from "react";
import { View, Text, Pressable } from "react-native";
import RecommendationsPage from "varaapplib/components/Recommendations/RecommendationsPage";
import { ColorsPalete } from "../../constants/COLORS";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AccionesYResultadosForm from "../../forms/AccionesYResultados/AccionesYResultados";
import FormValuesAccionesYresultados from "../../forms/AccionesYResultados/FormValuesAccionesYresultados";
import { SafeAreaView } from "react-native-safe-area-context";
import accionesResultadosFormStore from "../../hooks/accionesResultadosFormStore";

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
    <SafeAreaView style={{ flex: 1, backgroundColor: ColorsPalete.light }}>
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
          backgroundColor: ColorsPalete.dark,
          height: "6%",
        }}
        leftComponent={
          <Pressable onPress={handleBack}>
            <MaterialIcons name="logout" size={24} color={ColorsPalete.light} />
          </Pressable>
        }
        centerComponent={
          <View>
            <Text style={{ color: ColorsPalete.light }}>Menu</Text>
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
