import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RoundedButton from "varaapplib/components/RoundedButton/RoundedButton";

import { getAvisosBdLocal } from "../../../../database/repository/avisoRepo";
import useListAvisoStore from "../../../../hooks/globalState/useListAvisosStore";

const SettingsPage: React.FC = () => {
  const { avisos, setAvisos } = useListAvisoStore();

  const getAvisos = async () => {
    const avisosBdLocal = await getAvisosBdLocal();
    console.log(JSON.stringify(avisosBdLocal, null, 2));
  };
  const avisosZustand = () => {
    console.log(JSON.stringify(avisos, null, 2));
  };

  return (
    <SafeAreaView style={SettingsPageStyle.container}>
      <Text>
        Hola esta aplicaión fue creada por Paulo Cesar Hernández Rosado en
        colaboración con todos los involucrados en el proyecto gracias a todos
        los colaboradores de la comunidad VaraMundo
      </Text>

      <RoundedButton
        onPress={getAvisos}
        color="#151515"
        text="GetAvisos de sqlite "
      />
      <RoundedButton
        onPress={avisosZustand}
        color="#151515"
        text="GetAvisos de zustand"
      />

      <ScrollView />
    </SafeAreaView>
  );
};

const SettingsPageStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SettingsPage;
