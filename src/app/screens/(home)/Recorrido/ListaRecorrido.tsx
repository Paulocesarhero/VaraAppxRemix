import { FlashList } from "@shopify/flash-list";
import React from "react";
import { useLiveQuery } from "drizzle-orm/expo-sqlite/index";
import { db } from "../../../../database/connection/sqliteConnection";
import { recorrido } from "../../../../database/schemas/avisoSchema";
import { StyleSheet, Text, View } from "react-native";
import { ColorsPalete } from "../../../../constants/COLORS";
import InlineButton from "../../../../components/InlineButton/InlineButton";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/build/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { eq } from "drizzle-orm";
import useRecorridoStore from "../../../../hooks/globalState/useRecorridoStore";
import { useFocusEffect, useRouter } from "expo-router";

interface item {
  idRecorrido: number;
  distanciaTotal: number;
}

const ListaRecorrido: React.FC = () => {
  const {
    setIdRecorridoSelected,
    idRecorridoSelected,
    clearIdRecorridoSelected,
  } = useRecorridoStore();
  const route = useRouter();
  const renderItem = ({ item }: { item: item }) => {
    const handleUpdateRecodrido = (idRecorrido: number) => {
      setIdRecorridoSelected(idRecorrido);
      route.push("screens/RegistrarRecorrido/RegistroRecorrido");
    };
    const handleDeleteRecodrido = async (idRecorrido: number) => {
      await db.delete(recorrido).where(eq(recorrido.id, idRecorrido));
    };
    return (
      <View style={styles.itemContainer}>
        <Text style={{ fontWeight: "bold" }}>ID : {item.idRecorrido}</Text>
        <Text style={{ fontWeight: "bold" }}>
          Distancia total : {item.distanciaTotal}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: 10,
          }}
        >
          <Feather
            name="edit"
            size={24}
            color="green"
            onPress={() => handleUpdateRecodrido(item.idRecorrido)}
          />
          <AntDesign
            name="delete"
            size={24}
            color="red"
            onPress={() => handleDeleteRecodrido(item.idRecorrido)}
          />
        </View>
      </View>
    );
  };
  const { data } = useLiveQuery(
    db
      .select({
        idRecorrido: recorrido.id,
        distanciaTotal: recorrido.distanciaRecorrido,
      })
      .from(recorrido)
  );

  const handleAddRecorrdio = async () => {
    try {
      await db.insert(recorrido).values({ fecha: new Date().toString() });
    } catch (error) {
      console.error("Error al agregar el recorrido:", error);
      alert("No se pudo agregar el recorrido. Por favor, intenta nuevamente.");
    }
  };
  useFocusEffect(clearIdRecorridoSelected);

  return (
    <View style={styles.container}>
      <InlineButton
        icon={<Ionicons name="add" size={24} color="black" />}
        text="Agregar recorrido"
        onPress={handleAddRecorrdio}
      />

      <FlashList
        estimatedItemSize={144}
        data={data as unknown as item[]}
        renderItem={renderItem}
        keyExtractor={(item) => item.idRecorrido.toString() ?? ""}
      ></FlashList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  itemContainer: {
    backgroundColor: ColorsPalete.light,
    marginVertical: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 15,
    gap: 10,
    height: 150,
    padding: 20,
  },
  itemText: {
    fontSize: 18,
  },
});
export default ListaRecorrido;
