import { Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import { ColorsPalete } from "../../constants/COLORS";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";
import { useRouter } from "expo-router";
import { AvisoForm } from "varaapplib/components/AvisoForm/AvisoForm";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AvisoValues } from "varaapplib/components/AvisoForm/types";
import Menu from "../../components/Menu/Menu";
import { SafeAreaView } from "react-native-safe-area-context";

const StrandingPage: React.FC = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmitData = () => {};
  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: ColorsPalete.light }}
    >
      <CustomizableHeader
        containerStyle={{ backgroundColor: ColorsPalete.dark }}
        centerComponent={
          <View>
            <Text style={{ color: "white" }}>Formato general</Text>
          </View>
        }
      ></CustomizableHeader>
      <AvisoForm
        onSubmitData={handleSubmitData}
        loading={loading}
        setLoading={setLoading}
        onValuesChange={(values: Partial<AvisoValues>) => {
          console.log("Valores cambiados:", values);
        }}
        data={{
          Nombre: "Paulo",
          Telefono: "2282522839",
          Fotografia: "https://via.placeholder.com/300",
          FechaDeAvistamiento: "2024-12-30",
          Sustrato: 1,
          FacilAcceso: true,
          Acantilado: false,
          LugarDondeSeVio: 0,
          TipoDeAnimal: 0,
          Observaciones: "Se ve saludable",
          CondicionDeAnimal: 2,
          CantidadDeAnimales: "",
          InformacionDeLocalizacion: "Cerca de la entrada principal",
          Latitud: "",
          Longitud: "",
        }}
      ></AvisoForm>
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

export default StrandingPage;
