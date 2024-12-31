import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAvisoStore from "../../../../hooks/globalState/useAvisoStore";

const SettingsPage: React.FC = () => {
  const [formularios, setFormularios] = useState<any[]>([]);
  const { loadFormularios } = useAvisoStore((state) => state.actions);

  // Cargar los formularios guardados cuando el componente se monte
  useEffect(() => {
    const fetchData = async () => {
      await loadFormularios();
      // Puedes acceder a los formularios de la tienda y actualizarlos en el estado
      const storedFormularios = Object.entries(
        useAvisoStore.getState().mySymbolDict
      );
      setFormularios(storedFormularios);
    };

    fetchData();
  }, [loadFormularios]);

  return (
    <SafeAreaView style={SettingsPageStyle.container}>
      <Text>Hola desde settings</Text>
      <ScrollView>
        {formularios.length > 0 ? (
          formularios.map(([grupoId, { formulario, data }]) => (
            <Text key={grupoId}>
              {`Grupo ID: ${grupoId} - Formulario: ${formulario} - Data: ${JSON.stringify(data)}`}
            </Text>
          ))
        ) : (
          <Text>No hay formularios guardados.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const SettingsPageStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SettingsPage;
