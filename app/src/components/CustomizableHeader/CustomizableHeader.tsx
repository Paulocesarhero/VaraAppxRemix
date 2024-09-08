import React from "react";
import { View } from "react-native";
import { CustomizableHeaderStyles } from "./CustomizableHeader.style";
import { CustomizableHeaderProps } from "./types";

const CustomizableHeader: React.FC<CustomizableHeaderProps> = ({
  containerStyle,
  leftComponent,
  centerComponent,
  rightComponent,
}) => {
  return (
    <View style={[CustomizableHeaderStyles.container, containerStyle]}>
      <View>{leftComponent}</View>
      <View style={CustomizableHeaderStyles.subComponent}>
        {centerComponent}
      </View>
      <View>{rightComponent}</View>
    </View>
  );
};

export default CustomizableHeader;
