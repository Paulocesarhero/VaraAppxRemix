import React from "react";
import { Pressable, Text, View } from "react-native";
import RecommendationsPage from "varaapplib/components/Recommendations/RecommendationsPage";
import { ColorsPalete } from "../../Constants/Colors";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const Recommendations: React.FC = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const handleRegistrarAviso = () => {
    router.push("src/screens/AccionesYResultadosPage/AccionesYResultadosPage");
  };

  return (
    <View style={{ flex: 1, backgroundColor: ColorsPalete.light }}>
      <RecommendationsPage></RecommendationsPage>
      <CustomizableHeader
        containerStyle={{
          backgroundColor: ColorsPalete.dark,
          height: "6%",
        }}
        leftComponent={
          <Pressable onPress={handleBack}>
            <MaterialIcons name="logout" size={24} color={ColorsPalete.light} />
          </Pressable>
        }
        centerComponent={
          <Pressable onPress={handleRegistrarAviso}>
            <Text style={{ color: ColorsPalete.light }}>Registrar aviso</Text>
          </Pressable>
        }
        rightComponent={
          <Pressable>
            <Ionicons name="settings" size={24} color="white" />
          </Pressable>
        }
      ></CustomizableHeader>
    </View>
  );
};
export default Recommendations;
