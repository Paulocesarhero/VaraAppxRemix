import React, { FC, useState } from "react";
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

interface InputFieldProps extends TextInputProps {
  label: string;
  placeholder: string;
  IsRequired?: boolean;
  iconName?: string; // El nombre del ícono
  iconFamily?: "Ionicons" | "Entypo"; // La familia de íconos
}

const InputField: FC<InputFieldProps> = ({
  IsRequired = true,
  label,
  placeholder,
  iconName = "person",
  iconFamily = "Ionicons",
  ...props
}) => {
  const [text, setText] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const getBorderColor = (): string => {
    let borderColor = "#000"; // Valor por defecto

    if (!IsRequired) {
      borderColor = "#000"; // Normal (negro)
    } else if ("" === text) {
      borderColor = "#8B0000"; // Rojo para error
    } else {
      borderColor = "#008000"; // Verde para éxito
    }

    return borderColor;
  };

  const getBackgroundColor = (): string => {
    if (!IsRequired) {
      return "#FFF";
    }
    if (isFocused && text === "") {
      return "#FADBD8";
    } // Fondo claro para error
    if (text !== "") {
      return "#D5F5E3";
    } // Fondo claro para éxito
    return "#FFF"; // Normal (blanco)
  };

  const renderIcon = () => {
    if (iconFamily === "Ionicons") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return <Ionicons name={iconName} size={24} color={getBorderColor()} />;
    } else if (iconFamily === "Entypo") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return <Entypo name={iconName} size={24} color={getBorderColor()} />;
    }
    return null; // Si no coincide ninguna familia
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
        {renderIcon()}
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
      {IsRequired && text === "" && (
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
