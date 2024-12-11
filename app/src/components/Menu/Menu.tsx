import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { ColorsPalete } from "../../constants/COLORS";

const Menu: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleAcciones = () => {
    router.push("src/screens/AccionesYResultadosPage/AccionesYResultadosPage");
  };
  const handleFormatoGeneral = () => {
    router.push("src/screens/Stranding/StrandingPage");
  };
  const handleCaracteristicasFisicasAmbientales = () => {
    router.push("src/screens/AccionesYResultadosPage/AccionesYResultadosPage");
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleModal}>
        <Entypo name="menu" size={24} color={"#fff"} />
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalView}>
          <Pressable style={styles.closeButton} onPress={toggleModal}>
            <Ionicons name="close" size={24} color="black" />
          </Pressable>
          <View style={styles.menuContent}>
            <Pressable onPress={handleFormatoGeneral}>
              <Text style={styles.menuItem}>Formato general</Text>
            </Pressable>
            <Pressable onPress={handleAcciones}>
              <Text style={styles.menuItem}>Acciones y resultados</Text>
            </Pressable>
            <Pressable onPress={handleCaracteristicasFisicasAmbientales}>
              <Text style={styles.menuItem}>
                Características físicas y ambientales
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    backgroundColor: ColorsPalete.dark,
    padding: 10,
    borderRadius: 5,
  },
  textStyle: {
    color: ColorsPalete.light,
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro para el modal
  },
  closeButton: {
    backgroundColor: ColorsPalete.lightGrey,
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    top: 40,
    right: 20,
  },
  menuContent: {
    backgroundColor: ColorsPalete.light,
    padding: 20,
    borderRadius: 10,
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 10,
    color: ColorsPalete.dark,
  },
});

export default Menu;
