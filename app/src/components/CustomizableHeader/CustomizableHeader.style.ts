import { StyleSheet } from "react-native";
import { COLORS } from "../../Constants/Colors";

export const CustomizableHeaderStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "5%",
    paddingHorizontal: 15,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gradientStart,
  },
  subComponent: {
    flex: 1,
  },
});
