import { Alert, View, Text } from "react-native";
import React, { useState } from "react";
import { LoginFormStyle } from "./LoginForm.style";
import RoundedButton from "../RoundedButton/RoundedButton";
import { COLORS } from "../../Constants/Colors";
import PasswordInput from "../PasswordInput/PasswordInput";
import { Login } from "../../services/AuthService";
import { LoginViewModel } from "../../services/AuthServiceInterfaces";
import { router } from "expo-router";
import useAuthStore from "../../hooks/useStore";
import EmailInput from "../EmailInput/EmailInput";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setToken } = useAuthStore();
  const handleLogin = async () => {
    try {
      const loginData: LoginViewModel = {
        CorreoElectronico: email,
        Contraseña: password,
      };
      const response = await Login(loginData);
      if (!response.error) {
        router.navigate({
          pathname: "src/screens/Recommendations/RecommendationsPage",
        });
        setToken(response.data.token);
      } else {
        Alert.alert(
          "Credenciales incorrectas",
          "Revise que esté bien su correo electrónico y contraseña",
        );
      }
    } catch (error) {
      Alert.alert(
        "Credenciales incorrectas",
        "Revise que esté bien su correo electrónico y contraseña",
      );
    }
  };

  return (
    <View style={LoginFormStyle.container}>
      <Text style={LoginFormStyle.label}>Correo electrónico</Text>
      <EmailInput onEmailTextChange={setEmail} />
      <Text style={LoginFormStyle.label}>Contraseña</Text>
      <PasswordInput
        placeholder={"Contraseña"}
        value={password}
        onChangeText={setPassword}
      />
      <RoundedButton
        style={{ marginVertical: 30 }}
        color={COLORS.primary}
        text={"Log in"}
        onPress={handleLogin}
      ></RoundedButton>
    </View>
  );
};

export default LoginForm;
