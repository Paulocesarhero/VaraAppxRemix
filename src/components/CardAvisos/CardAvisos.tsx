import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/build/Feather";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";

import CardAvisosProps from "./types";
import { ColorsPalete } from "../../constants/COLORS";
import {
  deleteAvisoById,
  hasEspecieAviso,
  setSubidoAviso,
} from "../../database/repository/avisoRepo";
import useAuthStore from "../../hooks/globalState/useAuthStore";
import useAvisoStore from "../../hooks/globalState/useAvisoStore";
import { formatDate } from "../../hooks/helpers";
import { BASE_URL } from "../../services/Api";
import { saveAviso } from "../../services/Avisos/SaveAviso";
import { useCheckNetwork } from "../../hooks/validations";

const CardAvisos: React.FC<CardAvisosProps> = ({
  urlImage,
  isModificable,
  fechasDeAvistamiento,
  cantidadDeAnimales,
  status,
  idAviso,
}) => {
  const { setIdAvisoSelected } = useAvisoStore();
  const token = useAuthStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const checkNetwork = useCheckNetwork();

  const handleUrlImage = (urlImage: string | null) => {
    if (!urlImage || urlImage === "") {
      return require("./logo/logo.png");
    }
    if (
      typeof urlImage === "string" &&
      urlImage.startsWith("/images/varaweb/")
    ) {
      return BASE_URL + urlImage;
    }
    return { uri: urlImage };
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este aviso?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              await handledeleteAviso(idAviso);
            } catch (error) {
              console.error("Error al eliminar:", error);
              Alert.alert(
                "Error",
                "No se pudo eliminar el aviso. Inténtalo de nuevo más tarde."
              );
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleUpdateAviso = async () => {
    setIdAvisoSelected(Number(idAviso));
    router.push("screens/AvisoPage/AvisoPage");
  };

  const handledeleteAviso = async (idAviso: number | string) => {
    if (!idAviso) return;
    try {
      const result = await deleteAvisoById(Number(idAviso));

      console.log("Resultado de la eliminación:", result);
    } catch (error) {
      console.error("Error al eliminar el aviso:", error);
    }
  };

  async function handleCloudUpload() {
    setIsLoading(true);
    const hasEspecie = await hasEspecieAviso(Number(idAviso));
    if (!hasEspecie) {
      Alert.alert(
        "No se selecciono una especie",
        "Para poder subir un aviso es necesario que seleccione una especie llene el formulario de especimen",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } else {
      try {
        if (!idAviso || !token) return;
        const isOnline = await checkNetwork();
        if (!isOnline) {
          Alert.alert("Solo puedes subir un aviso mediante Wi-Fi.");
          setIsLoading(false);
          return;
        }
        const result = await saveAviso(Number(idAviso), token);
        if (!result) return;
        await setSubidoAviso(Number(idAviso));
        Alert.alert("Éxito", "El aviso se subió correctamente.");
        setIsLoading(false);
        return;
      } catch (error: any) {
        if (error.status === 401) {
          Alert.alert(
            "Vuelve a iniciar sesión",
            "Por seguridad vuelva a iniciar sesión"
          );
        } else {
          console.table(JSON.stringify(error));
          console.log("Respuesta de error", error.response);
          Alert.alert(
            "Error",
            "Algo salió mal. Por favor, intenta nuevamente."
          );
        }

        setIsLoading(false);
      }
    }
    setIsLoading(false);
  }

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          contentFit="contain"
          source={handleUrlImage(urlImage)}
          style={styles.imagePreview}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          Fecha de avistamiento:{" "}
          {fechasDeAvistamiento
            ? formatDate(fechasDeAvistamiento)
            : "No disponible"}
        </Text>
        <Text style={styles.subtitleText}>
          Cantidad de animales: {cantidadDeAnimales}
        </Text>
        <Text style={styles.subtitleText}>
          Estatus del aviso: {status ?? "En varaweb"}
        </Text>
        {isModificable && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginVertical: 10,
            }}
          >
            <Feather
              name="edit"
              size={24}
              color="green"
              onPress={handleUpdateAviso}
            />
            {isLoading ? (
              <ActivityIndicator size="small" color="blue" />
            ) : (
              <AntDesign
                name="cloudupload"
                size={24}
                color="blue"
                onPress={handleCloudUpload}
                disabled={isLoading}
              />
            )}
            <AntDesign
              name="delete"
              size={24}
              color="red"
              onPress={handleDelete}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: "5%",
    backgroundColor: ColorsPalete.light,
    flexDirection: "row",
    borderRadius: 15,
    marginVertical: 20,
    alignSelf: "center",
    height: 200,
    width: "100%",
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  imageContainer: {
    flex: 1,
    marginRight: 10,
  },
  imagePreview: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
    borderColor: "#fff",
    backgroundColor: "rgba(59, 89, 152, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 2,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: ColorsPalete.dark,
  },
  subtitleText: {
    fontSize: 14,
    color: ColorsPalete.dark,
    marginTop: 5,
  },
});

export default CardAvisos;
