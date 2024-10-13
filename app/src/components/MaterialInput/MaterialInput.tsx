import React, { useState, FC } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../Constants/Colors";

interface InputFieldProps extends TextInputProps {
  label: string;
  placeholder: string;
  IsRequired?: boolean;
}

const InputField: FC<InputFieldProps> = ({
  IsRequired = true,
  label,
  placeholder,
  ...props
}) => {
  const [text, setText] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const getBorderColor = (): string => {
    if (!IsRequired) return "#000";
    if (IsRequired && text === "") return "#8B0000"; // Rojo para error
    if (text !== "") return "#008000"; // Verde para éxito
    return "#000"; // Normal (negro)
  };

  const getBackgroundColor = (): string => {
    if (!IsRequired) return "#FFF";
    if (isFocused && text === "") return "#FADBD8"; // Fondo claro para error
    if (text !== "") return "#D5F5E3"; // Fondo claro para éxito
    return "#FFF"; // Normal (blanco)
  };

  const getIconName = (): "checkmark-circle" | "close-circle" | "person" => {
    if (text !== "") return "person"; // Icono verde de éxito
    if (isFocused && text === "") return "person"; // Icono de error
    return "person"; // Icono de usuario
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: getBorderColor(),
            backgroundColor: getBackgroundColor(),
          },
        ]}
      >
        <Ionicons name={getIconName()} size={24} color={getBorderColor()} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={text}
          onChangeText={setText}
          onFocus={() => setIsFocused(true)}
          {...props}
        />
        {text !== "" && (
          <TouchableOpacity onPress={() => setText("")}>
            <Entypo name="erase" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      {isFocused && text === "" && (
        <Text style={styles.helperText}>
          Por favor ingrese {label.toLowerCase()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: "#4A0404",
  },
  helperText: {
    fontSize: 14,
    color: COLORS.black,
    marginTop: 5,
  },
});

export default InputField;
