import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/build/Feather";
import { Tabs } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

import { ColorsPalete } from "../../../constants/COLORS";

export default function Layout() {
  const handleLogout = () => {};

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
        name="ListaRecorrido/ListaRecorrido"
        options={{
          title: "Recorridos",
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
                size={24}
                color="black"
                style={{ paddingLeft: 15 }}
              />
              <Text style={{ fontSize: 10 }}>Cerra sesión</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
