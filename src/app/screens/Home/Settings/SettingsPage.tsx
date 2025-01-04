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

import { getAvisosBdLocal } from "../../../../database/repository/avisoRepo";

const SettingsPage: React.FC = () => {
  const getAvisos = async () => {
    const avisosBdLocal = await getAvisosBdLocal();
    console.log(JSON.stringify(avisosBdLocal, null, 2));
  };
  return (
    <SafeAreaView style={SettingsPageStyle.container}>
      <Text>
        Hola esta aplicaión fue creada por Paulo Cesar Hernández Rosado en
        colaboración con todos los involucrados en el proyecto gracias a todos
        los colaboradores de la comunidad VaraMundo
      </Text>

      <TouchableOpacity onPress={getAvisos}>
        <Text>Get avisos</Text>
      </TouchableOpacity>

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
