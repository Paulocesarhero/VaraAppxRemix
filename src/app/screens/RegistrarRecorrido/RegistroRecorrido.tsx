import React, { useState } from "react";
import { View, Text } from "react-native";
import InlineButton from "../../../components/InlineButton/InlineButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MapRecorrido from "../../../components/MapRecorrido/MapRecorrido";
import ListaAvisosRecorrido from "../../../components/ListaAvisosRecorrido/ListaAvisosRecorrido";

const RegistroRecorrido: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [routeCoordinates, setRouteCoordinates] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const onPressButton = () => {
    setIsRecording(!isRecording);
    if (isRecording === true && routeCoordinates.length > 0) {
    }
  };
  const color = () => {
    if (isRecording) {
      return "green";
    }
    return "black";
  };
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <InlineButton
        text={isRecording ? "Guardar recorrido" : "Registrar recorrido"}
        styleText={{ color: color() }}
        styleView={{ borderColor: color() }}
        icon={
          isRecording ? (
            <MaterialIcons
              name="pause-circle-outline"
              size={24}
              style={{ color: color() }}
            />
          ) : (
            <MaterialIcons
              name="play-circle-outline"
              size={24}
              style={{ color: color() }}
            />
          )
        }
        onPress={() => setIsRecording(!isRecording)}
      />

      <MapRecorrido
        routeCoordinates={routeCoordinates}
        setRouteCoordinates={setRouteCoordinates}
        mapStyle={{
          flex: 0.5,
          borderRadius: 15,
          borderWidth: 0.5,
          marginTop: 10,
        }}
        isRecording={isRecording}
      />
      <ListaAvisosRecorrido></ListaAvisosRecorrido>
    </View>
  );
};
export default RegistroRecorrido;
