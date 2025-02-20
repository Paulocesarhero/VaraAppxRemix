import { Ionicons } from "@expo/vector-icons";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";
import InformacionPersonalForm from "varaapplib/components/InformacionPersonalForm/InformacionPersonalForm";

import { ColorsPalete } from "../../../constants/COLORS";
import { RegistroCientifico } from "../../../services/Auth/AuthService";

const RegistroCientificoPage: React.FC = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (data: any) => {
    setLoading(true);
    try {
      await RegistroCientifico(data);
      Alert.alert(
        "Registro enviado",
        "Deberá esperar a que el administrador acepte su cuenta"
      );
      router.back();
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert(
          "Error al registrar al científico",
          "El correo ya esta en uso"
        );
      } else {
        Alert.alert("Error en el servidor", "Contacte al soporte tecnioc");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: 10,
        backgroundColor: ColorsPalete.light,
      }}
    >
      <CustomizableHeader
        containerStyle={{ backgroundColor: ColorsPalete.light }}
        leftComponent={
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={handleBack}
          />
        }
        rightComponent={<View style={{ height: 24, width: 24 }} />}
      />
      <InformacionPersonalForm
        onSubmitData={handleOnSubmit}
        loading={loading}
        setLoading={setLoading}
      />
    </View>
  );
};

export const RegistroCientificoStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  TextTitle: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",

    alignSelf: "center",
  },
  cancelarButton: {
    color: "white",
    fontSize: 15,
    padding: 5,
  },
});

export default RegistroCientificoPage;
