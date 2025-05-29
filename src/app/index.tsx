import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Redirect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import { Text, View } from "react-native";

import useSettingStore from "../hooks/globalState/useSettingStore";
import LoginPage from "./screens/Login/LoginPage";
import { db } from "../database/connection/sqliteConnection";
import migrations from "../database/migrations/drizzle/migrations";

export default function App() {
  const [migrationAttempts, setMigrationAttempts] = useState(0);
  const { success, error } = useMigrations(db, migrations);
  const { isLoggedIn } = useSettingStore();
  const sqliteContext = useSQLiteContext();
  useDrizzleStudio(sqliteContext);

  React.useEffect(() => {
    if (!success && !error && migrationAttempts < 3) {
      const timer = setTimeout(
        () => setMigrationAttempts((prev) => prev + 1),
        5000
      );
      return () => clearTimeout(timer);
    }
  }, [success, error, migrationAttempts]);

  const renderComponente = () => {
    if (isLoggedIn) {
      return <Redirect href="screens/(home)/Recommendations/Recommendations" />;
    } else {
      return <LoginPage />;
    }
  };
  if (error) {
    console.error("Error en migración:", error);
    return (
      <View style={{ padding: 20 }}>
        <Text>Error en migración: {error.message}</Text>
        <Text>Intente reinstalar la aplicación o contacte soporte.</Text>
      </View>
    );
  }

  if (!success) {
    if (migrationAttempts >= 3) {
      return (
        <View style={{ padding: 20 }}>
          <Text>
            No se pudo completar la migración después de varios intentos.
          </Text>
          <Text>Por favor, reinstale la aplicación.</Text>
        </View>
      );
    }
    return (
      <View style={{ padding: 20 }}>
        <Text>
          Migration is in progress... (Intento {migrationAttempts + 1}/3)
        </Text>
      </View>
    );
  }

  return <>{renderComponente()}</>;
}
