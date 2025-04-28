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
      <Stack.Screen
        name="(Aviso)"
        options={{
          headerShown: false,
          fullScreenGestureEnabled: true,
          gestureEnabled: true,
          title: "Registro aviso",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "regresar",
          headerLeft: headerHome,
        }}
      />
      <Stack.Screen
        name="MenuAviso/MenuAvisoPage"
        options={{
          headerShown: true,
          fullScreenGestureEnabled: true,
          gestureEnabled: true,
          title: "Registrar aviso",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "regresar",
          headerLeft: headerHome,
        }}
      />
      <Stack.Screen
        name="VaramientoMasivoPage/VaramientoMasivoPage"
        options={{
          headerShown: true,
          fullScreenGestureEnabled: true,
          gestureEnabled: true,
          title: "Varamiento masivo",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "regresar",
          headerLeft: headerHome,
        }}
      />
    </Stack>
  );
};
export default Layout;
