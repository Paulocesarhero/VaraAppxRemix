import { StyleSheet } from "react-native";
import { COLORS } from "../../Constants/Colors";

export const emailInputStyle = StyleSheet.create({
  input: {
    backgroundColor: COLORS.white,
    marginVertical: 15,
    borderWidth: 1,
    width: 325,
    height: 40,
    borderRadius: 12,
    textAlign: "center",
    fontSize: 25,
  },
});
