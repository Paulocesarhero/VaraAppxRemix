import { StyleSheet } from "react-native";
import { COLORS } from "../../Constants/Colors";

export const LoginFormStyle = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
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
  toggleButton: {
    marginLeft: 8,
  },
  toggleButtonText: {
    color: "#1E90FF",
    fontSize: 16,
  },
});
