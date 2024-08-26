import { StyleSheet } from "react-native";
import { COLORS } from "../../Constants/Colors";

export const LoginPageStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    alignItems: "center",
    backgroundColor: "#fff",
  },
  overlay: {
    backgroundColor: "#d71515",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    contentFit: "contain",
  },
  containerForgotPassword: {
    alignItems: "center",
    justifyContent: "center",
  },
  textForgotPassword: {
    fontSize: 20,
    color: COLORS.white,
  },
  textBold: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  spaceBetweenText: {
    marginVertical: 20,
  },
});
