import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { FC, useEffect, useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

import { MultiMaterialSelectorStyle } from "./MultiMaterialSelectorStyle";
import { Estado, EstadoSelectorProps } from "./types";

/**
 * Componente de selección múltiple que permite al usuario seleccionar más de un valor.
 *
 * @param {EstadoSelectorProps} props - Las propiedades del componente.
 * @param {string} props.label - La etiqueta que se muestra sobre el selector.
 * @param {function} props.onEstadoChange - Función de callback que se llama con un arreglo de valores `apiValue` de los estados seleccionados.
 */
const MultiMaterialSelector: FC<EstadoSelectorProps> = ({
  label,
  estados,
  onEstadoChange,
  iconName = "map",
  value = [],
  iconFamily = "Entypo",
}: EstadoSelectorProps) => {
  const [selectedEstados, setSelectedEstados] = useState<Estado[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (value.length > 0) {
      const estadosSeleccionados = estados.filter((estado) =>
        value.includes(estado.apiValue.toString())
      );
      setSelectedEstados(estadosSeleccionados);
    }
  }, [value, estados]);

  const handleSelectEstado = (estado: Estado) => {
    const isSelected = selectedEstados.some((item) => item.id === estado.id);
    const newSelectedEstados = isSelected
      ? selectedEstados.filter((item) => item.id !== estado.id)
      : [...selectedEstados, estado];

    setSelectedEstados(newSelectedEstados);
    onEstadoChange(newSelectedEstados.map((item) => item.apiValue.toString())); // Pasa solo los `apiValue`
  };

  const renderIcon = () => {
    if (iconFamily === "Ionicons") {
      // @ts-ignore
      return <Ionicons name={iconName} size={24} color="#000" />;
    } else if (iconFamily === "Entypo") {
      // @ts-ignore
      return <Entypo name={iconName} size={24} color="#000" />;
    }
    return null;
  };

  return (
    <View style={MultiMaterialSelectorStyle.container}>
      <Text style={MultiMaterialSelectorStyle.label}>{label}</Text>
      <TouchableOpacity
        style={[
          MultiMaterialSelectorStyle.selectorContainer,
          { borderColor: "#000" },
        ]}
        onPress={() => setIsModalVisible(true)}
      >
        {renderIcon()}
        <Text style={MultiMaterialSelectorStyle.selectedText}>
          {selectedEstados.length > 0
            ? selectedEstados.map((estado) => estado.label).join(", ")
            : "Seleccione opciones"}
        </Text>
        <Entypo name="chevron-down" size={24} color="#000000" />
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={MultiMaterialSelectorStyle.modalContainer}>
          <View style={MultiMaterialSelectorStyle.modalContent}>
            <FlatList
              data={estados}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const isSelected = selectedEstados.some(
                  (estado) => estado.id === item.id
                );
                return (
                  <TouchableOpacity
                    style={[
                      MultiMaterialSelectorStyle.option,
                      isSelected && { backgroundColor: "#e0e0e0" },
                    ]}
                    onPress={() => handleSelectEstado(item)}
                  >
                    <Text style={MultiMaterialSelectorStyle.optionText}>
                      {item.label}
                    </Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color="#000"
                        style={{ marginLeft: 10 }}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
            <TouchableOpacity
              style={MultiMaterialSelectorStyle.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Ionicons name="close-circle" size={30} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MultiMaterialSelector;
