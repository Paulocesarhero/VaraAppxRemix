import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Redirect } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

import useSettingStore from "../hooks/globalState/useSettingStore";
import LoginPage from "./screens/Login/LoginPage";

import migrations from "../database/migrations/drizzle/migrations";
import { SQLiteProvider } from "expo-sqlite";
import { db } from "../database/connection/sqliteConnection";

export default function App() {
  const { success, error } = useMigrations(db, migrations);
  const { isLoggedIn } = useSettingStore();
  const renderComponente = () => {
    if (isLoggedIn) {
      return <Redirect href="screens/(home)/Recommendations/Recommendations" />;
    } else {
      return <LoginPage />;
    }
  };
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

  return <>{renderComponente()}</>;
}
