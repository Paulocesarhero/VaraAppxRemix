import { ColorValue } from "react-native";
/* eslint-disable no-unused-vars */
export enum ColorsEnum {
  dark = "#333333",
  light = "#f8f8f8",
  lightGrey = "#b7bcc7",
  grey = "#979797",
  backgroundVaraAppx = "#F5F5F7",
  primaryBlue = "#024D76",
  secondayblue = "#3b5998",
  primarygreen = "#54AD94",
  red = "#E74C3C",
  orange = "#E67E22",
  yellow = "#F1C40F",
  purple = "#9B59B6",
}

export const ColorsPalete: Record<keyof typeof ColorsEnum, ColorValue> = {
  dark: ColorsEnum.dark,
  light: ColorsEnum.light,
  lightGrey: ColorsEnum.lightGrey,
  grey: ColorsEnum.grey,
  backgroundVaraAppx: ColorsEnum.backgroundVaraAppx,
  primaryBlue: ColorsEnum.primaryBlue,
  secondayblue: ColorsEnum.secondayblue,
  primarygreen: ColorsEnum.primarygreen,
  red: ColorsEnum.red,
  orange: ColorsEnum.orange,
  yellow: ColorsEnum.yellow,
  purple: ColorsEnum.purple,
};
