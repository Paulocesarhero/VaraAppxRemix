import { Text, View } from "react-native";
import { BottomMenuStyle } from "./BottomMenu.style";
import { Image } from "expo-image";
import React from "react";
import { BottomMenuProps } from "./BottomMenuProps";

const BottomMenu: React.FC<BottomMenuProps> = ({
  ViewStyleSettings,
  ViewStyleRecommendations,
  ViewStyleStranding,
}) => {
  return (
    <View style={BottomMenuStyle.container}>
      <View style={[BottomMenuStyle.containerImage, ViewStyleStranding]}>
        <Image
          source={require("../../assets/format.imageset/format.png")}
          style={BottomMenuStyle.image}
        />
        <Text>Stranding</Text>
      </View>
      <View style={[BottomMenuStyle.containerImage, ViewStyleRecommendations]}>
        <Image
          source={require("../../assets/recommendation.imageset/recommendation.png")}
          style={BottomMenuStyle.image}
        />
        <Text>Recommendations</Text>
      </View>
      <View style={[BottomMenuStyle.containerImage, ViewStyleSettings]}>
        <Image
          source={require("../../assets/settings.imageset/settings.png")}
          style={BottomMenuStyle.image}
        />
        <Text>Settings</Text>
      </View>
    </View>
  );
};

export default BottomMenu;
