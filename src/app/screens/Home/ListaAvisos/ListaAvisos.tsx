import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CardAvisos from "../../../../components/CardAvisos/CardAvisos";
import { ColorsPalete } from "../../../../constants/COLORS";
import { getAvisosBdLocal } from "../../../../database/repository/avisoRepo";
import useAuthStore from "../../../../hooks/globalState/useAuthStore";
import {
  AvisoApiGet,
  getAvisosVaraWeb,
} from "../../../../services/Avisos/GetAvisosVaraWeb";

const ListaAvisos: React.FC = () => {
  const [avisos, setAvisos] = useState<AvisoApiGet[]>([]);
  const [orden, setOrden] = useState<"fecha" | "modificable">("fecha");
  const token = useAuthStore((state) => state.token);

  const handleNuevoAviso = () => {
    router.push("screens/AvisoPage/AvisoPage");
  };

  const handleDeleteAviso = (idAviso: string | number) => {
    // Filtrar el aviso eliminado de la lista
    const nuevosAvisos = avisos.filter(
      (aviso) => aviso.id !== idAviso.toString()
    );

    // Actualizar el estado con la nueva lista
    setAvisos(nuevosAvisos);
  };
  const CardAvisosMemo = React.memo(CardAvisos);

  const getAvisosDesdeApi = async (token: string) => {
    try {
      const avisosDataApi = await getAvisosVaraWeb(token);
      return avisosDataApi.map((aviso) => ({
        fechaDeAvistamiento: aviso.fechaDeAvistamiento,
        cantidadDeAnimales: aviso.cantidadDeAnimales,
        fotografia: aviso.fotografia,
        id: `${Date.now()}_${Math.random()}`,
        isModificable: false,
      }));
    } catch (error) {
      console.error("Error al obtener avisos desde la API:", error);
      return [];
    }
  };

  const getAvisosDesdeBdLocal = async () => {
    try {
      const avisosBdLocal = await getAvisosBdLocal();
      return avisosBdLocal.map((aviso) => ({
        isModificable: true,
        id: aviso.id,
        fechaDeAvistamiento: aviso.FechaDeAvistamiento,
        cantidadDeAnimales: aviso.CantidadDeAnimales,
        fotografia: aviso.Fotografia,
      }));
    } catch (error) {
      console.error(
        "Error al obtener avisos desde la base de datos local:",
        error
      );
      return [];
    }
  };

  useEffect(() => {
    const fetchAvisos = async () => {
      if (!token) return;

      const avisosApi = await getAvisosDesdeApi(token);
      const avisosBdLocal = await getAvisosDesdeBdLocal();

      setAvisos([...avisosApi, ...avisosBdLocal]);
    };

    fetchAvisos();
  }, [token, avisos]);

  const ITEM_HEIGHT = 200;
  return (
    <View style={ListaAvisosStyle.container}>
      <TouchableOpacity
        style={ListaAvisosStyle.button}
        onPress={handleNuevoAviso}
      >
        <Entypo name="new-message" size={24} color="black" />
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Nuevo aviso</Text>
      </TouchableOpacity>
      <FlatList
        data={avisos}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        keyExtractor={(item) => item.id.toString()}
        refreshing={false}
        renderItem={({ item }) => (
          <CardAvisosMemo
            id={item.id}
            urlImage={item.fotografia}
            isModificable={item.isModificable}
            fechasDeAvistamiento={
              item.fechaDeAvistamiento
                ? new Date(item.fechaDeAvistamiento)
                : null
            }
            cantidadDeAnimales={item.cantidadDeAnimales}
            onDelete={handleDeleteAviso}
          />
        )}
        contentContainerStyle={ListaAvisosStyle.list}
      />
    </View>
  );
};

const ListaAvisosStyle = StyleSheet.create({
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
    borderWidth: 0.5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
});

export default ListaAvisos;
