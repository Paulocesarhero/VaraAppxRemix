import React, { useCallback, useEffect, useState } from "react";
import { getAvisosVaraWeb } from "../../../../services/Avisos/GetAvisosVaraWeb";
import useAvisoStore from "../../../../hooks/globalState/useAvisoStore";
import useAuthStore from "../../../../hooks/globalState/useAuthStore";
import { router, usePathname } from "expo-router";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "../../../../database/connection/sqliteConnection";
import { avisos } from "../../../../database/schemas/avisoSchema";
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import CardAvisos from "../../../../components/CardAvisos/CardAvisos";
import { ColorsPalete } from "../../../../constants/COLORS";

const fetchDataFromAPI = async (token: string): Promise<Item[]> => {
  try {
    const avisosApi = await getAvisosVaraWeb(token);

    const avisosTransformados: Item[] = avisosApi.map((aviso) => ({
      fechaDeAvistamiento: aviso.fechaDeAvistamiento,
      cantidadDeAnimales: Number(aviso.cantidadDeAnimales),
      fotografia: aviso.fotografia,
      id: `${Date.now()}_${Math.random()}`,
      isModificable: false,
    }));

    return avisosTransformados;
  } catch (error) {
    console.error("Error al obtener avisos desde la API:", error);
    return [];
  }
};

interface Item {
  id: number | string;
  fechaDeAvistamiento?: string | null;
  cantidadDeAnimales?: number | null;
  fotografia: string | null;
  isModificable?: boolean;
}

const ListaAvisos: React.FC = () => {
  const [useLocalDB, setUseLocalDB] = useState<boolean>(true);
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token: barrerToken } = useAuthStore();

  const {
    setIdAvisoSelected,
    setIdEspecimen,
    setIdtaxaEspecie,
    clearIdEspecimen,
  } = useAvisoStore();

  const pathname = usePathname();

  const { data: localData } = useLiveQuery(
    db
      .select({
        id: avisos.id,
        fechaDeAvistamiento: avisos.fechaDeAvistamiento,
        cantidadDeAnimales: avisos.cantidadDeAnimales,
        fotografia: avisos.fotografia,
      })
      .from(avisos)
  );
  useEffect(() => {
    if (localData && useLocalDB) {
      const transformedData: Item[] = localData.map((item) => ({
        id: item.id,
        fechaDeAvistamiento: item.fechaDeAvistamiento,
        cantidadDeAnimales: item.cantidadDeAnimales,
        fotografia: item.fotografia,
        isModificable: true,
      }));
      setData(transformedData);
      setLoading(false); // Una vez que los datos están listos, setea loading a false
    }
  }, [localData, useLocalDB]);

  useEffect(() => {
    if (!useLocalDB) {
      setLoading(true);

      getAvisosVaraWeb(barrerToken)
        .then((data) => {
          const transformedData: Item[] = data.map((item) => ({
            id: item.id,
            fechaDeAvistamiento: item.fechaDeAvistamiento,
            cantidadDeAnimales: Number(item.cantidadDeAnimales), // Convierte a número
            fotografia: item.fotografia,
            isModificable: false,
          }));

          setData(transformedData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error);
          setLoading(false);
        });
    }
  }, [useLocalDB]);

  useEffect(() => {
    if (pathname === "/screens/ListaAvisos/ListaAvisos") {
      setIdAvisoSelected(0);
      setIdtaxaEspecie(0);
      clearIdEspecimen();
    }
  }, [pathname, setIdAvisoSelected, setIdtaxaEspecie, clearIdEspecimen]);

  const handleNuevoAviso = useCallback(() => {
    router.push("screens/AvisoPage/AvisoPage");
  }, []);

  const ITEM_HEIGHT = 200;

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Avisos en la nube</Text>
        <Switch
          trackColor={{ false: "#81b0ff", true: "#282853" }}
          thumbColor={useLocalDB ? "#54AD94" : "#f4f3f4"}
          value={useLocalDB}
          onValueChange={(value) => {
            setUseLocalDB(value);
          }}
        />
        <Text style={styles.switchLabel}>Avisos en el dispositivo</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNuevoAviso}>
        <Entypo name="new-message" size={24} color="black" />
        <Text style={styles.buttonText}>Nuevo aviso</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        initialNumToRender={5}
        refreshing={loading}
        renderItem={({ item }) => (
          <CardAvisos
            id={item.id}
            urlImage={item.fotografia}
            isModificable={item.isModificable}
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

export default ListaAvisos;
