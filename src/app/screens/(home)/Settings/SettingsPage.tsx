import { eq } from "drizzle-orm";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import RoundedButton from "varaapplib/components/RoundedButton/RoundedButton";

import { db } from "../../../../database/connection/sqliteConnection";
import {
  addAmbienteIfNotExist,
  deleteAllAmbiente,
  getAllAmbiente,
} from "../../../../database/repository/ambienteRepo";
import { getAvisosBdLocal } from "../../../../database/repository/avisoRepo";
import { getEspeciesBdLocal } from "../../../../database/repository/especieRepo";
import { getAllEspecimen } from "../../../../database/repository/especimenRepo";
import { getMisticetosBdLocal } from "../../../../database/repository/misticetoRepo";
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

  async function handleGetAllEspecie() {
    const data = await getEspeciesBdLocal();
    console.log("====== Result of get Especie ======");
    console.log(JSON.stringify(data, null, 2));
    console.log("====================================");
  }

  async function getAllMisticetos() {
    const data = await getMisticetosBdLocal();
    console.log("====== Result of get Misticetos ======");
    console.log(JSON.stringify(data, null, 2));
    console.log("====================================");
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

  async function handleGetAllEspecimen() {
    try {
      const data = await getAllEspecimen();
      console.log("====== Result of get Misticetos ======");
      console.log(JSON.stringify(data, null, 2));
      console.log("====================================");
    } catch (error) {
      console.error("Error al obtener datos:", error);
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

        <RoundedButton
          onPress={handleGetAllEspecie}
          color="#151515"
          text="get all especie"
        />
        <RoundedButton
          onPress={getAllMisticetos}
          color="#151515"
          text="get all misticetos"
        />
        <RoundedButton
          onPress={handleGetAllEspecimen}
          color="#151515"
          text="get all especimen"
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
