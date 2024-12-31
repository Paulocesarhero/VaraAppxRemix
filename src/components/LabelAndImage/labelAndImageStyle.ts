import { StyleSheet } from "react-native";

export const LabelAndImageStyle = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  containerInfo: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 5,
  },
  label: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    flexWrap: "wrap",
    color: "#000000",
    maxWidth: "80%",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    marginBottom: 15,
  },
  closeButtonText: {
    fontSize: 16,
    color: "blue",
  },
  modalImage: {
    width: 300,
    height: 300,
  },
});
