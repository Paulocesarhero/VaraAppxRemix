import React from "react";
import { Pressable, Text, View } from "react-native";
import { RoundedButtonProps } from "./types";
import { RoundedButtonStyle } from "./RoundedButton.style";

const RoundedButton: React.FC<RoundedButtonProps> = ({
  color,
  text,
  style,
  ...restButtonProps
}) => {
  return (
    <View style={style}>
      <Pressable
        style={[RoundedButtonStyle.container, { backgroundColor: color }]}
        {...restButtonProps}
      >
        <Text style={RoundedButtonStyle.text}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default RoundedButton;
