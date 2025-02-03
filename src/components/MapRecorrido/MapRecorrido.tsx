import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface MapRecorridoProps {
  isRecording: boolean;
  mapStyle?: StyleProp<ViewStyle>;
  routeCoordinates?: { latitude: number; longitude: number }[];
  setRouteCoordinates: React.Dispatch<
    React.SetStateAction<{ latitude: number; longitude: number }[]>
  >;
}

const MapRecorrido: React.FC<MapRecorridoProps> = ({
  isRecording,
  mapStyle,
  routeCoordinates,
  setRouteCoordinates,
}) => {
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [watchId, setWatchId] = useState<Location.LocationSubscription | null>(
    null
  );

  useEffect(() => {
    const startLocationTracking = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso para acceder a la ubicación denegado");
        return;
      }

      const id = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          const newCoordinate = { latitude, longitude };
          setCurrentLocation(newCoordinate);

          if (isRecording) {
            setRouteCoordinates((prevCoordinates) => [
              ...prevCoordinates,
              newCoordinate,
            ]);
          } else {
            if (watchId) {
              watchId.remove();
            }
          }
        }
      );

      setWatchId(id);
    };
    try {
      startLocationTracking();
    } catch (error) {
      console.error("Error al iniciar el tracking de la ubicación:", error);
      throw error;
    }

    return () => {
      if (watchId) {
        watchId.remove();
      }
    };
  }, [isRecording]);

  return (
    <>
      <MapView
        style={mapStyle}
        initialRegion={{
          latitude: currentLocation ? currentLocation.latitude : 0,
          longitude: currentLocation ? currentLocation.longitude : 0,
          longitudeDelta: 0.0,
          latitudeDelta: 0.0,
        }}
      >
        <Polyline
          coordinates={routeCoordinates || []}
          strokeColor="#383217"
          strokeWidth={6}
        />
        <Marker
          coordinate={currentLocation || { latitude: 0, longitude: 0 }}
          title="Tu posición"
          description="Estás aquí"
        />
      </MapView>
    </>
  );
};

export default MapRecorrido;
