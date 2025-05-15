import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  ColorValue,
  ActivityIndicator
} from "react-native";

interface InlineButtonProps {
  onPress?: () => void;
  icon?: React.ReactNode;
  text?: string;
  styleText?: StyleProp<TextStyle>;
  styleView?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  loadingColor?: ColorValue;
}

const InlineButton: React.FC<InlineButtonProps> = ({
  onPress,
  icon,
  text,
  styleText,
  styleView,
  isLoading = false,
  loadingColor = "black",
}) => {
  return (
    <TouchableOpacity
      style={[inlineButtonStyle.button, styleView]}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={loadingColor} />
      ) : (
        <>
          {icon}
          <Text style={[{ fontSize: 16, fontWeight: "bold" }, styleText]}>
            {text}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const inlineButtonStyle = StyleSheet.create({
  button: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    alignItems: "center" as const,
    justifyContent: "center",
  },
});

export default InlineButton;
