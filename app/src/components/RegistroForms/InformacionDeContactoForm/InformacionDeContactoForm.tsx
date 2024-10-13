import { Text, View } from "react-native";
import React from "react";
import { registroFormStyle } from "../RegistroForm.style";

const InformacionDeContactoForm: React.FC = () => {
  return (
    <View>
      <Text style={registroFormStyle.title}>Información de contacto</Text>
    </View>
  );
};

export default InformacionDeContactoForm;
