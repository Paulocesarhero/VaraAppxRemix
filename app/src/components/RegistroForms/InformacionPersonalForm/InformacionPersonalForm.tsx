import React, { useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { registroFormStyle } from "../RegistroForm.style";
import InputField from "../../MaterialInput/MaterialInput";
import MaterialSelector from "../../MaterialSelector/MaterialSelector";
import MaterialPasswordInput from "../../MaterialPassword/MaterialPassword";
import { RegistroCientifico } from "../../../services/AuthService";
import { RegistroCientificoRequest } from "../../../services/AuthServiceInterfaces";
import { InformacionPersonalFormStyle } from "./InformacionPersonalForm.style";

interface FormData {
  estado: string | null;
  nombre: string;
  apellidoPat: string;
  apellidoMat: string;
  institucion: string;
  telefonoMovil: string;
  password: string;
  correo: string;
  isValidPassword: boolean;
}

const InformacionPersonalForm: React.FC = () => {
  const estados = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Ciudad de México",
    "Coahuila de Zaragoza",
    "Colima",
    "Durango",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "México",
    "Michoacán de Ocampo",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz de Ignacio de la Llave",
    "Yucatán",
    "Zacatecas",
  ];

  const [formData, setFormData] = useState<FormData>({
    estado: null,
    nombre: "",
    apellidoPat: "",
    apellidoMat: "",
    institucion: "",
    telefonoMovil: "",
    password: "",
    correo: "",
    isValidPassword: false,
  });

  const scrollViewRef = useRef<ScrollView>(null);

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (newPassword: string, isValid: boolean) => {
    handleInputChange("password", newPassword);
    handleInputChange("isValidPassword", isValid);
  };

  const handleRegistroCientifico = async () => {
    if (!formData.isValidPassword) {
      Alert.alert("Error", "Por favor, ingrese una contraseña válida.");
      return;
    }

    const nuevoCientifico: RegistroCientificoRequest = {
      Nombre: formData.nombre,
      ApellidoPaterno: formData.apellidoPat,
      ApellidoMaterno: formData.apellidoMat,
      CorreoElectronico: formData.correo,
      Contraseña: formData.password,
      Institucion: formData.institucion,
      TelefonoMovil: formData.telefonoMovil,
      Estado: formData.estado || "",
      TelefonoFijo: "2282522839", //TODO agregar telefono
      Calle: "",
      CodigoPostal: "",
      Ciudad: "",
      Origen: "Aplicación Móvil Expertos",
    };

    try {
      const response = await RegistroCientifico(nuevoCientifico);
      console.log(response.message);
      console.log(response.data);

      if (!response.error) {
        Alert.alert("Éxito", "Registro científico realizado con éxito.");
      } else {
        Alert.alert("Advertencia", response.message[0]);
      }
    } catch (error) {
      console.error("Error en HandleRegistroCientifico:", error);
      Alert.alert(
        "Error",
        "El servidor no responde. Intente de nuevo más tarde.",
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={InformacionPersonalFormStyle.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Ajusta este valor según sea necesario
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={InformacionPersonalFormStyle.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={registroFormStyle.title}>Información personal</Text>
          <MaterialPasswordInput
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            onPasswordChange={handlePasswordChange}
            value={formData.password}
          />
          <InputField
            iconName="mail"
            iconFamily="Ionicons"
            label="Email"
            placeholder="cientifico@gmail.com"
            maxLength={50}
            autoCorrect={false}
            onTextChange={(value) => handleInputChange("correo", value)}
            value={formData.correo}
          />

          <InputField
            iconName="person"
            iconFamily="Ionicons"
            label="Nombre"
            placeholder="Nombre"
            autoCapitalize="words"
            maxLength={50}
            autoCorrect={false}
            onTextChange={(value) => handleInputChange("nombre", value)}
            value={formData.nombre}
          />
          <InputField
            iconName="person"
            iconFamily="Ionicons"
            label="Apellido paterno"
            placeholder="Apellido paterno"
            autoCapitalize="words"
            maxLength={50}
            autoCorrect={false}
            onTextChange={(value) => handleInputChange("apellidoPat", value)}
            value={formData.apellidoPat}
          />
          <InputField
            iconName="person"
            iconFamily="Ionicons"
            label="Apellido materno"
            placeholder="Apellido materno"
            autoCapitalize="words"
            maxLength={50}
            autoCorrect={false}
            onTextChange={(value) => handleInputChange("apellidoMat", value)}
            value={formData.apellidoMat}
          />
          <InputField
            iconName="graduation-cap"
            iconFamily="Entypo"
            label="Institución"
            placeholder="Ejemplo: Universidad Veracruzana"
            autoCapitalize="words"
            maxLength={50}
            autoCorrect={false}
            onTextChange={(value) => handleInputChange("institucion", value)}
            value={formData.institucion}
          />
          <InputField
            iconName="phone"
            iconFamily="Entypo"
            label="Teléfono móvil"
            placeholder="10 dígitos"
            keyboardType="phone-pad"
            textContentType={"telephoneNumber"}
            maxLength={10}
            autoCorrect={false}
            onTextChange={(value) => handleInputChange("telefonoMovil", value)}
            value={formData.telefonoMovil}
          />
          <MaterialSelector
            onEstadoChange={(value) => handleInputChange("estado", value)}
            estados={estados}
            label="Estado"
          />

          <TouchableWithoutFeedback onPress={handleRegistroCientifico}>
            <View style={InformacionPersonalFormStyle.submitButton}>
              <Text style={InformacionPersonalFormStyle.submitButtonText}>
                Enviar
              </Text>
              <Ionicons name="checkmark" size={24} color="black" />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InformacionPersonalForm;
