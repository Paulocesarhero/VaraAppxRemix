import { Entypo } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CardAvisos from "../../../../components/CardAvisos/CardAvisos";
import { ColorsPalete } from "../../../../constants/COLORS";
import useAuthStore from "../../../../hooks/globalState/useAuthStore";
import useAvisoStore from "../../../../hooks/globalState/useAvisoStore";
import useListAvisoStore from "../../../../hooks/globalState/useListAvisosStore";

const ListaAvisos: React.FC = () => {
  const { avisos, fetchAvisosLocales, fetchAvisosRemotos, deleteAviso } =
    useListAvisoStore();
  const token = useAuthStore((state) => state.token);
  const { setIdSelected } = useAvisoStore();
  const [refreshing, setRefreshing] = useState(false);
  const pathname = usePathname();

  const loadData = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchAvisosLocales();
      if (token) {
        await fetchAvisosRemotos(token);
      }
    } catch (error) {
      console.error("Error al cargar avisos:", error);
    } finally {
      setRefreshing(false);
    }
  }, [token, fetchAvisosLocales, fetchAvisosRemotos]);

  const handleNuevoAviso = () => {
    router.push("screens/AvisoPage/AvisoPage");
  };

  const handleDeleteAviso = (id: string | number) => {
    deleteAviso(id);
  };

  const ITEM_HEIGHT = 200;

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (pathname === "/screens/ListaAvisos/ListaAvisos") {
      setIdSelected(0);
      console.log("se ejeciuto loadData");
    }
  }, [pathname]);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleNuevoAviso}>
        <Entypo name="new-message" size={24} color="black" />
        <Text style={styles.buttonText}>Nuevo aviso</Text>
      </TouchableOpacity>
      <FlatList
        onRefresh={loadData}
        data={avisos}
        keyExtractor={(item) => item.id.toString()}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        initialNumToRender={5}
        refreshing={false}
        renderItem={({ item }) => (
          <CardAvisos
            id={item.id}
            urlImage={item.fotografia}
            isModificable={item.isModificable}
            fechasDeAvistamiento={item?.fechaDeAvistamiento}
            cantidadDeAnimales={item.cantidadDeAnimales}
            onDelete={handleDeleteAviso}
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
});

export default ListaAvisos;
