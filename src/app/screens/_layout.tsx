import Entypo from "@expo/vector-icons/Entypo";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Platform, Text, View } from "react-native";

const Layout: React.FC = () => {
  const router = useRouter();
  const navigateToHome = () => {
    router.replace("/screens/(home)/ListaAvisos/ListaAvisos");
  };
  const headerHome = () => {
    return (
      <View style={{ margin: 12 }}>
        <Entypo name="home" size={24} color="black" onPress={navigateToHome} />
      </View>
    );
  };

  return (
    <Stack>
      <Stack.Screen
        name="(home)"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="AvisoPage/AvisoPage"
        options={{
          title: "Aviso",
          headerBackTitle: "regresar",
          headerBackButtonDisplayMode: "minimal",
          headerTransparent: Platform.OS === "ios",
          headerBlurEffect: Platform.OS === "ios" ? "regular" : undefined,
          headerLeft: headerHome,
        }}
      />
      <Stack.Screen
        name="Aviso/CaracteristicasFisicasYAmbientalesPage/CaracteristicasFisicasYAmbientalesPage"
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
        name="MenuRegistrarAviso/MenuRegistrarAviso"
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
        name="EspecimenPages/EspecimenPage"
        options={{
          title: "Espécimen",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "regresar",
          headerLeft: headerHome,
          headerTransparent: Platform.OS === "ios",
          headerBlurEffect: Platform.OS === "ios" ? "regular" : undefined,
        }}
      />
    </Stack>
  );
};
export default Layout;
