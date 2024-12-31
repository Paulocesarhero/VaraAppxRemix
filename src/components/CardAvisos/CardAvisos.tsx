import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/build/Feather";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PhotoPreview from "varaapplib/components/Camera/PhotoPreview";

import CardAvisosProps from "./types";
import { ColorsPalete } from "../../constants/COLORS";

const CardAvisos: React.FC<CardAvisosProps> = ({
  urlImage,
  isModificable,
  fechasDeAvistamiento,
  cantidadDeAnimales,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <PhotoPreview
          photoUri={urlImage}
          styleCamerPreview={styles.imagePreview}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          Fecha de avistamiento: {fechasDeAvistamiento}
        </Text>
        <Text style={styles.subtitleText}>
          Cantidad de animales: {cantidadDeAnimales}
        </Text>
        {isModificable && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginVertical: 10,
            }}
          >
            <Feather name="edit" size={24} color="green" />
            <AntDesign name="cloudupload" size={24} color="blue" />
            <AntDesign name="delete" size={24} color="red" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: ColorsPalete.light,
    flexDirection: "row",
    borderRadius: 15,
    marginVertical: 20,
    marginHorizontal: 120,
    alignSelf: "center",
    height: 200,
    width: "100%",
    padding: 10,
    borderWidth: 1,
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
    backgroundColor: "#000",
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
