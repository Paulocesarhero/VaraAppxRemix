import Entypo from "@expo/vector-icons/Entypo";
import { router, Stack, useRouter } from "expo-router";
import React from "react";
import { Platform, Text, View } from "react-native";
import Feather from "@expo/vector-icons/build/Feather";

const Layout: React.FC = () => {
  const router = useRouter();
  const navigateToHome = () => {
    router.replace("/screens/(home)/ListaAvisos/ListaAvisos");
  };
  const NavigateToCaracteristicasFisicas = () => {
    const handleNavigation = () => {
      router.push(
        "/screens/Aviso/CaracteristicasFisicasYAmbientalesPage/CaracteristicasFisicasYAmbientalesPage"
      );
    };

    return (
      <View style={{ margin: 12 }}>
        <Feather
          name="arrow-right"
          size={24}
          color="black"
          onPress={handleNavigation}
        />
      </View>
    );
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
          headerRight: NavigateToCaracteristicasFisicas,
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
      <Stack.Screen
        name="SoloOrganismosVivosPage/SoloOrganismosVivosPage"
        options={{
          title: "Organismo vivo",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "regresar",
          headerLeft: headerHome,
          headerTransparent: Platform.OS === "ios",
          headerBlurEffect: Platform.OS === "ios" ? "regular" : undefined,
        }}
      />
      <Stack.Screen
        name="Sirenio/Sirenio"
        options={{
          title: "Morfometria Sirenio",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "regresar",
          headerLeft: headerHome,
        }}
      />
      <Stack.Screen
        name="Misticeto/Misticeto"
        options={{
          title: "Morfometria misticeto",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "regresar",
          headerLeft: headerHome,
        }}
      />
      <Stack.Screen
        name="Odontoceto/Odontoceto"
        options={{
          title: "Morfometria odontoceto",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "regresar",
          headerLeft: headerHome,
        }}
      />
      <Stack.Screen
        name="Pinnipedo/Pinnipedo"
        options={{
          title: "Morfometria pinnípedos",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "regresar",
          headerLeft: headerHome,
        }}
      />
      <Stack.Screen
        name="VaramientoMasivoPage/VaramientoMasivoPage"
        options={{
          title: "Varamiento masivo",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "regresar",
          headerLeft: headerHome,
        }}
      />
      <Stack.Screen
        name="AccionesYResultadosPage/AccionesYResultadosPage"
        options={{
          title: "Acciones y resultados",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "regresar",
          headerLeft: headerHome,
        }}
      />
      <Stack.Screen
        name="ListaEspecimen/ListaEspecimen"
        options={{
          title: "Lista espécimen",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "regresar",
          headerLeft: headerHome,
        }}
      />
    </Stack>
  );
};
export default Layout;
