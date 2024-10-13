import { ColorValue, PressableProps, StyleProp } from "react-native";
export interface RoundedButtonProps extends PressableProps {
  color?: string | ColorValue;
  text?: string;
  style?: StyleProp<ViewStyle>;
}
