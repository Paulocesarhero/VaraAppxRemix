import React, { useState } from "react";
import { View, Text } from "react-native";
import InlineButton from "../../../../components/InlineButton/InlineButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MapRecorrido from "../../../../components/MapRecorrido/MapRecorrido";

const ListaRecorrido: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const color = () => {
    if (isRecording) {
      return "green";
    }
    return "black";
  };
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <InlineButton
        text={isRecording ? "Registrar recorrido" : "Guardar recorrido"}
        icon={
          <MaterialIcons
            name="play-circle-outline"
            size={24}
            style={{ color: color() }}
          />
        }
        onPress={() => setIsRecording(!isRecording)}
      />
      <Text style={{ color: color() }}>
        Presione el mapa para registrar un aviso
      </Text>
      <MapRecorrido isRecording={isRecording} />
    </View>
  );
};
export default ListaRecorrido;
