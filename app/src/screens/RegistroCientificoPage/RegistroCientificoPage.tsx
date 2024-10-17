import { Text, View } from "react-native";
import CustomizableHeader from "../../components/CustomizableHeader/CustomizableHeader";
import { RegistroCientificoStyle } from "./RegistroCientifico.style";
import InformacionPersonalForm from "../../components/RegistroForms/InformacionPersonalForm/InformacionPersonalForm";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const RegistroCientificoPage: React.FC = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <View style={{ flex: 1 }}>
      <CustomizableHeader
        containerStyle={{}}
        leftComponent={
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            onPress={handleBack}
          />
        }
        centerComponent={
          <Text style={RegistroCientificoStyle.TextTitle}>Registro</Text>
        }
        rightComponent={<View style={{ height: 24, width: 24 }}></View>}
      />
      <InformacionPersonalForm />
    </View>
  );
};

export default RegistroCientificoPage;
