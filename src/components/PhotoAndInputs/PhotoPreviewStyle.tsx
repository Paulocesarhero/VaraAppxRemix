import { StyleSheet } from "react-native";

const PhotoAndInputStyle = StyleSheet.create({
  photoPreview: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#fff",
    height: 250,
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#000",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  label: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default PhotoAndInputStyle;
