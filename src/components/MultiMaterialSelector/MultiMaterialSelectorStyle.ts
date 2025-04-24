import { StyleSheet } from "react-native";

export const MultiMaterialSelectorStyle = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
  },
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    boxShadow: "5px 5px 5px #000",
  },
  selectedText: {
    fontSize: 16,
    color: "#000",
  },
  helperText: {
    fontSize: 14,
    color: "#000",
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    margin: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#00000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 14,
    color: "#000000",
  },
  closeButton: {
    alignItems: "center",
    marginTop: 20,
  },
});
