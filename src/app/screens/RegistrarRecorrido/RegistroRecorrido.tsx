import React, { useCallback, useState } from "react";
import { View, Text, Alert } from "react-native";
import InlineButton from "../../../components/InlineButton/InlineButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MapRecorrido from "../../../components/MapRecorrido/MapRecorrido";
import ListaAvisosRecorrido from "../../../components/ListaAvisosRecorrido/ListaAvisosRecorrido";
import { useFocusEffect, useRouter } from "expo-router";
import useRecorridoStore from "../../../hooks/globalState/useRecorridoStore";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";
import { updateRecorrido } from "../../../database/repository/RecorridoRepo";

const RegistroRecorrido: React.FC = () => {
  const { setIdAvisoSelected, setIdtaxaEspecie, clearIdEspecimen } =
    useAvisoStore();
  const { idRecorridoSelected } = useRecorridoStore();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const router = useRouter();
  const [routeCoordinates, setRouteCoordinates] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const onPressButton = async () => {
    setIsRecording(!isRecording);
    if (isRecording && routeCoordinates.length > 0) {
      console.log("idRecorridoSelected", idRecorridoSelected);
      console.log("routeCoordinates", routeCoordinates);
      if (idRecorridoSelected == null) {
        return;
      }
      try {
        console.log("se entro al update");
        await updateRecorrido({
          id: idRecorridoSelected,
          ruta: routeCoordinates,
        });
      } catch (error) {
        Alert.alert("Error", "No se pudo guardar el recorrido");
      }

      router.push("/screens/RecorridoPage/RecorridoPage");
    }
  };
  const color = () => {
    if (isRecording) {
      return "green";
    }
    return "black";
  };
  useFocusEffect(
    useCallback(() => {
      setIdAvisoSelected(0);
      setIdtaxaEspecie(0);
      clearIdEspecimen();
    }, [])
  );
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <InlineButton
        text={isRecording ? "Guardar recorrido" : "Iniciar recorrido"}
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
        onPress={onPressButton}
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
