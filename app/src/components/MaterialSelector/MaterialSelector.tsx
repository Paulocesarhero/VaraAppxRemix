import React, { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../Constants/Colors";

interface EstadoSelectorProps {
  label: string;
  estados: string[];
  IsRequired?: boolean;
  onEstadoChange: (estado: string | null) => void;
}

const EstadoSelector: FC<EstadoSelectorProps> = ({
  label,
  estados,
  IsRequired = true,
  onEstadoChange,
}) => {
  const [selectedEstado, setSelectedEstado] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleSelectEstado = (estado: string) => {
    onEstadoChange(estado);
    setSelectedEstado(estado);
    setIsModalVisible(false);
  };

  const getBorderColor = (): string => {
    if (!IsRequired || selectedEstado) {
      return "#008000"; // Verde para éxito o campo no requerido
    }
    return "#8B0000"; // Rojo para error
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.selectorContainer, { borderColor: getBorderColor() }]}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.selectedText}>
          {selectedEstado
            ? selectedEstado
            : `Seleccionar ${label.toLowerCase()}`}
        </Text>
        <Entypo name="chevron-down" size={24} color={COLORS.black} />
      </TouchableOpacity>

      {IsRequired && !selectedEstado && (
        <Text style={styles.helperText}>
          Por favor seleccione {label.toLowerCase()}
        </Text>
      )}

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={estados}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelectEstado(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Ionicons name="close-circle" size={30} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 5,
  },
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
  selectedText: {
    fontSize: 16,
    color: "#4A0404",
  },
  helperText: {
    fontSize: 14,
    color: COLORS.black,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    margin: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 14,
    color: COLORS.black,
  },
  closeButton: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default EstadoSelector;
