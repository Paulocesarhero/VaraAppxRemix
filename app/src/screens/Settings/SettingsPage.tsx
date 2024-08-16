import { Text, View } from "react-native";
import BottomMenu from "../../components/BottomMenu/BottomMenu";

const SettingsPage: React.FC = () => {
  return (
    <View>
      <Text>Hola desde settings</Text>
      <BottomMenu />
    </View>
  );
};

export default SettingsPage;
