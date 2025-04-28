import { Stack, useRouter } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import useRecorridoStore from "../../../hooks/globalState/useRecorridoStore";

const Layout: React.FC = () => {
  const router = useRouter();
  const { idRecorridoSelected } = useRecorridoStore();
  const navigateCondition = () => {
    if (idRecorridoSelected == null) {
      navigateToHome();
    } else {
      navigateToHomeRecorrido();
    }
  };

  const navigateToHome = () => {
    router.replace("/screens/(home)/ListaAvisos/ListaAvisos");
  };
  const navigateToHomeRecorrido = () => {
    router.replace("/screens/(home)/Recorrido/ListaRecorrido");
  };

  const headerHome = () => {
    return (
      <View style={{ margin: 12 }}>
        <Entypo
          name="home"
          size={24}
          color="black"
          onPress={navigateCondition}
        />
      </View>
    );
  };
  return (
    <Stack>
      <Stack.Screen
        name="AvisoPage/AvisoPage"
        options={{
          title: "Aviso",
          headerBackTitle: "regresar",
          headerBackButtonDisplayMode: "minimal",
          headerLeft: headerHome,
        }}
      />
      <Stack.Screen
        name="CaracteristicasFisicasYAmbientalesPage/CaracteristicasFisicasYAmbientalesPage"
        options={{
          title: "Características Ambientales",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "regresar",
          headerTransparent: Platform.OS === "ios",
          headerBlurEffect: Platform.OS === "ios" ? "regular" : undefined,
          headerLeft: headerHome,
        }}
      />
      <Stack.Screen
        name="MenuTipoDeAviso/MenuTipoDeAviso"
        options={{
          title: "Seleccione una opción",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "regresar",
          headerTransparent: Platform.OS === "ios",
          headerBlurEffect: Platform.OS === "ios" ? "regular" : undefined,
          headerLeft: headerHome,
        }}
      />
      <Stack.Screen
        name="MenuEspecimenPage/MenuEspecimenPage"
        options={{
          title: "Información espécimen",
          headerShown: true,
          fullScreenGestureEnabled: true,
          gestureEnabled: true,
          headerLeft: headerHome,
        }}
      />
      <Stack.Screen
        name="(Especimen)"
        options={{
          headerShown: false,
          fullScreenGestureEnabled: true,
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
};
export default Layout;
