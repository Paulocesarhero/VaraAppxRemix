import { StyleSheet } from "react-native";

export const BottomMenuStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    width: "100%",
  },
  image: {
    width: 30,
    height: 30,
    contentFit: "contain",
  },
  containerImage: {
    alignItems: "center",
  },
  containerBottom: {
    borderRadius: 10,
    flex: 1,
    justifyContent: "flex-end",
  },
});
