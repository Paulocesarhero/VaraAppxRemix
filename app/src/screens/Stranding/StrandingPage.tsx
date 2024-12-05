import { Pressable, View, Text } from "react-native";
import React, { useState } from "react";
import { ColorsPalete } from "../../constants/COLORS";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";
import { useRouter } from "expo-router";
import { AvisoForm } from "varaapplib/components/AvisoForm/AvisoForm";
import Ionicons from "@expo/vector-icons/Ionicons";

const StrandingPage: React.FC = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmitData = () => {};
  return (
    <View style={{ flex: 1, backgroundColor: ColorsPalete.light }}>
      <View style={{ height: "94%" }}>
        <AvisoForm
          onSubmitData={handleSubmitData}
          loading={loading}
          setLoading={setLoading}
        ></AvisoForm>
      </View>
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
          <View>
            <Text style={{ color: ColorsPalete.light }}>Menu</Text>
          </View>
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

export default StrandingPage;
