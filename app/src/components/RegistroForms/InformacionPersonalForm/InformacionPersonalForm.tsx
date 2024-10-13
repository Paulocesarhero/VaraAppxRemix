import { Text, View } from "react-native";
import InputWithTitleAndExample from "../InputWithTitleAndExample/InputWithTitleAndExample";
import React from "react";
import { informacionPersonalFormStyle } from "./InformacionPersonalForm.style";

const InformacionPersonalForm: React.FC = () => {
  return (
    <View>
      <Text style={informacionPersonalFormStyle.title}>
        Información personal
      </Text>
      <InputWithTitleAndExample
        title="Nombre"
        example="Ingrese su nombre"
        textInputProps={{
          autoCapitalize: "words",
          keyboardType: "default",
          maxLength: 50,
          autoCorrect: false,
        }}
      />
      <InputWithTitleAndExample
        title="Apellido paterno"
        example="Ingrese su apellido paterno"
        textInputProps={{
          autoCapitalize: "words",
          keyboardType: "default",
          maxLength: 50,
          autoCorrect: false,
        }}
      />
      <InputWithTitleAndExample
        title="Apellido materno"
        example="Ingrese su apellido materno"
        textInputProps={{
          autoCapitalize: "words",
          keyboardType: "default",
          maxLength: 50,
          autoCorrect: false,
        }}
      />
      <InputWithTitleAndExample
        title="Institución"
        example="Ejemplo: Universidad Veracruzana"
        textInputProps={{
          autoCapitalize: "words",
          keyboardType: "default",
          maxLength: 50,
          autoCorrect: false,
        }}
        containerStyle={{ borderBottomWidth: 1 }}
      />
    </View>
  );
};

export default InformacionPersonalForm;
