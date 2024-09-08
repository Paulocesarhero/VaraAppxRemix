import { StyleSheet } from "react-native";
import { COLORS } from "../../Constants/Colors";

export const RegistroCientificoStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  TextTitle: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: "bold",

    alignSelf: "center",
  },
  cancelarButton: {
    color: COLORS.white,
    fontSize: 15,
    padding: 5,
  },
});
