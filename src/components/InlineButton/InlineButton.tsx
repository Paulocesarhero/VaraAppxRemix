import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface InlineButtonProps {
  onPress?: () => void;
  icon?: React.ReactNode;
  text?: string;
}

const InlineButton: React.FC<InlineButtonProps> = ({ onPress, icon, text }) => {
  return (
    <TouchableOpacity style={inlineButtonStyle.button} onPress={onPress}>
      {icon}
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{text} </Text>
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
