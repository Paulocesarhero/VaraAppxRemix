import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";
import RecommendationsPage from "varaapplib/components/Recommendations/RecommendationsPage";

import { ColorsPalete } from "../../constants/COLORS";

const Recommendations: React.FC = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const handleRegistrarAviso = () => {
    router.push("src/components/ListaAvisos/ListaAvisos");
  };

  return (
    <View style={{ flex: 1, backgroundColor: ColorsPalete.light }}>
      <RecommendationsPage />
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
            <Text style={{ color: ColorsPalete.light }}>Avisos</Text>
          </Pressable>
        }
        rightComponent={
          <Pressable>
            <Ionicons name="settings" size={24} color="white" />
          </Pressable>
        }
      />
    </View>
  );
};
export default Recommendations;
