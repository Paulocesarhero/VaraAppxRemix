import { View, TextInput } from "react-native";
import React, { useState } from "react";
import { LoginFormStyle } from "./LoginForm.style";
import RoundedButton from "../RoundedButton/RoundedButton";
import { COLORS } from "../../Constants/Colors";
import PasswordInput from "../PasswordInput/PasswordInput";
import { router } from "expo-router";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleLogin = () => {
    //TODO Aqui iria la confirmación del servidor
    router.navigate({
      pathname: "src/screens/Recommendations/Recommendations",
    });
  };

  return (
    <View style={LoginFormStyle.container}>
      <TextInput
        onChangeText={setEmail}
        style={LoginFormStyle.input}
        placeholder={"email"}
        autoComplete={"email"}
        value={email}
      ></TextInput>

      <PasswordInput value={password} onChangeText={setPassword} />
      <RoundedButton
        color={COLORS.primary}
        text={"Log in"}
        onPress={handleLogin}
      ></RoundedButton>
    </View>
  );
};

export default LoginForm;
