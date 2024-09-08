import { StyleSheet } from "react-native";
import { COLORS } from "../../Constants/Colors";

export const CardCarouselStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 40,
  },
  textHeading: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.gradientEnd,
    textAlign: "center",
    letterSpacing: 1,
    textTransform: "uppercase",
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
  textDescription: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.gradientStart,
    textAlign: "center",
    letterSpacing: 1,
    borderBottomWidth: 2,
    paddingBottom: 10,
    flexWrap: "wrap",
  },
  imageStyle: {
    width: "100%",
    marginVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    resizeMode: "contain",
    borderColor: "#ccc",
  },
});
