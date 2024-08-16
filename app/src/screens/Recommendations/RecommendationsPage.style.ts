import { StyleSheet } from "react-native";

export const RecommendationsPageStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  containerBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#ccc",
    borderRadius: 8,
    height: 150,
    padding: 20,
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
  },
});
