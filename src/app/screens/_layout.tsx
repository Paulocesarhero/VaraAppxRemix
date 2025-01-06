import { Stack, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Alert, Platform } from "react-native";

const Layout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="Home" options={{ headerShown: false }} />
      <Stack.Screen
        name="AvisoPage/AvisoPage"
        options={{
          title: "Aviso",
          headerBackTitle: "regresar",
          headerTransparent: Platform.OS === "ios",
          headerBlurEffect: Platform.OS === "ios" ? "regular" : undefined,
        }}
      />
    </Stack>
  );
};
export default Layout;
