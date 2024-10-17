import { StyleProp, TextInputProps, ViewStyle } from "react-native";

export interface InputWithTitleAndExampleProps {
  title?: string;
  example?: string;
  textInputProps?: TextInputProps;
  containerStyle?: StyleProp<ViewStyle>;
}
