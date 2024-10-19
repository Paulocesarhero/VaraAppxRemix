import { StyleSheet } from "react-native";
import { COLORS } from "../../Constants/Colors";

export const LoginFormStyle = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "40%",
    width: "100%",
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },
});
