import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { ColorsPalete } from "../../../constants/COLORS";
import Feather from "@expo/vector-icons/build/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import InlineButton from "../../../components/InlineButton/InlineButton";
import { Ionicons } from "@expo/vector-icons";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";
import useVaramientoMasivoStore from "../../../hooks/globalState/useVaramientoMasivo";
import { getAllEspecimenOfVaramientoMasivo } from "../../../database/repository/especimenRepo";

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
  const [itemList, setItemList] = useState<item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const idAviso = useAvisoStore((state) => state.idAvisoSelected);
  const idVaramientoMasivo = useVaramientoMasivoStore(
    (state) => state.idVaramientoMasivoSelected
  );
  const loadListaEspecimen = async () => {
    setIsLoading(true);
    try {
      if (idVaramientoMasivo != null) {
        const varamientos = await getAllEspecimenOfVaramientoMasivo(
          idAviso,
          idVaramientoMasivo
        );
        setItemList(varamientos as unknown as item[]);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Hubo un problema al obtener la lista de especímenes: " + String(error),
        [{ text: "Aceptar" }]
      );
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadListaEspecimen();
  }, [idAviso, idVaramientoMasivo]);

  const handleUpdateAviso = () => {
    // Update the specimen
  };
  const handleDelete = () => {};
  const renderItem = ({
    item,
  }: {
    item: { idEspecimen: number; longitudTotalRectilinea: string };
  }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        "Id del especimen " {item.idEspecimen}
      </Text>
      <Text style={styles.itemText}>
        "Longitud total rectilinea " {item.longitudTotalRectilinea}
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
            onPress={handleUpdateAviso}
          />
          <AntDesign
            name="delete"
            size={24}
            color="red"
            onPress={handleDelete}
          />
        </View>
      )}
    </View>
  );

  if (isLoading) {
    return <Text>Cargando datos...</Text>;
  }

  function handleAddEspecimen(): void {
    console.log(
      "se ejecuto handleAddEspecimen id VaramientoMasivo: " + idVaramientoMasivo
    );
    console.log("se ejecuto handleAddEspecimen: idAviso: " + idAviso);
  }

  return (
    <View style={styles.container}>
      <InlineButton
        icon={<Ionicons name="add" size={24} color="black" />}
        text="Agregar Especimen"
        onPress={handleAddEspecimen}
      ></InlineButton>
      <FlashList
        data={itemList}
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
    height: 100,
    padding: 10,
  },
  itemText: {
    fontSize: 18,
  },
});

export default ListaEspecimen;
