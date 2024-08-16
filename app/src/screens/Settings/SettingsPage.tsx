import { Text, View } from "react-native";
import React, { useState } from "react";
import BottomMenu from "../../components/BottomMenu/BottomMenu";
import { useRouter } from "expo-router";
import { COLORS } from "../../Constants/Colors";

const SettingsPage: React.FC = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<string>("Settings");

  const handleMenuPress = (menu: string, path: string) => {
    setActiveMenu(menu); // Actualiza el estado del menú activo
    router.navigate(path); // Navega a la ruta especificada
  };

  return (
    <View>
      <Text>Hola desde settings</Text>
      <BottomMenu
        ViewStyleSettings={{ backgroundColor: COLORS.background }}
        ViewStyleRecommendations={{}}
        ViewStyleStranding={{}}
        activeMenu={activeMenu}
      />
    </View>
  );
};

export default SettingsPage;
