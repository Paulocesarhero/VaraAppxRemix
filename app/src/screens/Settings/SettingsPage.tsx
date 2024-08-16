import { Text } from "react-native";
import React from "react";
import BottomMenu from "../../components/BottomMenu/BottomMenu";
import { COLORS } from "../../Constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { SettingsPageStyle } from "./SettingsPage.style";

const SettingsPage: React.FC = () => {
  return (
    <SafeAreaView style={SettingsPageStyle.container}>
      <Text>Hola desde settings</Text>
      <BottomMenu ViewStyleSettings={{ backgroundColor: COLORS.background }} />
    </SafeAreaView>
  );
};

export default SettingsPage;
