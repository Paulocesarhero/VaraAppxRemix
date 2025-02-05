import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/build/Feather";
import { FlashList } from "@shopify/flash-list";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite/index";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import InlineButton from "../../../../components/InlineButton/InlineButton";
import { ColorsPalete } from "../../../../constants/COLORS";
import { db } from "../../../../database/connection/sqliteConnection";
import { recorrido } from "../../../../database/schemas/avisoSchema";
import useRecorridoStore from "../../../../hooks/globalState/useRecorridoStore";

interface item {
  idRecorrido: number;
  distanciaTotal: number;
}

const ListaRecorrido: React.FC = () => {
  const { setIdRecorridoSelected, clearIdRecorridoSelected } =
    useRecorridoStore();
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();
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

  const renderItem = ({ item }: { item: item }) => {
    const handleUpdateRecorrido = (idRecorrido: number) => {
      setIdRecorridoSelected(idRecorrido);
      route.push("screens/RegistrarRecorrido/RegistroRecorrido");
    };
    const handleDeleteRecorrido = async (idRecorrido: number) => {
      await db.delete(recorrido).where(eq(recorrido.id, idRecorrido));
    };
    const handleCloudUpload = () => {
      setIsLoading(true);
    };
    const formatDistance = (distanceKm: number): string => {
      if (distanceKm < 1) {
        return `${Math.round(distanceKm * 1000)} m`; // Convertir a metros y redondear
      }
      return `${distanceKm.toFixed(1)} km`; // Mostrar con 1 decimal en km
    };
    return (
      <View style={styles.itemContainer}>
        <Text style={{ fontWeight: "bold" }}>ID : {item.idRecorrido}</Text>
        <Text style={{ fontWeight: "bold" }}>
          Distancia total : {formatDistance(item.distanciaTotal)}
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
            onPress={() => handleUpdateRecorrido(item.idRecorrido)}
          />
          {isLoading ? (
            <ActivityIndicator size="small" color="blue" />
          ) : (
            <AntDesign
              name="cloudupload"
              size={24}
              color="blue"
              onPress={handleCloudUpload}
              disabled={isLoading}
            />
          )}
          <AntDesign
            name="delete"
            size={24}
            color="red"
            onPress={() => handleDeleteRecorrido(item.idRecorrido)}
          />
        </View>
      </View>
    );
  };

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
      />
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
