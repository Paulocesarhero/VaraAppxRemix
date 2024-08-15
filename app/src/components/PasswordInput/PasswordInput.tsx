import { View, Text, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { PasswordInputStyle } from "./PasswordInput.style";
import { PasswordInputProps } from "./PasswordInputProps";
const PasswordInput: React.FC<PasswordInputProps> = ({ ...rest }) => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  return (
    <View>
      <TextInput
        autoComplete={"password"}
        style={PasswordInputStyle.input}
        secureTextEntry={showPassword}
        placeholder="Password"
        {...rest}
      />
      <Pressable
        style={PasswordInputStyle.toggleButton}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Text style={PasswordInputStyle.toggleButtonText}>
          {showPassword ? "Mostrar" : "Ocultar"}
        </Text>
      </Pressable>
    </View>
  );
};

export default PasswordInput;
