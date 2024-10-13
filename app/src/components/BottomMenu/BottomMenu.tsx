import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native";
import { BottomMenuStyle } from "./BottomMenu.style";
import { Image } from "expo-image";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { COLORS } from "../../Constants/Colors";
import { BottomMenuProps, MenuItemProps } from "./BottomMenuProps";

const BottomMenu: React.FC<BottomMenuProps> = ({
  ViewStyleSettings,
  ViewStyleRecommendations,
  ViewStyleStranding,
}) => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<string>("");

  const handleStrandingPress = () => {
    setActiveMenu("Stranding");
    router.navigate("src/screens/Stranding/StrandingPage");
  };

  const handleRecommendationsPress = () => {
    setActiveMenu("Recommendations");
    router.navigate("src/screens/Recommendations/RecommendationsPage");
  };

  const handleSettingsPress = () => {
    setActiveMenu("Settings");
    router.navigate("src/screens/Settings/SettingsPage");
  };

  const getStyle = (menu: string): StyleProp<ViewStyle> => {
    return activeMenu === menu ? { backgroundColor: COLORS.background } : {};
  };

  const MenuItem: React.FC<MenuItemProps> = ({
    onPress,
    style,
    imageSource,
    label,
  }) => (
    <Pressable onPress={onPress}>
      <View style={[BottomMenuStyle.containerImage, style]}>
        <Image source={imageSource} style={BottomMenuStyle.image} />
        <Text>{label}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={[BottomMenuStyle.container, BottomMenuStyle.containerBottom]}>
      <MenuItem
        onPress={handleStrandingPress}
        style={[ViewStyleStranding, getStyle("Stranding")]}
        imageSource={require("../../assets/format.imageset/format.png")}
        label="Stranding"
      />
      <MenuItem
        onPress={handleRecommendationsPress}
        style={[ViewStyleRecommendations, getStyle("Recommendations")]}
        imageSource={require("../../assets/recommendation.imageset/recommendation.png")}
        label="Recommendations"
      />
      <MenuItem
        onPress={handleSettingsPress}
        style={[ViewStyleSettings, getStyle("Settings")]}
        imageSource={require("../../assets/settings.imageset/settings.png")}
        label="Settings"
      />
    </View>
  );
};

export default BottomMenu;
