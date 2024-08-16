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
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  containerBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
