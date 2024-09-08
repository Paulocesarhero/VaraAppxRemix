import { Text, View } from "react-native";
import CustomizableHeader from "../../components/CustomizableHeader/CustomizableHeader";
import { RegistroCientificoStyle } from "./RegistroCientifico.style";

const RegistroCientificoPage: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <CustomizableHeader
        containerStyle={{}}
        leftComponent={
          <Text style={RegistroCientificoStyle.cancelarButton}>Cancelar</Text>
        }
        centerComponent={
          <Text style={RegistroCientificoStyle.TextTitle}>Registro</Text>
        }
      />
      <Text>Hoka</Text>
    </View>
  );
};

export default RegistroCientificoPage;
