import React from "react";
import {
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { LoginPageStyle } from "./LoginPage.style";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../Constants/Colors";
import { Image } from "expo-image";
import LoginForm from "../../components/LoginForm/LoginForm";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const HandleRegistroCientifico = () => {
    router.push({
      pathname: "src/screens/RegistroCientificoPage/RegistroCientificoPage",
    });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaProvider>
        <SafeAreaView style={LoginPageStyle.container} edges={["top"]}>
          <LinearGradient
            colors={[
              COLORS.gradientStart,
              COLORS.gradientMiddle,
              COLORS.gradientEnd,
            ]}
            style={LoginPageStyle.background}
          >
            <Image
              source={require("../../assets/logo.imageset/logo.png")}
              style={LoginPageStyle.image}
            />
            <LoginForm />
            <View style={LoginPageStyle.containerForgotPassword}>
              <Pressable>
                <Text
                  style={[
                    LoginPageStyle.textForgotPassword,
                    LoginPageStyle.textBold,
                  ]}
                >
                  ¿Olvidaste tu contraseña?
                </Text>
              </Pressable>
              <Text
                style={[
                  LoginPageStyle.textForgotPassword,
                  LoginPageStyle.spaceBetweenText,
                ]}
              >
                ¿No tienes una cuenta?
                <Pressable onPress={HandleRegistroCientifico}>
                  <Text
                    style={[
                      LoginPageStyle.textForgotPassword,
                      LoginPageStyle.textBold,
                      LoginPageStyle.space,
                    ]}
                  >
                    Crear cuenta
                  </Text>
                </Pressable>
              </Text>
            </View>
          </LinearGradient>
        </SafeAreaView>
      </SafeAreaProvider>
    </TouchableWithoutFeedback>
  );
};

export default LoginPage;
