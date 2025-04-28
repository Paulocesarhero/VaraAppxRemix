import React from "react";
import { Dimensions, Text, TextStyle } from "react-native";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
interface CustomTittleProps {
  children: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
}
export const CustomTitle = (props: CustomTittleProps) => {
  const { children, textStyle } = props;
  return (
    <Text
      style={[
        {
          fontSize: Math.min(
            22,
            Math.max(16, Math.round(Dimensions.get("window").width * 0.05))
          ),
          textAlign: "center",
          color: "#151515",
          backgroundColor: "rgba(240, 240, 240, 0.9)",
        },
        textStyle,
      ]}
    >
      {children}
    </Text>
  );
};
