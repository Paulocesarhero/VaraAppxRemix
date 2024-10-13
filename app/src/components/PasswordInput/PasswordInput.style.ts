import { StyleSheet } from "react-native";
import { COLORS } from "../../Constants/Colors";

export const PasswordInputStyle = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    backgroundColor: COLORS.white,
  },
  input: {
    textAlign: "center",
    height: 50,
    fontSize: 20,
  },

  iconButton: {
    marginVertical: 10,
    alignItems: "flex-start",
  },
});
