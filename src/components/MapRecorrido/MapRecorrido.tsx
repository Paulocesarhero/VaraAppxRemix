import React, { useEffect, useState } from "react";
import MapView, { Polyline, Marker } from "react-native-maps";
import * as Location from "expo-location";

interface MapRecorridoProps {
  isRecording: boolean;
}

const MapRecorrido: React.FC<MapRecorridoProps> = ({ isRecording }) => {
  const [routeCoordinates, setRouteCoordinates] = useState<
    { latitude: number; longitude: number }[]
  >([]);
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
        console.log("Permission to access location was denied");
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
          console.log("New location:", newCoordinate);

          setCurrentLocation(newCoordinate);
          setRouteCoordinates((prevCoordinates) => [
            ...prevCoordinates,
            newCoordinate,
          ]);
        }
      );

      setWatchId(id);
    };

    if (isRecording) {
      startLocationTracking();
    } else if (watchId) {
      watchId.remove();
      setWatchId(null);
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
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation ? currentLocation.latitude : 0,
          longitude: currentLocation ? currentLocation.longitude : 0,
          longitudeDelta: 0.0,
          latitudeDelta: 0.0,
        }}
      >
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#000"
          strokeWidth={3}
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
