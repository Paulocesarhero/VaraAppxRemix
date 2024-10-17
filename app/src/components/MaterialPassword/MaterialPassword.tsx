import React, { FC, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../Constants/Colors";

interface PasswordInputProps extends TextInputProps {
  label: string;
  placeholder: string;
  IsRequired?: boolean;
  onPasswordChange: (password: string, isValid: boolean) => void;
  value?: string;
}

const MaterialPassword: FC<PasswordInputProps> = ({
  IsRequired = true,
  label,
  placeholder,
  onPasswordChange,
  value,
  ...props
}) => {
  const [text, setText] = useState<string>(value || "");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    if (value !== undefined) {
      setText(value);
      validatePassword(value);
    }
  }, [value]);

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const valid =
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChars;

    setIsValid(valid);
    return valid;
  };

  const handleChangeText = (value: string) => {
    setText(value);
    const valid = validatePassword(value);
    onPasswordChange(value, valid);
  };

  const getBorderColor = (): string => {
    if (!IsRequired) return "#000"; // Normal (negro)
    if (text === "") return "#8B0000"; // Rojo para error
    return isValid ? "#008000" : "#8B0000"; // Verde para éxito, rojo si no es válido
  };

  const getBackgroundColor = (): string => {
    if (!IsRequired) return "#FFF";
    if (isFocused && text === "") return "#FADBD8"; // Fondo claro para error
    return isValid && text !== "" ? "#D5F5E3" : "#FFF"; // Fondo claro para éxito
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
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={text}
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={!isPasswordVisible}
          {...props}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color={getBorderColor()}
          />
        </TouchableOpacity>
        {text !== "" && (
          <TouchableOpacity onPress={() => handleChangeText("")}>
            <Entypo name="erase" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      {IsRequired && text === "" && (
        <Text style={styles.helperText}>
          Por favor ingrese {label.toLowerCase()}
        </Text>
      )}
      {!isValid && text !== "" && (
        <Text style={styles.errorText}>
          La contraseña debe tener al menos 8 caracteres, incluir letras
          mayúsculas y minúsculas, números y caracteres especiales.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
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
  errorText: {
    fontSize: 14,
    color: "#8B0000", // Rojo para el mensaje de error
    marginTop: 5,
  },
});

export default MaterialPassword;
