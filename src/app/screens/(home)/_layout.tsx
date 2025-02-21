import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/build/Feather";
import { router, Tabs } from "expo-router";
import { Alert, Text, TouchableOpacity } from "react-native";

import { ColorsPalete } from "../../../constants/COLORS";
import React from "react";
import { clearDataBase } from "../../../database/repository/avisoRepo";
import useSettingStore from "../../../hooks/globalState/useSettingStore";

const Layout: React.FC = () => {
  const { actions } = useSettingStore();

  const handleLogout = () => {
    Alert.alert(
      "¿Está seguro de que desea cerrar sesión?",
      "Todos los datos que no estén en la nube se eliminarán.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Cerrar",
          onPress: async () => {
            try {
              await clearDataBase();
              await actions.setLoggedIn(false);
              router.replace("/");
            } catch {
              Alert.alert("Algo inesperado ocurrió. Inténtelo otra vez.");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: ColorsPalete.primaryBlue,
        },
      }}
    >
      <Tabs.Screen
        name="Recommendations/Recommendations"
        options={{
          title: "Recomendaciones",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="assignment" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="ListaAvisos/ListaAvisos"
        options={{
          title: "Avisos",
          tabBarIcon: ({ color, size }) => (
            <Feather name="alert-triangle" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Recorrido/ListaRecorrido"
        options={{
          title: "Lista de recorridos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="run-fast" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings/SettingsPage"
        options={{
          title: "Configuraciones",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" color={color} size={size} />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ alignItems: "center", flex: 1 }}
              onPress={handleLogout}
            >
              <Feather
                name="log-out"
                size={20}
                color="white"
                style={{ paddingLeft: 15 }}
              />
              <Text style={{ fontSize: 8, color: "white" }}>Cerra sesión</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
};
export default Layout;
