import { useLiveQuery, drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { ScrollView, Text, View, Button, Alert } from "react-native";
import { AvisoValues } from "varaapplib/components/AvisoForm/types";

import { db } from "../database/connection/sqliteConnection";
import migrations from "../database/migrations/drizzle/migrations";
import { addAviso } from "../database/repsitory/avisoRepo";
import { avisos } from "../database/schemas/avisoSchema";

const App = () => {
  const avisosToAgregate: AvisoValues = {
    Nombre: "Paulito",
    Telefono: "2282522839",
    FacilAcceso: false,
    Acantilado: false,
    Sustrato: 0,
    LugarDondeSeVio: 0,
    FechaDeAvistamiento: "",
    Observaciones: "",
    CondicionDeAnimal: 0,
    CantidadDeAnimales: "",
    InformacionDeLocalizacion: "",
    Latitud: "12",
    Longitud: "12",
    Fotografia: null,
  };

  const addAvisoHandler = async () => {
    try {
      await addAviso(avisosToAgregate, "nombreAvisoPlaceholder");
      Alert.alert("Éxito", "El aviso se ha agregado correctamente.");
    } catch (error) {
      // @ts-ignore
      Alert.alert("Error", "No se pudo agregar el aviso: " + error.message);
    }
  };

  // Re-renders automatically when data changes
  const { data } = useLiveQuery(db.select().from(avisos));
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Button title="Agregar Aviso" onPress={addAvisoHandler} />
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </ScrollView>
  );
};

export default App;
