import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { TouchableOpacity, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  const handleLogout = () => {
    console.log("Usuario deslogeado");
  };
  const router = useRouter();

  const goToHome = () => {
    router.push("/src/screens/Home/Recommendations/Recommendations");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{}}>
        <Drawer.Screen
          name="AvisoPage/AvisoPage"
          options={{
            drawerLabel: "Aviso",
            title: "Aviso",
            headerRight: () => (
              <TouchableOpacity
                style={{ marginVertical: 8, marginHorizontal: 13 }}
                onPress={goToHome}
              >
                <Ionicons name="home" size={24} color="0000" />
              </TouchableOpacity>
            ),
          }}
        />
        <Drawer.Screen
          name="CaracteristicasFisicasYAmbientalesPage/CaracteristicasFisicasYAmbientalesPage"
          options={{
            drawerLabel: "Ficha ambiental",
            title: "Ficha ambiental",
            headerRight: () => (
              <TouchableOpacity
                style={{ marginVertical: 8, marginHorizontal: 13 }}
                onPress={goToHome}
              >
                <Ionicons name="home" size={24} color="0000" />
              </TouchableOpacity>
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
