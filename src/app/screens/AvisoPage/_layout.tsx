import { Stack } from "expo-router";
import { Platform } from "react-native";

const _layout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen
        options={{
          headerTitle: "Aviso",
          gestureEnabled: true,
          headerShown: false,
        }}
        name="AvisoPage"
      />
    </Stack>
  );
};
export default _layout;
