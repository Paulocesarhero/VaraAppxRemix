// components/PhotoAndInputs/PhotoAndInputs.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Control, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import InputField from "varaapplib/components/MaterialInput/MaterialInput";

interface PhotoAndInputFormProps {
  control: Control<any>;
  getValues: UseFormGetValues<any>;
  isDisabled: boolean;
  nameInput: string;
  label: string;
  namePhoto: string;
  setValue?: UseFormSetValue<any>;
}

const { width, height } = Dimensions.get("window");

const PhotoAndInputForm: React.FC<PhotoAndInputFormProps> = ({
  control,
  getValues,
  isDisabled,
  nameInput,
  label,
  namePhoto,
  setValue,
}) => {
  const [uploading, setUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Función para tomar foto con la cámara
  const takePhoto = async () => {
    if (isDisabled) return;

    try {
      // Solicitar permisos de cámara
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Se necesitan permisos para acceder a la cámara");
        return;
      }

      setUploading(true);
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        // Usar setValue del formulario para actualizar la ruta de la imagen
        setValue && setValue(namePhoto, imageUri);
        console.log(`Imagen capturada para ${namePhoto}: ${imageUri}`);
      }
    } catch (error) {
      console.error("Error al capturar imagen:", error);
      alert("Ocurrió un error al tomar la foto");
    } finally {
      setUploading(false);
    }
  };

  // Nueva función para seleccionar imagen de la galería
  const pickImageFromGallery = async () => {
    if (isDisabled) return;

    try {
      // Solicitar permisos para acceder a la galería
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Se necesitan permisos para acceder a la galería de imágenes");
        return;
      }

      setUploading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        // Usar setValue del formulario para actualizar la ruta de la imagen
        setValue && setValue(namePhoto, imageUri);
        console.log(`Imagen seleccionada para ${namePhoto}: ${imageUri}`);
      }
    } catch (error) {
      console.error("Error al seleccionar imagen:", error);
      alert("Ocurrió un error al seleccionar la foto");
    } finally {
      setUploading(false);
    }
  };

  // Función para ver la imagen en grande (zoom)
  const openImageFullscreen = () => {
    if (photoUri) {
      setModalVisible(true);
    }
  };

  const photoUri = getValues(namePhoto);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <InputField
            isDisabled={isDisabled}
            nameInput={nameInput}
            iconName="edit"
            iconFamily="Entypo"
            label={`Descripción de ${label}`}
            placeholder="Ingresa una descripción"
            maxLength={400}
            control={control}
            isRequired={false}
          />
        </View>

        <View style={styles.photoContainer}>
          {photoUri ? (
            // Si ya hay una imagen, mostrarla
            <View style={styles.photoWrapper}>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={openImageFullscreen}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: photoUri }}
                  style={styles.image}
                  contentFit="cover"
                  transition={300}
                />
              </TouchableOpacity>
              {!isDisabled && (
                <View style={styles.buttonOverlay}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={takePhoto}
                    disabled={uploading}
                  >
                    <MaterialIcons name="add-a-photo" size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={pickImageFromGallery}
                    disabled={uploading}
                  >
                    <MaterialIcons
                      name="photo-library"
                      size={20}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : (
            // Si no hay imagen, mostrar opciones para agregar
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.photoButton}
                onPress={takePhoto}
                disabled={isDisabled || uploading}
              >
                <MaterialIcons name="add-a-photo" size={24} color="#666" />
                <Text style={styles.placeholderText}>Cámara</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.photoButton}
                onPress={pickImageFromGallery}
                disabled={isDisabled || uploading}
              >
                <MaterialIcons name="photo-library" size={24} color="#666" />
                <Text style={styles.placeholderText}>Galería</Text>
              </TouchableOpacity>
            </View>
          )}

          {uploading && (
            <View style={styles.loadingOverlay}>
              <Text>Cargando...</Text>
            </View>
          )}
        </View>
      </View>

      {/* Modal para mostrar la imagen ampliada */}
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <StatusBar backgroundColor="#000" barStyle="light-content" />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <MaterialIcons name="close" size={30} color="white" />
          </TouchableOpacity>
          <View style={styles.modalImageContainer}>
            <Image
              source={{ uri: photoUri }}
              style={styles.fullImage}
              contentFit="contain"
              transition={200}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  photoWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  photoButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    width: "100%",
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderContainer: {
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 10,
    color: "#666",
    marginTop: 2,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingVertical: 5,
  },
  iconButton: {
    padding: 4,
  },
  // Estilos para el modal de zoom
  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  modalImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: width,
    height: height * 0.8,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
});

export default PhotoAndInputForm;
