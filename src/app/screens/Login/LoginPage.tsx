import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import LoginForm from "varaapplib/components/LoginForm/LoginForm";

import useAuthStore from "../../../hooks/globalState/useAuthStore";
import useSettingStore from "../../../hooks/globalState/useSettingStore";
import { Login } from "../../../services/Auth/AuthService";
import { LoginViewModel } from "../../../services/Auth/AuthServiceInterfaces";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { isLoggedIn, actions } = useSettingStore();
  const { setToken } = useAuthStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const HandleRegistroCientifico = () => {
    router.push("screens/RegistroCientificoPage/RegistroCientificoPage");
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
          pathname: "screens/Home/Recommendations/Recommendations",
        });
        setToken(response.data.token);
        actions.setLoggedIn(true);
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
            <Text
              style={[
                LoginPageStyle.TextCuenta,
                isKeyboardVisible && { bottom: 0, height: 0, width: 0 }, // Ajusta la posición si el teclado está visible
              ]}
            >
              Solicitar cuenta
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const LoginPageStyle = StyleSheet.create({
  TextCuenta: {
    position: "absolute",
    fontSize: 17,
    bottom: 40,
    left: 0,
    right: 0,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
export default LoginPage;
