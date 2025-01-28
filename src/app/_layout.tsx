import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import React from "react";
import { View, Text } from "react-native";

import ErrorBoundary from "../components/ErrorBoundary";

const Layout = () => {
  const error = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          flex: 1,
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Text>
          Algo inesperado ocurrió. Intente volver a iniciar la aplicación.
        </Text>
      </View>
    );
  };
  return (
    <ErrorBoundary fallback={error()}>
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
    </ErrorBoundary>
  );
};

export default Layout;
