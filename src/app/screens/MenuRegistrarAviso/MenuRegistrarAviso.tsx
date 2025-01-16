import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import MaterialCard from "varaapplib/components/MaterialCard/MaterialCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const MenuRegistrarAviso: React.FC = () => {
  const router = useRouter();
  const handleAvisoIndividual = () => {
    router.push("screens/EspecimenPages/EspecimenPage");
  };
  const handleVaramientoMasivo = () => {
    router.push("screens/VaramientoMasivoPage/VaramientoMasivoPage");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 40,
      }}
    >
      <MaterialCard
        onPress={handleAvisoIndividual}
        leftComponent={
          <MaterialIcons name="add-to-queue" size={24} color="black" />
        }
        label="Aviso individual"
      />
      <MaterialCard
        onPress={handleVaramientoMasivo}
        leftComponent={
          <MaterialIcons name="add-to-photos" size={50} color="black" />
        }
        label="Varamiento masivo"
      />
    </View>
  );
};
export default MenuRegistrarAviso;
