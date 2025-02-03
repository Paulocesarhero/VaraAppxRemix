import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { ColorsPalete } from "../../constants/COLORS";
import { router } from "expo-router";
import { useLiveQuery } from "drizzle-orm/expo-sqlite/index";
import { db } from "../../database/connection/sqliteConnection";
import { avisos } from "../../database/schemas/avisoSchema";
import { FlashList } from "@shopify/flash-list";
import CardAvisosRecorrido from "../CardAvisosRecorrido/CardAvisosRecorrido";
import useRecorridoStore from "../../hooks/globalState/useRecorridoStore";

const ListaAvisosRecorrido: React.FC = () => {
  const { idRecorridoSelected } = useRecorridoStore();
  const { data } = useLiveQuery(
    db
      .select({
        id: avisos.id,
        fechaDeAvistamiento: avisos.fechaDeAvistamiento,
        cantidadDeAnimales: avisos.cantidadDeAnimales,
        fotografia: avisos.fotografia,
        nombre: avisos.nombre,
      })
      .from(avisos)
  );

  const handleNuevoAviso = useCallback(() => {
    router.push("screens/AvisoPage/AvisoPage");
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleNuevoAviso}>
        <Entypo name="new-message" size={24} color="black" />
        <Text style={styles.buttonText}>Nuevo aviso</Text>
      </TouchableOpacity>
      <FlashList
        estimatedItemSize={216}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardAvisosRecorrido
            idAviso={item.id}
            urlImage={item.fotografia}
            fechasDeAvistamiento={item?.fechaDeAvistamiento}
            cantidadDeAnimales={item.cantidadDeAnimales}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsPalete.light,
    padding: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 0.5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  list: {
    paddingBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 2,
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 5,
  },
  switchLabel: {
    fontSize: 12,
    marginRight: 10,
  },
});

export default ListaAvisosRecorrido;
