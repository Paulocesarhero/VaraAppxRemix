import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import { LabelAndImageStyle } from "./labelAndImageStyle";
import InputAndImageProps from "./types";

const LabelAndImage: React.FC<InputAndImageProps> = ({ image, label }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={LabelAndImageStyle.container}>
      <View style={LabelAndImageStyle.containerInfo}>
        <TouchableOpacity onPress={openModal}>
          <AntDesign
            name="infocirlceo"
            size={24}
            color="black"
            style={{
              boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.9)",
              borderRadius: "100%",
            }}
          />
        </TouchableOpacity>
        <Text style={LabelAndImageStyle.label}>{label}</Text>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={LabelAndImageStyle.modalOverlay}>
          <View style={LabelAndImageStyle.modalContent}>
            <TouchableOpacity
              onPress={closeModal}
              style={LabelAndImageStyle.closeButton}
            >
              <Text style={LabelAndImageStyle.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
            {image && (
              <Image
                contentFit="contain"
                source={image}
                style={LabelAndImageStyle.modalImage}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LabelAndImage;
