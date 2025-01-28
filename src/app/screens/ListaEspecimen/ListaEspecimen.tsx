import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/build/Feather";
import { FlashList } from "@shopify/flash-list";
import { and, eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import InlineButton from "../../../components/InlineButton/InlineButton";
import { ColorsPalete } from "../../../constants/COLORS";
import { db } from "../../../database/connection/sqliteConnection";
import {
  addEspecimenToVaramientoMasivo,
  deleteEspecimenById,
} from "../../../database/repository/especimenRepo";
import { especimen } from "../../../database/schemas/avisoSchema";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";
import useVaramientoMasivoStore from "../../../hooks/globalState/useVaramientoMasivo";

interface ListaEspecimenProps {
  isModificable: boolean;
}

interface item {
  idEspecimen: number;
  longitudTotalRectilinea: string;
}

const ListaEspecimen: React.FC<ListaEspecimenProps> = ({
  isModificable = true,
}) => {
  const idAviso = useAvisoStore((state) => state.idAvisoSelected);
  const idVaramientoMasivo = useVaramientoMasivoStore(
    (state) => state.idVaramientoMasivoSelected
  );
  const setIdEspecimenSelected = useAvisoStore((state) => state.setIdEspecimen);

  if (idVaramientoMasivo == null || idAviso == null) {
    return <Text>Por favor selecciona un varamiento masivo válido</Text>;
  }
  const route = useRouter();

  const { data } = useLiveQuery(
    db
      .select({
        idEspecimen: especimen.id,
        longitudTotalRectilinea: especimen.longitudTotalRectilinea,
      })
      .from(especimen)
      .where(
        and(
          eq(especimen.varamientoMasivoId, idVaramientoMasivo),
          eq(especimen.avisoId, idAviso)
        )
      )
  );

  const handleUpdateAviso = (idEspecimen: number) => {
    setIdEspecimenSelected(idEspecimen);
    console.log("Se ejecutó handleUpdateAviso", idEspecimen);
    route.push("screens/EspecimenPages/EspecimenPage");
  };
  const handleDelete = async (idEspecimen: number) => {
    try {
      await deleteEspecimenById(idEspecimen);
    } catch (error) {
      console.error("Error al eliminar el espécimen:", error);
      alert("No se pudo eliminar el espécimen. Por favor, intenta nuevamente.");
    }
  };

  function handleAddEspecimen(): void {
    console.log("desde especimen lista", idAviso, idVaramientoMasivo);

    if (!idAviso || !idVaramientoMasivo) return;
    const result = addEspecimenToVaramientoMasivo(idAviso, idVaramientoMasivo);
  }

  const renderItem = ({
    item,
  }: {
    item: { idEspecimen: number; longitudTotalRectilinea: string };
  }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Id del especimen: {item.idEspecimen}</Text>
      <Text style={styles.itemText}>
        Longitud total rectilinea: {item.longitudTotalRectilinea}
      </Text>
      {isModificable && (
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
            onPress={() => handleUpdateAviso(item.idEspecimen)}
          />
          <AntDesign
            name="delete"
            size={24}
            color="red"
            onPress={() => handleDelete(item.idEspecimen)}
          />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <InlineButton
        icon={<Ionicons name="add" size={24} color="black" />}
        text="Agregar Especimen"
        onPress={handleAddEspecimen}
      />
      <FlashList
        data={data as unknown as item[]}
        renderItem={renderItem}
        keyExtractor={(item) => item.idEspecimen.toString()}
        estimatedItemSize={200}
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

export default ListaEspecimen;
