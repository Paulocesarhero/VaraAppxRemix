import React, { FC, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { MaterialInputStyle } from "./MaterialInput.style";
import { MaterialInputProps } from "./MaterialInputProps";

const InputField: FC<MaterialInputProps> = ({
  IsRequired = true,
  label,
  placeholder,
  iconName = "person",
  iconFamily = "Ionicons",
  onTextChange,
  ...props
}) => {
  const [text, setText] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const getBorderColor = (): string => {
    let borderColor = "#000";

    if (!IsRequired) {
      borderColor = "#000";
    } else if ("" === text) {
      borderColor = "#8B0000";
    } else {
      borderColor = "#008000";
    }

    return borderColor;
  };

  const getBackgroundColor = (): string => {
    if (!IsRequired) {
      return "#FFF";
    }
    if (isFocused && text === "") {
      return "#FADBD8";
    }
    if (text !== "") {
      return "#D5F5E3";
    }
    return "#FFF";
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
    return null;
  };

  return (
    <View style={MaterialInputStyle.container}>
      <Text style={MaterialInputStyle.label}>{label}</Text>
      <View
        style={[
          MaterialInputStyle.inputContainer,
          {
            borderColor: getBorderColor(),
            backgroundColor: getBackgroundColor(),
          },
        ]}
      >
        {renderIcon()}
        <TextInput
          style={MaterialInputStyle.input}
          placeholder={placeholder}
          value={text}
          onChangeText={(newText) => {
            setText(newText);
            onTextChange(newText);
          }}
          onFocus={() => setIsFocused(true)}
          {...props}
        />
        {text !== "" && (
          <TouchableOpacity
            onPress={() => {
              setText("");
              onTextChange("");
            }}
          >
            <Entypo name="erase" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      {IsRequired && text === "" && (
        <Text style={MaterialInputStyle.helperText}>
          Por favor ingrese {label.toLowerCase()}
        </Text>
      )}
    </View>
  );
};

export default InputField;
