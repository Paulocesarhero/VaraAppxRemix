import { Stack, useRouter } from "expo-router";
import React from "react";
import useRecorridoStore from "../../../../hooks/globalState/useRecorridoStore";
import { View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

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
        name="EspecimenPages/EspecimenPage"
        options={{
          fullScreenGestureEnabled: true,
          title: "Espécimen",
          headerShown: true,
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "regresar",
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
    </Stack>
  );
};
export default Layout;
