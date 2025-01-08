import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RoundedButton from "varaapplib/components/RoundedButton/RoundedButton";

import { db } from "../../../../database/connection/sqliteConnection";
import {
  addAmbienteIfNotExist,
  deleteAllAmbiente,
  getAllAmbiente,
} from "../../../../database/repository/ambienteRepo";
import { getAvisosBdLocal } from "../../../../database/repository/avisoRepo";
import {
  ambiente,
  avisos as dbAvisos,
} from "../../../../database/schemas/avisoSchema";
import useListAvisoStore from "../../../../hooks/globalState/useListAvisosStore";

const SettingsPage: React.FC = () => {
  const { avisos, setAvisos } = useListAvisoStore();

  const getAvisos = async () => {
    console.log("====== Result of get avisos ======");
    const avisosBdLocal = await getAvisosBdLocal();

    console.log(JSON.stringify(avisosBdLocal, null, 2));
    console.log("====== ========= ======");
  };
  const avisosZustand = () => {
    console.log(JSON.stringify(avisos, null, 2));
  };

  const handleDelete = async () => {
    await db.delete(dbAvisos);
  };

  async function handlegetAmbiente() {
    try {
      const data = await getAllAmbiente();
      console.log("====== Result of get Ambiente ======");
      console.log(JSON.stringify(data, null, 2));
      console.log("====================================");
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  }

  async function handleAddAmbiente() {
    console.log("addAmbienteIfNotExist");
    const result = await addAmbienteIfNotExist(6420);
    console.log("result of add ambiente", result);
  }

  async function handleGetIdAmbiente() {
    try {
      const idambiente = await db
        .select({ idAmbiente: ambiente.id })
        .from(ambiente)
        .where(eq(ambiente.avisoId, 6425));

      if (idambiente.length > 0) {
        console.log("idambiente", idambiente[0].idAmbiente);
      } else {
        console.log("No se encontró ningún idAmbiente.");
      }
    } catch (error) {
      console.error("Error al obtener idAmbiente:", error);
    }
  }

  async function handleDeleteAllAmbiente() {
    try {
      const result = await deleteAllAmbiente();

      console.log("result", result);
    } catch (error) {
      console.error("Error al borrar todos los ambientes:", error);
    }
  }

  return (
    <ScrollView style={SettingsPageStyle.container}>
      <View
        style={{ flex: 1, gap: 20, marginVertical: 20, marginHorizontal: 10 }}
      >
        <RoundedButton
          onPress={getAvisos}
          color="#151515"
          text="GetAvisos de sqlite "
        />
        <RoundedButton
          onPress={handlegetAmbiente}
          color="#151515"
          text="get todos los ambientes"
        />
        <RoundedButton
          onPress={avisosZustand}
          color="#151515"
          text="GetAvisos de zustand"
        />
        <RoundedButton
          onPress={handleDelete}
          color="#151515"
          text="borrar todos los avisos"
        />
        <RoundedButton
          onPress={handleAddAmbiente}
          color="#151515"
          text="Agregar ambiente"
        />
        <RoundedButton
          onPress={handleGetIdAmbiente}
          color="#151515"
          text="id ambiente"
        />
        <RoundedButton
          onPress={handleDeleteAllAmbiente}
          color="#151515"
          text="DeleteAllAmbiente"
        />
      </View>
      <ScrollView />
    </ScrollView>
  );
};

const SettingsPageStyle = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,

    marginVertical: 20,
  },
});

export default SettingsPage;
