import { Text } from "react-native";
import BottomMenu from "../../components/BottomMenu/BottomMenu";
import React from "react";
import { COLORS } from "../../Constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { StrandingPageStyle } from "./StrandingPage.style";

const StrandingPage: React.FC = () => {
  return (
    <SafeAreaView style={StrandingPageStyle.container}>
      <Text>Que onda desde stranding</Text>
      <BottomMenu ViewStyleStranding={{ backgroundColor: COLORS.background }} />
    </SafeAreaView>
  );
};

export default StrandingPage;
