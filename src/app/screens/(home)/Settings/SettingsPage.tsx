import { StyleSheet, Switch, Text, View } from "react-native";
import React, { useState } from "react";
import InlineButton from "../../../../components/InlineButton/InlineButton";
import useSettingStore from "../../../../hooks/globalState/useSettingStore";
import TermsModal from "../../TermsModal";
// eslint-disable-next-line no-unused-vars
import Depurador from "../../../../components/Depurador/Depurador";

const SettingsPage: React.FC = () => {
  const { isOnlyWifi, actions } = useSettingStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showTerminos = () => {
    setIsModalVisible(true);
  };

  // Cerrar el modal
  const hideModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Depurador />
      <View style={styles.box}>
        <Text style={styles.text}>
          Desarrollador : Paulo Cesar Hernández Rosado
        </Text>
        <Text style={styles.text}>Mail: paulocesarhero@gmail.com</Text>
        <Text style={styles.text}>Teléfono: 2282522839</Text>
      </View>
      <View style={styles.box}>
        <Text style={{ fontSize: 16 }}>Configuraciones</Text>
        <View style={[{ flexDirection: "row", gap: 10 }]}>
          <Text style={styles.text}>Solo wifi</Text>
          <Switch
            trackColor={{ false: "#81b0ff", true: "#282853" }}
            value={isOnlyWifi}
            onValueChange={(value) => {
              actions.setIsOnlyWifi(value);
            }}
          />
        </View>
      </View>
      <InlineButton
        onPress={showTerminos}
        styleView={styles.button}
        text="Términos y condiciones"
      />
      <TermsModal isVisible={isModalVisible} onClose={hideModal} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  box: {
    borderWidth: StyleSheet.hairlineWidth,
    margin: 10,
    gap: 10,
    padding: 10,
    borderRadius: 12,
  },
  text: {
    fontSize: 15,
  },
  button: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
});
export default SettingsPage;
