import { Pressable, View } from "react-native";
import React, { useState } from "react";
import { ColorsPalete } from "../../constants/COLORS";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";
import { useRouter } from "expo-router";
import { AvisoForm } from "varaapplib/components/AvisoForm/AvisoForm";

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
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
        }}
        leftComponent={
          <Pressable onPress={handleBack}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={ColorsPalete.light}
            />
          </Pressable>
        }
      ></CustomizableHeader>
    </View>
  );
};

export default StrandingPage;
