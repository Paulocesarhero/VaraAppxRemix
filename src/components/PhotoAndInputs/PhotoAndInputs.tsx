import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import CameraButton from "varaapplib/components/Camera/CameraButton/CameraButton";
import PhotoPreview from "varaapplib/components/Camera/PhotoPreview";
import InputField from "varaapplib/components/MaterialInput/MaterialInput";
import PhotoPicker from "varaapplib/components/PhotoPicker/PhotoPicker";

import PhotoAndInputStyle from "./PhotoPreviewStyle";

interface Props {
  control: Control<any>; // Tipo genérico para react-hook-form control
  getValues: (field: string) => string | null;
  isDisabled: boolean;
  nameInput: string;
  label: string;
  namePhoto: string;
}

// Renderiza la vista previa de una foto
const renderPhotoPreview = (photoUri: string | null) => (
  <View>
    <Text
      style={[PhotoAndInputStyle.label, { marginBottom: 10, marginTop: 25 }]}
    >
      Vista previa de la foto:
    </Text>
    <PhotoPreview
      styleCamerPreview={PhotoAndInputStyle.photoPreview}
      photoUri={photoUri}
    />
  </View>
);

const renderCameraSection = (control: Control<any>, namePhoto: string) => (
  <Controller
    control={control}
    name={namePhoto}
    render={({ field: { onChange, value } }) => (
      <View style={{ marginBottom: "50%" }}>
        <View>
          <Text style={PhotoAndInputStyle.label}>Toma una foto</Text>
          <CameraButton
            sizeButton={50}
            photoUri={value}
            setPhotoUri={(uri: string | null) => {
              onChange(uri);
            }}
          />
        </View>

        <PhotoPicker
          label="Selecciona una foto"
          icon={<Entypo name="images" size={24} color="black" />}
          onPhotoSelect={(uri: string | null) => {
            onChange(uri);
          }}
        />

        {value != null && renderPhotoPreview(value)}
      </View>
    )}
  />
);

// Componente principal
const PhotoAndInputForm: React.FC<Props> = ({
  control,
  getValues,
  isDisabled,
  label,
  nameInput,
  namePhoto,
}) => {
  return (
    <View
      style={{
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 15,
        marginVertical: 15,
        marginHorizontal: 10,
      }}
    >
      <InputField
        isDisabled={isDisabled}
        nameInput={nameInput}
        iconName="documents"
        iconFamily="Entypo"
        label={label}
        placeholder="Descrpción de la foto"
        maxLength={400}
        autoCorrect={false}
        control={control}
        isRequired={false}
      />

      {isDisabled ? (
        <View>
          <Text style={PhotoAndInputStyle.label}>
            Vista previa de la foto: {label}
          </Text>
          <PhotoPreview
            styleCamerPreview={PhotoAndInputStyle.photoPreview}
            photoUri={getValues(namePhoto)}
          />
        </View>
      ) : (
        renderCameraSection(control, namePhoto)
      )}
    </View>
  );
};

export default PhotoAndInputForm;
