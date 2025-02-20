import { StyleSheet, Switch, Text, View } from "react-native";
import React from "react";
import InlineButton from "../../../../components/InlineButton/InlineButton";
import useSettingStore from "../../../../hooks/globalState/useSettingStore";
// eslint-disable-next-line no-unused-vars

const SettingsPage: React.FC = () => {
  const { isOnlyWifi, actions } = useSettingStore();
  return (
    <View style={styles.container}>
      {/*<Depurador />*/}
      <View style={styles.box}>
        <Text style={styles.text}>
          Desarrollador : Paulo Cesar Hernández Rosado
        </Text>
        <Text style={styles.text}>Mail: paulocesarhero@gmail.com</Text>
        <Text style={styles.text}>Telefono: 2282522839</Text>
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
      <InlineButton styleView={styles.button} text="Terminos y condiciones" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  box: {
    borderWidth: 1,
    margin: 10,
    gap: 10,
    padding: 10,
    borderRadius: 12,
  },
  text: {
    fontSize: 20,
  },
  button: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
});
export default SettingsPage;
