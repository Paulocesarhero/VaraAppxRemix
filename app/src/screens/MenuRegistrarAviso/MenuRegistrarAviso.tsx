import MaterialCard from "varaapplib/components/MaterialCard/MaterialCard";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";

const MenuRegistrarAviso: React.FC = () => {
  const router = useRouter();
  const handleAvisoIndividual = () => {
    router.push("src/screens/Stranding/StrandingPage");
  };

  return (
    <View>
      <MaterialCard
        onPress={handleAvisoIndividual}
        leftComponent={
          <Image
            source={require("../../assets/dolphin.imageset/dolphin.png")}
            contentFit={"cover"}
            style={{ width: 50, height: 50 }}
          />
        }
        label={"Aviso individual"}
      ></MaterialCard>
      <MaterialCard
        leftComponent={
          <Image
            source={require("../../assets/whale.imageset/whale.png")}
            contentFit={"cover"}
            style={{ width: 50, height: 50 }}
          />
        }
        label={"Varamiento masivo"}
      ></MaterialCard>
    </View>
  );
};
export default MenuRegistrarAviso;
