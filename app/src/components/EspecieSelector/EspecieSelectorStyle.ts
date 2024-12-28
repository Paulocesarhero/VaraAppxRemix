import { StyleSheet } from "react-native";

export const EspecieSelectorStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  labelContainer: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
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
    alignItems: "center",
    backgroundColor: "#f5f5f5", // Color de fondo para los elementos
    borderRadius: 8, // Bordes redondeados para cada elemento
    padding: 10, // Espaciado interno
    marginVertical: 5, // Espaciado vertical entre los elementos
    shadowColor: "#000", // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.1, // Opacidad de la sombra
    shadowRadius: 3, // Radio de la sombra
    elevation: 3, // Elevación para Android
  },
});
