import { ColorValue } from "react-native";


export enum ColorsEnum {
  dark = "#333333",
  light = "#f8f8f8",
  lightGrey = "#b7bcc7",
  grey = "#979797",
}

export const ColorsPalete: Record<keyof typeof ColorsEnum, ColorValue> = {
  dark: ColorsEnum.dark,
  light: ColorsEnum.light,
  lightGrey: ColorsEnum.lightGrey,
  grey: ColorsEnum.grey,
};
