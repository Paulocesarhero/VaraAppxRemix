import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SettingsPageStyle } from "./SettingsPage.style";

const SettingsPage: React.FC = () => {
  return (
    <SafeAreaView style={SettingsPageStyle.container}>
      <Text>Hola desde settings</Text>
    </SafeAreaView>
  );
};

export default SettingsPage;
