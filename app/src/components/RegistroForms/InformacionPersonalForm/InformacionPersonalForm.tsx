import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { registroFormStyle } from "../RegistroForm.style";
import InputField from "../../MaterialInput/MaterialInput";

const InformacionPersonalForm: React.FC = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
        style={registroFormStyle.container}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={registroFormStyle.title}>Información personal</Text>
          <InputField
            iconName={"person"}
            iconFamily={"Ionicons"}
            label="Nombre"
            placeholder="Nombre"
            autoCapitalize="words"
            maxLength={50}
            autoCorrect={false}
          />
          <InputField
            iconName={"person"}
            iconFamily={"Ionicons"}
            label="Apellido paterno"
            placeholder="Apellido paterno"
            autoCapitalize="words"
            maxLength={50}
            autoCorrect={false}
          />
          <InputField
            iconName={"person"}
            iconFamily={"Ionicons"}
            label="Apellido paterno"
            placeholder="Apellido materno"
            autoCapitalize="words"
            maxLength={50}
            autoCorrect={false}
          />
          <InputField
            iconName={"graduation-cap"}
            iconFamily={"Entypo"}
            label="Institución"
            placeholder="Ejemplo: Universidad Veracruzana"
            autoCapitalize="words"
            maxLength={50}
            autoCorrect={false}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default InformacionPersonalForm;
