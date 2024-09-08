import { StyleSheet } from "react-native";
import { COLORS } from "../../Constants/Colors";

export const CustomizableHeaderStyles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gradientStart,
  },
  subComponent: {
    flex: 1,
    width: "auto",
    position: "absolute",
    left: 0,
    right: 0,
  },
});
