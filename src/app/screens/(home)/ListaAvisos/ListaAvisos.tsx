import Entypo from "@expo/vector-icons/Entypo";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CardAvisos from "../../../../components/CardAvisos/CardAvisos";
import { ColorsPalete } from "../../../../constants/COLORS";
import { db } from "../../../../database/connection/sqliteConnection";
import { avisos } from "../../../../database/schemas/avisoSchema";
import useAuthStore from "../../../../hooks/globalState/useAuthStore";
import useAvisoStore from "../../../../hooks/globalState/useAvisoStore";
import { getAvisosVaraWeb } from "../../../../services/Avisos/GetAvisosVaraWeb";
import { isNull } from "drizzle-orm";
import { useCheckNetwork } from "../../../../hooks/validations";

interface Item {
  id: number | string;
  fechaDeAvistamiento?: string | null;
  cantidadDeAnimales?: number | null;
  fotografia: string | null;
  isModificable?: boolean;
  status?: string;
}

const ListaAvisos: React.FC = () => {
  const [useLocalDB, setUseLocalDB] = useState<boolean>(true);
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token: barrerToken } = useAuthStore();
  const checkNetwork = useCheckNetwork();
  const [error, setError] = useState<boolean>(false);

  const { setIdAvisoSelected, setIdtaxaEspecie, clearIdEspecimen } =
    useAvisoStore();

  const { data: localData } = useLiveQuery(
    db
      .select({
        id: avisos.id,
        fechaDeAvistamiento: avisos.fechaDeAvistamiento,
        cantidadDeAnimales: avisos.cantidadDeAnimales,
        fotografia: avisos.fotografia,
        nombre: avisos.nombre,
      })
      .from(avisos)
      .where(isNull(avisos.recorridoId))
  );
  useEffect(() => {
    setError(false);
    if (localData && useLocalDB) {
      const transformedData: Item[] = localData.map((item) => ({
        id: item.id,
        fechaDeAvistamiento: item.fechaDeAvistamiento,
        cantidadDeAnimales: item.cantidadDeAnimales,
        fotografia: item.fotografia,
        isModificable: true,
        status: item.nombre === "Subido" ? "En linea" : "Pendiente",
      }));
      setData(transformedData);
      setLoading(false);
    }
  }, [localData, useLocalDB]);

  useEffect(() => {
    const fetchData = async () => {
      if (useLocalDB) return;

      setLoading(true);

      try {
        const isOnline = await checkNetwork();
        if (!isOnline) {
          setError(true);
          return;
        }

        const data = await getAvisosVaraWeb(barrerToken);
        const transformedData: Item[] = data.map((item) => ({
          id: item.id,
          fechaDeAvistamiento: item.fechaDeAvistamiento,
          cantidadDeAnimales: Number(item.cantidadDeAnimales),
          fotografia: item.fotografia,
          isModificable: false,
        }));

        setData(transformedData);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [useLocalDB, barrerToken]);

  useFocusEffect(
    useCallback(() => {
      setIdAvisoSelected(0);
      setIdtaxaEspecie(0);
      clearIdEspecimen();
    }, [clearIdEspecimen, setIdAvisoSelected, setIdtaxaEspecie])
  );

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
      {error && (
        <Text>
          Ocurrió un error inesperado. Asegúrate de tener conexión a la red.
        </Text>
      )}
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
            idAviso={item.id}
            urlImage={item.fotografia}
            isModificable={item.isModificable}
            fechasDeAvistamiento={item?.fechaDeAvistamiento}
            cantidadDeAnimales={item.cantidadDeAnimales}
            status={item.status}
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
    borderWidth: StyleSheet.hairlineWidth,
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
