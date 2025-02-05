import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, View } from "react-native";

import InlineButton from "../../../components/InlineButton/InlineButton";
import ListaAvisosRecorrido from "../../../components/ListaAvisosRecorrido/ListaAvisosRecorrido";
import MapRecorrido from "../../../components/MapRecorrido/MapRecorrido";
import { updateRecorrido } from "../../../database/repository/RecorridoRepo";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";
import useRecorridoStore from "../../../hooks/globalState/useRecorridoStore";

const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

const calculateDistance = (
  coordinates: { latitude: number; longitude: number }[]
): number => {
  if (coordinates.length < 2) return 0;

  const R = 6371; // Radio de la Tierra en km

  let totalDistance = 0;

  for (let i = 0; i < coordinates.length - 1; i++) {
    const { latitude: lat1, longitude: lon1 } = coordinates[i];
    const { latitude: lat2, longitude: lon2 } = coordinates[i + 1];

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    totalDistance += R * c;
  }

  return totalDistance;
};

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
      if (idRecorridoSelected == null) {
        return;
      }
      try {
        await updateRecorrido({
          id: idRecorridoSelected,
          ruta: routeCoordinates,
          distanciaRecorrido: calculateDistance(routeCoordinates),
        });
      } catch (error: Error | any) {
        Alert.alert(
          "Error",
          "No se pudo guardar el recorrido " + error.message
        );
      }
      handleFormulario();
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
    }, [clearIdEspecimen, setIdAvisoSelected, setIdtaxaEspecie])
  );
  const handleFormulario = () => {
    router.push("screens/RecorridoPage/RecorridoFormPage");
  };
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <InlineButton
        text="Formulario de recorrido"
        onPress={() => handleFormulario()}
        icon={
          <MaterialCommunityIcons
            name="page-next-outline"
            size={24}
            color="black"
          />
        }
      />
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
      <ListaAvisosRecorrido />
    </View>
  );
};
export default RegistroRecorrido;
