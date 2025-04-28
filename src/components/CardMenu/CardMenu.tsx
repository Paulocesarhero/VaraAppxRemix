import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { CustomTitle } from "../CustomTitle";
import React, { ReactNode } from "react";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import Entypo from "@expo/vector-icons/Entypo";

interface CardMenuProps {
  children?: ReactNode;
  title?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  complete?: boolean;
  isRequired?: boolean;
}

export const CardMenu = (cardMenuProps: CardMenuProps) => {
  const {
    children,
    title,
    onPress,
    style,
    isRequired = false,
    complete,
    disabled,
  } = cardMenuProps;
  const componentStatus = () => {
    switch (complete) {
      case true:
        return (
          <Entypo
            name="check"
            size={24}
            color="green"
            style={{ marginLeft: "auto" }}
          />
        );
      default:
        return null;
    }
  };
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={[
          style,
          {
            borderRadius: 10,
            padding: 20,
            marginVertical: 10,
            marginHorizontal: 20,
            borderWidth: StyleSheet.hairlineWidth,
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 10,
            alignItems: "center",
          },
          disabled && {
            opacity: 0.6,
            backgroundColor: "#f5f5f5",
          },
        ]}
      >
        {children}
        <CustomTitle
          textStyle={{
            textAlign: "left",
            flexShrink: 1,
          }}
        >
          {title} {isRequired && <Text style={{ color: "red" }}>*</Text>}
        </CustomTitle>
        {componentStatus()}
      </View>
    </TouchableOpacity>
  );
};
