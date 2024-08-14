import { ColorValue, PressableProps } from "react-native";
export interface RoundedButtonProps extends PressableProps {
    color?: string | ColorValue;
    text?: string;
}