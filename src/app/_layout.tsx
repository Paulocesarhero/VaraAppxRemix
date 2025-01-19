import React from "react";
import { SQLiteProvider } from "expo-sqlite";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <SQLiteProvider
      databaseName="db.db"
      options={{ enableChangeListener: true }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          fullScreenGestureEnabled: true,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Login",
          }}
        />
      </Stack>
    </SQLiteProvider>
  );
};

export default Layout;
