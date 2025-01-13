import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Redirect } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

import useSettingStore from "../hooks/globalState/useSettingStore";
import LoginPage from "./screens/Login/LoginPage";
import { db } from "../database/connection/sqliteConnection";
import migrations from "../database/migrations/drizzle/migrations";

export default function App() {
  const { success, error } = useMigrations(db, migrations);
  const { isLoggedIn } = useSettingStore();
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

  return isLoggedIn ? (
    <Redirect href="screens/(home)/Recommendations/Recommendations" />
  ) : (
    <LoginPage />
  );
}
