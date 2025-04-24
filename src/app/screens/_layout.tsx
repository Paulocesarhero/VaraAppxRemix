import Entypo from "@expo/vector-icons/Entypo";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

import useRecorridoStore from "../../hooks/globalState/useRecorridoStore";

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
  const headerHomeRecorridoo = () => {
    return (
      <View style={{ margin: 12 }}>
        <Entypo
          name="home"
          size={24}
          color="black"
          onPress={navigateToHomeRecorrido}
        />
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
      <Stack.Screen
        name="SoloOrganismosVivosPage/SoloOrganismosVivosPage"
        options={{
          title: "Organismo vivo",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "regresar",
          headerLeft: headerHome,
        }}
      />
      <Stack.Screen
        name="RegistroCientificoPage/RegistroCientificoPage"
        options={{
          title: "Registro científico",
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
      <Stack.Screen
        name="RegistrarRecorrido/RegistroRecorrido"
        options={{
          title: "Registrar recorrido",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "regresar",
          headerLeft: headerHomeRecorridoo,
        }}
      />
      <Stack.Screen
        name="RecorridoPage/RecorridoFormPage"
        options={{
          title: "Registrar recorrido",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "regresar",
          headerLeft: headerHomeRecorridoo,
        }}
      />
    </Stack>
  );
};
export default Layout;
