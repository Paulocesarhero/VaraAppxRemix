import React from "react";
import { Pressable, Text, View } from "react-native";
import { LoginPageStyle } from "./LoginPage.style";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../Constants/Colors";
import { Image } from "expo-image";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <View style={LoginPageStyle.container}>
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
            <Pressable>
              <Text
                style={[
                  LoginPageStyle.textForgotPassword,
                  LoginPageStyle.textBold,
                ]}
              >
                {" "}
                Crear cuenta
              </Text>
            </Pressable>
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default LoginPage;
