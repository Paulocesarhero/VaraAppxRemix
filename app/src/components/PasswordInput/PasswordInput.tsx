import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { PasswordInputStyle } from "./PasswordInput.style";
import { PasswordInputProps } from "./PasswordInputProps";
import { NoVisibleEye, VisibleEye } from "../../icons/icons"; // Importar los íconos

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const EyeIcon = isPasswordVisible ? NoVisibleEye : VisibleEye;

  return (
    <View style={PasswordInputStyle.container}>
      <TextInput
        autoComplete="password"
        style={PasswordInputStyle.input}
        secureTextEntry={!isPasswordVisible} // Contraseña oculta por defecto
        placeholder="Password"
        {...props}
      />
      <Pressable
        style={PasswordInputStyle.iconButton}
        onPress={togglePasswordVisibility}
      >
        <EyeIcon size={24} color="gray" />
      </Pressable>
    </View>
  );
};

export default PasswordInput;
