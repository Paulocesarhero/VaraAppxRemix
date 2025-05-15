import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import InformacionPersonalForm from "varaapplib/components/InformacionPersonalForm/InformacionPersonalForm";
import { RegistroCientifico } from "../services/Auth/AuthService";
import InlineButton from "../components/InlineButton/InlineButton";

const RegistroCientificoPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const CustomButton = ({ onPress }: { onPress?: () => void }) => (
    <InlineButton
      text="Enviar registro"
      icon={
        <MaterialCommunityIcons name="content-save" size={24} color="black" />
      }
      onPress={onPress}
      isLoading={loading}
    />
  );

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
    <View style={{ marginHorizontal: 5, flex: 1 }}>
      <InformacionPersonalForm
        scroolViewStyles={{ paddingHorizontal: 0, paddingBottom: 100 }}
        onSubmitData={handleOnSubmit}
        loading={loading}
        setLoading={setLoading}
        // @ts-ignore
        reactNodeButton={CustomButton}
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
