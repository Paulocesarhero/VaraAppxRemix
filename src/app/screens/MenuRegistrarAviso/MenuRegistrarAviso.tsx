import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import MaterialCard from "varaapplib/components/MaterialCard/MaterialCard";

const MenuRegistrarAviso: React.FC = () => {
  const router = useRouter();
  const handleAvisoIndividual = () => {
    router.push("screens/EspecimenPages/EspecimenPage");
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
          <Image
            source={require("../../../assets/dolphin.imageset/dolphin.png")}
            contentFit="cover"
            style={{ width: 50, height: 50 }}
          />
        }
        label="Aviso individual"
      />
      <MaterialCard
        leftComponent={
          <Image
            source={require("../../../assets/whale.imageset/whale.png")}
            contentFit="cover"
            style={{ width: 50, height: 50 }}
          />
        }
        label="Varamiento masivo"
      />
    </View>
  );
};
export default MenuRegistrarAviso;
