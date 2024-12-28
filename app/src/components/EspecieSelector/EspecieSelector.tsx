import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { EspecieSelectorStyle } from "./EspecieSelectorStyle";
import useAuthStore from "../../hooks/useStore";
import getEspecies, { Especie } from "../../services/Especie/GetEspecie";

const EspecieSelector: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [especies, setEspecies] = useState<Especie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedEspecie, setSelectedEspecie] = useState<Especie | null>(null);

  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchEspecies = async () => {
      try {
        const data = await getEspecies(token);
        setEspecies(data.data); // Almacena los datos de especies
      } catch (err) {
        setError("Hubo un error al obtener las especies.");
      } finally {
        setLoading(false); // Desactiva el estado de carga
      }
    };

    fetchEspecies();
  }, [token]);

  const handleSelectEspecie = (especie: Especie) => {
    setSelectedEspecie(especie);
    setIsModalVisible(false); // Si tienes un modal, puedes cerrarlo aquí
  };

  const renderEspecieItem = ({ item }: { item: Especie }) => (
    <TouchableOpacity onPress={() => handleSelectEspecie(item)}>
      <View style={EspecieSelectorStyle.itemContainer}>
        <Text style={EspecieSelectorStyle.labelContainer}>{item.nombre}</Text>
        <Text style={EspecieSelectorStyle.labelContainer}>
          {item.nombreLatin}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={EspecieSelectorStyle.container}>
      <Text>Selecciona una especie:</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={especies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderEspecieItem}
        />
      )}

      {selectedEspecie && (
        <View>
          <Text>Especie seleccionada:</Text>
          <Text>{selectedEspecie.nombre}</Text>
          <Text>{selectedEspecie.nombreLatin}</Text>
        </View>
      )}
    </View>
  );
};

export default EspecieSelector;
