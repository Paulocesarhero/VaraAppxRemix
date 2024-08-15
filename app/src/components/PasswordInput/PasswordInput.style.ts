import { StyleSheet } from "react-native";
import { COLORS } from "../../Constants/Colors";

export const PasswordInputStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
