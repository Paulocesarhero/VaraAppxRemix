import { TextInputProps, StyleProp, TextStyle } from "react-native";

export interface EmailInputProps extends TextInputProps {
  onEmailTextChange: (text: string) => void;
  emailCustomStyle?: StyleProp<TextStyle>;
}
