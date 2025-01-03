import { Entypo, Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons"; // Corregido: Importación correcta de MaterialIcons
import Feather from "@expo/vector-icons/build/Feather";
import { router, Tabs } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function Layout() {
  const handleLogout = () => {
    console.log("Usuario deslogeado");
  };

  return (
    <Tabs screenOptions={{}}>
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
