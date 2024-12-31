import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";

import { ListaAvisosStyle } from "./ListaAvisosStyle";
import CardAvisos from "../../../components/CardAvisos/CardAvisos";
import { ColorsPalete } from "../../../constants/COLORS";
import useAuthStore from "../../../hooks/globalState/useAuthStore";
import { handleBack } from "../../../hooks/router";
import { Aviso, getAvisos } from "../../../services/Avisos/GetAvisos";

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

  return (
    <View style={ListaAvisosStyle.container}>
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
    </View>
  );
};

export default ListaAvisos;
