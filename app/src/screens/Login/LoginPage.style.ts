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
    backgroundColor: COLORS.white,
  },
  image: {
    width: "60%",
    height: "30%",
    contentFit: "contain",
  },
  containerForgotPassword: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "20%",
  },
  textForgotPassword: {
    fontSize: 12,
    color: COLORS.white,
  },
  textBold: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  spaceBetweenText: {
    marginVertical: 20,
  },
  space: {
    marginHorizontal: 5,
  },
});
