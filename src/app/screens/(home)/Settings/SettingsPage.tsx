/* eslint-disable no-console-log */
import { eq } from "drizzle-orm";
import * as FileSystem from "expo-file-system";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import RoundedButton from "varaapplib/components/RoundedButton/RoundedButton";

import { db } from "../../../../database/connection/sqliteConnection";
import {
  addAmbienteIfNotExist,
  deleteAllAmbiente,
  getAllAmbiente,
} from "../../../../database/repository/ambienteRepo";
import {
  getAvisoBdLocal,
  getAvisosBdLocal,
} from "../../../../database/repository/avisoRepo";
import { getEspeciesBdLocal } from "../../../../database/repository/especieRepo";
import { getAllEspecimen } from "../../../../database/repository/especimenRepo";
import { getMisticetosBdLocal } from "../../../../database/repository/misticetoRepo";
import {
  ambiente,
  avisos as dbAvisos,
} from "../../../../database/schemas/avisoSchema";
import ImageDebugger from "../../../../components/ImageDebuger";

const SettingsPage: React.FC = () => {
  const getAvisos = async () => {
    console.log("====== Result of get avisos ======");
    const avisosBdLocal = await getAvisosBdLocal();

    console.log(JSON.stringify(avisosBdLocal, null, 2));
    console.log("====== ========= ======");
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

  async function handleGetAvisos() {
    const result = await getAvisoBdLocal(19);
    console.log("result get aviso ", result);
  }
  const listarImagenesGuardadas = async () => {
    try {
      const directoryUri = FileSystem.cacheDirectory; // Directorio de documentos
      console.log("Explorando el directorio:", directoryUri);
      if (directoryUri === null) {
        console.log("No se encontró el directorio de documentos");
        return;
      }

      // Leer los archivos en el directorio
      const archivos = await FileSystem.readDirectoryAsync(directoryUri);

      // Filtrar solo imágenes por su extensión
      const imagenes = archivos.filter((archivo) =>
        archivo.match(/\.(jpg|jpeg|png|gif)$/i)
      );

      console.log("Imágenes encontradas:", imagenes);
      return imagenes.map((imagen) => `${directoryUri}${imagen}`);
    } catch (error) {
      console.error("Error al listar las imágenes:", error);
      return [];
    }
  };

  const listarImagenesEnSubcarpeta = async () => {
    try {
      // Ruta completa de la subcarpeta donde están las imágenes
      const subcarpetaUri = `${FileSystem.documentDirectory}VaraAppx/`;

      console.log("Explorando la subcarpeta:", subcarpetaUri);

      // Leer los archivos en la subcarpeta
      const archivos = await FileSystem.readDirectoryAsync(subcarpetaUri);

      // Filtrar solo imágenes por su extensión
      const imagenes = archivos.filter((archivo) =>
        archivo.match(/\.(jpg|jpeg|png|gif)$/i)
      );
      /*      for (const imagen of imagenes) {
        const fileUri = `${subcarpetaUri}${imagen}`;
        await FileSystem.deleteAsync(fileUri, { idempotent: true });
        console.log(`Eliminado: ${fileUri}`);
      }*/

      console.log("Imágenes encontradas en la subcarpeta:", imagenes);

      // Agregar la ruta base a cada archivo para obtener las rutas completas
      return imagenes.map((imagen) => `${subcarpetaUri}${imagen}`);
    } catch (error) {
      console.error("Error al listar las imágenes en la subcarpeta:", error);
      return [];
    }
  };
  listarImagenesEnSubcarpeta().then((imagenes) => {
    console.log("Rutas completas de las imágenes:", imagenes);
  });

  // Uso
  listarImagenesGuardadas().then((imagenes) => {
    console.log("Rutas completas de las imágenes:", imagenes);
  });

  return (
    <ScrollView style={SettingsPageStyle.container}>
      {/*<View
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
        <RoundedButto
          onPress={getAllMisticetos}
          color="#151515"
          text="get all misticetos"
        />
        <RoundedButton
          onPress={handleGetAllEspecimen}
          color="#151515"
          text="get all especimen"
        />
        <RoundedButton
          onPress={handleGetAvisos}
          color="#151515"
          text="get avisos dsadsadasdasa"
        />
        <RoundedButton
          onPress={listarImagenesGuardadas}
          color="#151515"
          text="Listar imágenes guardadas"
        />
        <RoundedButton
          onPress={listarImagenesEnSubcarpeta}
          color="#151515"
          text="Listar imágenes en subcarpeta"
        />
      </View>*/}
      <ImageDebugger />
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
