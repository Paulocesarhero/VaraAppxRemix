import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
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
/**
 * @enum {number}
 * @description Tipos de taxa:
 * - 0: Misticeto
 * - 1: Pinnipedo
 * - 2: Odontoceto
 * - 3: Sirenio
 */
const imagenes = [
  { id: 0, image: require("./whale/whale.png") },
  { id: 1, image: require("./pinniped/pinniped.png") },
  { id: 2, image: require("./dolphin/dolphin.png") },
  { id: 3, image: require("./sirenia/sirenia.png") },
];

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
        setEspeciesBdLocal(data.data);
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

  const renderEspecieItem = ({ item }: { item: Especie }) => {
    const especieImagen = imagenes.find((img) => img.id === item.taxa);

    return (
      <TouchableOpacity onPress={() => handleSelectEspecie(item)}>
        <View style={EspecieSelectorStyle.itemContainer}>
          <View style={{ flexDirection: "column" }}>
            <Text ellipsizeMode="tail" style={EspecieSelectorStyle.labelInfo}>
              <Text style={EspecieSelectorStyle.labelContainer}>
                Nombre especie: {item.nombre}
              </Text>
            </Text>
            <Text ellipsizeMode="tail" style={EspecieSelectorStyle.labelInfo}>
              <Text style={EspecieSelectorStyle.labelContainer}>
                Nombre latin: {item.nombreLatin}
              </Text>
            </Text>

            {especieImagen && (
              <Image
                source={especieImagen.image}
                contentFit="cover"
                style={{ alignSelf: "center", width: 50, height: 50 }}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderModal = () => (
    <Modal visible={isModalVisible} transparent animationType="slide">
      <View style={EspecieSelectorStyle.modalContainer}>
        <View style={EspecieSelectorStyle.modalContent}>
          <FlatList
            data={especies}
            keyExtractor={(item) => `${item.id}-${item.taxa}`}
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
  const taxaText = (taxa: number) => {
    switch (taxa) {
      case 0:
        return "Misticeto";
      case 1:
        return "Pinnipedo";
      case 2:
        return "Odontoceto";
      case 3:
        return "Sirenio";
      default:
        return "Desconocido";
    }
  };

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
            <View style={EspecieSelectorStyle.selectedText}>
              {selectedEspecie ? (
                <>
                  <Text style={{ fontSize: 12 }}>
                    Nombre: {selectedEspecie.nombre}
                  </Text>
                  <Text>Taxa: {taxaText(selectedEspecie.taxa)}</Text>
                  {imagenes[selectedEspecie.taxa] && (
                    <Image
                      source={imagenes[selectedEspecie.taxa].image}
                      style={{ width: 50, height: 50, alignSelf: "center" }}
                    />
                  )}
                </>
              ) : (
                <Text>Selecciona una especie</Text>
              )}
            </View>
            <Entypo
              style={{ alignSelf: "center", paddingRight: 20 }}
              name="chevron-down"
              size={24}
              color="#000"
            />
          </TouchableOpacity>
          {renderModal()}
        </>
      )}
    </>
  );
};

export default EspecieSelector;
