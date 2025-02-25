import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface InlineButtonProps {
  onPress?: () => void;
  icon?: React.ReactNode;
  text?: string;
  styleText?: StyleProp<TextStyle>;
  styleView?: StyleProp<ViewStyle>;
}

const InlineButton: React.FC<InlineButtonProps> = ({
  onPress,
  icon,
  text,
  styleText,
  styleView,
}) => {
  return (
    <TouchableOpacity
      style={[inlineButtonStyle.button, styleView]}
      onPress={onPress}
    >
      {icon}
      <Text style={[{ fontSize: 16, fontWeight: "bold" }, styleText]}>
        {text}{" "}
      </Text>
    </TouchableOpacity>
  );
};

const inlineButtonStyle = StyleSheet.create({
  button: {
    borderWidth: 0.5,
    padding: 10,
    alignItems: "center" as const,
    justifyContent: "center",
  },
});

export default InlineButton;
