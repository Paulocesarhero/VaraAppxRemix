import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { EspecieSelectorStyle } from "./EspecieSelectorStyle";
import EspecieSelectorProps from "./types";
import {
  getEspeciesBdLocal,
  setEspeciesBdLocal,
} from "../../database/repository/especieRepo";
import useAuthStore from "../../hooks/globalState/useAuthStore";
import getEspecies, { Especie } from "../../services/Especie/GetEspecie";

const EspecieSelector: React.FC<EspecieSelectorProps> = ({
  onSelectEspecie,
  selectedEspecie,
}) => {
  const [especies, setEspecies] = useState<Especie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchEspecies = async () => {
      try {
        const data = await getEspecies(token ?? "");
        setEspeciesBdLocal(data.data as unknown as Especie[]);
        setEspecies(data.data);
      } catch (err) {
        const especiesBdLocal = await getEspeciesBdLocal();
        if (especiesBdLocal.length > 0) {
          setEspecies(especiesBdLocal as Especie[]);
          setLoading(false);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEspecies();
  }, [token]);

  const handleSelectEspecie = (especie: Especie) => {
    onSelectEspecie(especie);
    setIsModalVisible(false);
  };

  const renderEspecieItem = ({ item }: { item: Especie }) => (
    <TouchableOpacity onPress={() => handleSelectEspecie(item)}>
      <View style={EspecieSelectorStyle.itemContainer}>
        <View style={{ flexDirection: "column" }}>
          <Text ellipsizeMode="tail" style={EspecieSelectorStyle.labelInfo}>
            <Text style={EspecieSelectorStyle.labelContainer}>
              Nombre especie:
            </Text>
            {item.nombre}
          </Text>
          <Text ellipsizeMode="tail" style={EspecieSelectorStyle.labelInfo}>
            <Text style={EspecieSelectorStyle.labelContainer}>
              Nombre latin:
            </Text>
            {item.nombreLatin}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderModal = () => (
    <Modal visible={isModalVisible} transparent animationType="slide">
      <View style={EspecieSelectorStyle.modalContainer}>
        <View style={EspecieSelectorStyle.modalContent}>
          <FlatList
            data={especies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderEspecieItem}
          />
          <TouchableOpacity
            style={EspecieSelectorStyle.closeButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Entypo name="chevron-down" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      <Text style={EspecieSelectorStyle.text}>Selecciona una especie:</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <>
          <TouchableOpacity
            style={EspecieSelectorStyle.selectorButton}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={EspecieSelectorStyle.selectedText}>
              {selectedEspecie
                ? selectedEspecie.nombre
                : "Selecciona una especie"}
            </Text>
            <Entypo name="chevron-down" size={24} color="#000" />
          </TouchableOpacity>
          {renderModal()}
        </>
      )}
    </>
  );
};

export default EspecieSelector;
