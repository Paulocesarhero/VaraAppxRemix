import { StyleSheet } from "react-native";

import { ColorsPalete } from "../../constants/COLORS";

export const ListaAvisosStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsPalete.light,
    overflow: "visible",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    fontSize: 16,
    fontWeight: "bold",
    color: ColorsPalete.grey,
  },
  list: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
});
