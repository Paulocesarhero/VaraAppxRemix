import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";

import { ListaAvisosStyle } from "./ListaAvisosStyle";
import { ColorsPalete } from "../../constants/COLORS";
import { handleBack } from "../../hooks/router";
import useAuthStore from "../../hooks/useStore";
import { Aviso, getAvisos } from "../../services/Avisos/GetAvisos";
import CardAvisos from "../CardAvisos/CardAvisos";

const ListaAvisos: React.FC = () => {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [orden, setOrden] = useState<"fecha" | "modificable">("fecha");
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchAvisos = async () => {
      if (!token) return;

      const avisosDataApi = await getAvisos(token);

      const avisosDataTransform = avisosDataApi.map((aviso) => ({
        ...aviso,
        isModificable: false,
      }));

      setAvisos(avisosDataTransform);
    };

    fetchAvisos();
  }, [token]);
  const avisosOrdenados = useMemo(() => {
    return [...avisos].sort((a, b) => {
      if (orden === "modificable") {
        return a.isModificable === b.isModificable
          ? 0
          : a.isModificable
            ? -1
            : 1;
      }
      return 0;
    });
  }, [avisos, orden]);

  return (
    <View style={ListaAvisosStyle.container}>
      <View style={ListaAvisosStyle.header}>
        <TouchableOpacity onPress={() => setOrden("fecha")}>
          <Text style={ListaAvisosStyle.button}>Ordenar por Fecha</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOrden("modificable")}>
          <Text style={ListaAvisosStyle.button}>Ordenar por Modificable</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={avisos}
        keyExtractor={(item) => item.id.toString()}
        refreshing={false}
        renderItem={({ item }) => (
          <CardAvisos
            urlImage={item.fotografia}
            isModificable={item.isModificable}
            fechasDeAvistamiento={item.fechaDeAvistamiento}
            cantidadDeAnimales={item.cantidadDeAnimales}
          />
        )}
        contentContainerStyle={ListaAvisosStyle.list}
      />
      <CustomizableHeader
        containerStyle={{
          backgroundColor: ColorsPalete.dark,
          height: "6%",
        }}
        leftComponent={
          <Pressable onPress={handleBack}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={ColorsPalete.light}
            />
          </Pressable>
        }
      />
    </View>
  );
};

export default ListaAvisos;
