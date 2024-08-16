import { Text, View } from "react-native";
import BottomMenu from "../../components/BottomMenu/BottomMenu";
import React from "react";
import { COLORS } from "../../Constants/Colors";

const StrandingPage: React.FC = () => {
  return (
    <View>
      <Text>Que onda desde stranding</Text>
      <BottomMenu
        activeMenu={"Stranding"}
        ViewStyleStranding={{ backgroundColor: COLORS.background }}
      />
    </View>
  );
};

export default StrandingPage;
