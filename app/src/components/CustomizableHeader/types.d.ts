import { StyleProp, ViewStyle } from "react-native";
import { ReactNode } from "react";

export interface CustomizableHeaderProps {
  containerStyle?: StyleProp<ViewStyle>;
  leftComponent?: ReactNode;
  centerComponent?: ReactNode;
  rightComponent?: ReactNode;
}
