import { StyleSheet } from "react-native";

export const EspecieSelectorStyle = StyleSheet.create({
  labelContainer: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
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
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedText: {
    fontSize: 16,
    color: "#000",
  },
  selectorButton: {
    boxShadow: "5px 5px 5px #000",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    marginVertical: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  labelInfo: {
    flexWrap: "wrap",
    fontSize: 16,
    color: "#000",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
});