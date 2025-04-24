import React from "react";
import { Dimensions, Text } from "react-native";
interface CustomTittleProps {
  children: React.ReactNode;
}
export const CustomTitle = (props: CustomTittleProps) => {
  const { children } = props;
  return (
    <Text
      style={{
        fontSize: Math.min(
          22,
          Math.max(16, Math.round(Dimensions.get("window").width * 0.05))
        ),
        textAlign: "center",
        color: "#151515",
        backgroundColor: "rgba(240, 240, 240, 0.9)",
      }}
    >
      {children}
    </Text>
  );
};
