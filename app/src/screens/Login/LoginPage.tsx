import { useRouter } from "expo-router";
import { Alert, Pressable, Text, View } from "react-native";
import { useState } from "react";
import LoginForm from "varaapplib/components/LoginForm/LoginForm";
import { LoginPageStyle } from "./LoginPage.style";
import { LoginViewModel } from "../../services/AuthServiceInterfaces";
import { Login } from "../../services/AuthService";
import useAuthStore from "../../hooks/useStore";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { setToken } = useAuthStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const HandleRegistroCientifico = () => {
    router.push("src/screens/RegistroCientificoPage/RegistroCientificoPage");
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const loginData: LoginViewModel = {
        CorreoElectronico: email,
        Contraseña: password,
      };
      const response = await Login(loginData);
      if (!response.error) {
        router.navigate({
          pathname: "src/screens/Recommendations/Recommendations",
        });
        setToken(response.data.token);
        setLoading(false);
      } else {
        Alert.alert(
          "Credenciales incorrectas",
          "Revise que esté bien su correo electrónico y contraseña"
        );
        setLoading(false);
      }
    } catch (error) {
      Alert.alert(
        "Error en el servidor",
        "Contacte al administrador del servidor"
      );
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <LoginForm
        loading={loading}
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onLoginPress={handleLogin}
      />
      <Pressable onPress={HandleRegistroCientifico}>
        <Text style={LoginPageStyle.TextCuenta}>Solicitar cuenta</Text>
      </Pressable>
    </View>
  );
};

export default LoginPage;
