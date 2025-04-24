import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Location from "expo-location";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AvisoFormStyle } from "varaapplib/components/AvisoForm/AvisoForm.style";
import Map from "varaapplib/components/Map/Map";
import InputField from "varaapplib/components/MaterialInput/MaterialInput";
import MaterialSelector from "varaapplib/components/MaterialSelector/MaterialSelector";
import { Estado } from "varaapplib/components/MaterialSelector/types";

import { FormValuesEspecimen } from "./FormValuesEspecimen";
import { FormatoIndividualProps } from "./types";
import EspecieSelector from "../../components/EspecieSelector/EspecieSelector";
import { EspecieSelectorStyle } from "../../components/EspecieSelector/EspecieSelectorStyle";
import InlineButton from "../../components/InlineButton/InlineButton";
import PhotoAndInputForm from "../../components/PhotoAndInputs/PhotoAndInputs";
import { handleNumericInputWithOnepoint } from "../../hooks/validations";
import { Especie } from "../../services/Especie/GetEspecie";
import { CustomTitle } from "../../components/CustomTitle";

const Especimen: React.FC<FormatoIndividualProps> = ({
  initialValues,
  onValuesChange,
  onSubmitData,
  isDisabled,
  hasMorfometria,
}) => {
  const { handleSubmit, control, watch, setValue, getValues } =
    useForm<FormValuesEspecimen>({
      mode: "onChange",
      defaultValues: initialValues,
    });

  const sexo: Estado[] = [
    {
      id: "Macho",
      label: "Macho",
      apiValue: "0",
    },
    {
      id: "Hembra",
      label: "Indetermindo",
      apiValue: "1",
    },
    {
      id: "Indetermindo",
      label: "Indetermindo",
      apiValue: "2",
    },
  ];

  const grupoDeEdad: Estado[] = [
    {
      id: "1",
      label: "Adulto",
      apiValue: "0",
    },
    {
      id: "2",
      label: "Subadulto",
      apiValue: "1",
    },
    {
      id: "3",
      label: "Joven",
      apiValue: "2",
    },
    {
      id: "4",
      label: "Cría",
      apiValue: "3",
    },
  ];
  /**
   * @enum {number}
   * @description Tipos de taxa:
   * - 0: Misticeto
   * - 1: Pinnipedo
   * - 2: Odontoceto
   * - 3: Sirenio
   */
  const imagenes = [
    { id: 0, image: require("./whale/whale.png") },
    { id: 1, image: require("./pinniped/pinniped.png") },
    { id: 2, image: require("./dolphin/dolphin.png") },
    { id: 3, image: require("./sirenia/sirenia.png") },
  ];

  const condicionesList: Estado[] = [
    {
      id: "Vivo",
      label: "Vivo",
      apiValue: "0",
    },
    {
      id: "Muerto",
      label: "Muerto",
      apiValue: "1",
    },
    {
      id: "Desconocido",
      label: "Desconocido",
      apiValue: "2",
    },
  ];

  const handleMarkerPositionNoChange = (
    longitude: number,
    latitude: number
  ) => {
    setValue("Latitud", getValues("Latitud"));
    setValue("Longitud", getValues("Longitud"));
  };
  const handleEspecieSelecter = (especie: Especie) => {
    setValue("EspecieId", especie.id);
  };

  const handleMarkerPositionChange = (longitude: number, latitude: number) => {
    setValue("Latitud", latitude.toString());
    setValue("Longitud", longitude.toString());
  };

  const sustratosList: Estado[] = [
    {
      id: "Arena",
      label: "Arena",
      apiValue: "0",
    },
    {
      id: "Grava",
      label: "Grava",
      apiValue: "1",
    },
    {
      id: "Rocoso",
      label: "Rocoso",
      apiValue: "2",
    },
    {
      id: "Otro",
      label: "Otro",
      apiValue: "3",
    },
  ];
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (getValues("Latitud") === "" && getValues("Longitud") === "") {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;

          setValue("Latitud", latitude.toString());
          setValue("Longitud", longitude.toString());
        }
      } catch (error) {
        console.error("Error al obtener la ubicación:", error);
      }
    };

    fetchLocation();
  }, [getValues, setValue]);

  const watchedValues = watch();
  useEffect(() => {
    onValuesChange(watchedValues);
  }, [watchedValues]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <InlineButton
        text="Continuar y guardar"
        onPress={handleSubmit(onSubmitData)}
        icon={
          <MaterialCommunityIcons
            name="page-next-outline"
            size={24}
            color="black"
          />
        }
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          stickyHeaderIndices={[0, 14]}
        >
          <CustomTitle>Formato individual</CustomTitle>

          {!hasMorfometria ? (
            <Controller
              control={control}
              name="Especie"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <View
                  style={{ paddingHorizontal: 10 }}
                  pointerEvents={isDisabled ? "none" : "auto"}
                >
                  <EspecieSelector
                    selectedEspecie={value ?? null}
                    onSelectEspecie={(value) => {
                      handleEspecieSelecter(value);
                      onChange(value);
                    }}
                  />
                  {error && (
                    <Text style={{ color: "red", marginTop: 5 }}>
                      {error.message}
                    </Text>
                  )}
                </View>
              )}
            />
          ) : (
            <Controller
              control={control}
              name="Especie"
              rules={{
                required: "La especie es obligatoria",
              }}
              render={({ field: { value, onChange } }) => {
                const especieImagen = imagenes.find(
                  (img) => img.id === value?.taxa
                );
                const taxaValue = (() => {
                  switch (value?.taxa) {
                    case 0:
                      return "Misticeto";
                    case 1:
                      return "Pinnipedo";
                    case 2:
                      return "Odontoceto";
                    case 3:
                      return "Sirenio";
                    default:
                      return "Desconocido";
                  }
                })();
                return (
                  <View
                    style={[
                      EspecieSelectorStyle.itemContainer,
                      {
                        backgroundColor: "",
                        borderWidth: 1,
                        margin: 10,
                        marginTop: 30,
                      },
                    ]}
                  >
                    <View style={{ flexDirection: "column" }}>
                      <Text
                        ellipsizeMode="tail"
                        style={EspecieSelectorStyle.labelInfo}
                      >
                        <Text style={EspecieSelectorStyle.labelContainer}>
                          Nombre especie: {value?.nombre}
                        </Text>
                      </Text>
                      <Text
                        ellipsizeMode="tail"
                        style={EspecieSelectorStyle.labelInfo}
                      >
                        <Text style={EspecieSelectorStyle.labelContainer}>
                          Nombre latin: {value?.nombreLatin}
                        </Text>
                      </Text>
                      <Text
                        ellipsizeMode="tail"
                        style={EspecieSelectorStyle.labelInfo}
                      >
                        <Text style={EspecieSelectorStyle.labelContainer}>
                          Taxa: {taxaValue}
                        </Text>
                      </Text>

                      {especieImagen && (
                        <Image
                          source={especieImagen.image}
                          contentFit="cover"
                          style={{ alignSelf: "center", width: 50, height: 50 }}
                        />
                      )}
                    </View>
                  </View>
                );
              }}
            />
          )}
          <InputField
            nameInput="Latitud"
            iconName="compass"
            isDisabled={isDisabled}
            iconFamily="Ionicons"
            label="Latitud"
            keyboardType="numbers-and-punctuation"
            control={control}
            isRequired
            validateRules={{
              pattern: {
                value: /^-?[0-9]*\.?[0-9]*$/,
                message:
                  "Solo se permiten números, un guión al principio y un punto decimal",
              },
            }}
            onChangeText={(text) => {
              if (text.indexOf("-") > 0) {
                text = text.replace(/-/g, "");
              }

              const filteredText = text
                .split("")
                .filter((char) => {
                  // Permitir un guión solo al principio
                  if (char === "-" && text.indexOf(char) === 0) return true;
                  // Permitir números y un punto decimal
                  return /[0-9.]/.test(char);
                })
                .join("");

              // Asegurar solo un punto decimal
              const parts = filteredText.split(".");
              const cleanedText =
                parts.length > 2
                  ? `${parts[0]}.${parts.slice(1).join("").replace(/\./g, "")}`
                  : filteredText;

              setValue("Latitud", cleanedText);
            }}
          />

          <InputField
            nameInput="Longitud"
            iconName="compass"
            iconFamily="Ionicons"
            label="Longitud"
            isDisabled={isDisabled}
            keyboardType="numbers-and-punctuation"
            control={control}
            isRequired
            onChangeText={(text) => {
              // Primero, verifica si el guión está solo al principio
              if (text.indexOf("-") > 0) {
                // Si el guión no está al principio, lo eliminamos
                text = text.replace(/-/g, "");
              }

              // Filtrar caracteres no numéricos y punto decimal
              const filteredText = text
                .split("")
                .filter((char) => {
                  // Permitir un guión solo al principio
                  if (char === "-" && text.indexOf(char) === 0) return true;
                  // Permitir números y un punto decimal
                  return /[0-9.]/.test(char);
                })
                .join("");

              // Asegurar solo un punto decimal
              const parts = filteredText.split(".");
              const cleanedText =
                parts.length > 2
                  ? `${parts[0]}.${parts.slice(1).join("").replace(/\./g, "")}`
                  : filteredText;

              setValue("Longitud", cleanedText);
            }}
          />

          <View style={{ height: 350, marginBottom: 5, marginTop: 15 }}>
            <Text style={AvisoFormStyle.mapTitle}>Ubicación del espécimen</Text>
            {isDisabled ? (
              <Map
                markerLatitude={+getValues("Latitud")}
                markerLongitude={+getValues("Longitud")}
                onMarkerPositionChange={handleMarkerPositionNoChange}
              />
            ) : (
              <View style={AvisoFormStyle.mapContainer}>
                <Map
                  markerLatitude={+getValues("Latitud")}
                  markerLongitude={+getValues("Longitud")}
                  onMarkerPositionChange={handleMarkerPositionChange}
                />
              </View>
            )}
          </View>
          <Controller
            control={control}
            name="condicion"
            render={({ field: { onChange, value } }) => (
              <View pointerEvents={isDisabled ? "none" : "auto"}>
                <MaterialSelector
                  label="Estado del animal"
                  value={value}
                  estados={condicionesList}
                  iconName="heart"
                  iconFamily="Entypo"
                  onEstadoChange={(estado: string) => {
                    onChange(estado);
                  }}
                />
              </View>
            )}
          />
          <InputField
            onChangeText={(text) =>
              handleNumericInputWithOnepoint(
                "longitudTotalRectilinea",
                text,
                setValue
              )
            }
            keyboardType="numeric"
            isDisabled={isDisabled}
            nameInput="longitudTotalRectilinea"
            iconName="ruler"
            iconFamily="Entypo"
            label="Longitud total rectilínea"
            placeholder="Ejemplo: 12"
            maxLength={20}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <InputField
            onChangeText={(text) =>
              handleNumericInputWithOnepoint("peso", text, setValue)
            }
            keyboardType="numeric"
            isDisabled={isDisabled}
            nameInput="peso"
            iconName="scale"
            iconFamily="Ionicons"
            label="Peso"
            placeholder="Ejemplo: 12o kg"
            maxLength={20}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <Controller
            control={control}
            name="sexo"
            render={({ field: { onChange, value } }) => (
              <View pointerEvents={isDisabled ? "none" : "auto"}>
                <MaterialSelector
                  label="Sexo del animal"
                  value={value}
                  estados={sexo}
                  iconName="transgender"
                  iconFamily="Ionicons"
                  onEstadoChange={(estado: string) => {
                    onChange(estado); // Actualiza el valor del estado en el formulario
                  }}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="grupoDeEdad"
            render={({ field: { onChange, value } }) => (
              <View pointerEvents={isDisabled ? "none" : "auto"}>
                <MaterialSelector
                  label="Grupo de edad del animal"
                  value={value}
                  estados={grupoDeEdad}
                  iconName="cycle"
                  iconFamily="Entypo"
                  onEstadoChange={(estado: string) => {
                    onChange(estado);
                  }}
                />
              </View>
            )}
          />

          <InputField
            isDisabled={isDisabled}
            nameInput="orientacionDelEspecimen"
            iconName="help"
            iconFamily="Ionicons"
            label="Orientacion del especimen"
            placeholder="Por el hotel california"
            maxLength={400}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />

          <Controller
            control={control}
            name="grupoDeEdad"
            render={({ field: { onChange, value } }) => (
              <View pointerEvents={isDisabled ? "none" : "auto"}>
                <MaterialSelector
                  label="Grupo de edad del animal"
                  value={value}
                  estados={grupoDeEdad}
                  iconName="heart"
                  iconFamily="Entypo"
                  onEstadoChange={(estado: string) => {
                    onChange(estado);
                  }}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="sustrato"
            render={({ field: { onChange, value } }) => (
              <View pointerEvents={isDisabled ? "none" : "auto"}>
                <MaterialSelector
                  value={value}
                  label="Sustrato"
                  estados={sustratosList}
                  iconName="earth"
                  iconFamily="Ionicons"
                  onEstadoChange={(estado: string) => {
                    onChange(estado);
                  }}
                />
              </View>
            )}
          />

          <InputField
            isDisabled={isDisabled}
            nameInput="otroSustrato"
            iconName="help"
            iconFamily="Ionicons"
            label="Otro sustrato"
            placeholder="Restos de petróleo"
            maxLength={400}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <CustomTitle>Características Externas</CustomTitle>

          <PhotoAndInputForm
            control={control}
            getValues={getValues}
            isDisabled={false}
            nameInput="heridasBala"
            label="Heridas de bala"
            namePhoto="heridasBalaFoto"
          />

          <PhotoAndInputForm
            control={control}
            getValues={getValues}
            isDisabled={false}
            nameInput="presenciaDeRedes"
            label="Precencia de redes"
            namePhoto="presenciaDeRedesFoto"
          />
          <PhotoAndInputForm
            control={control}
            getValues={getValues}
            isDisabled={false}
            nameInput="mordidas"
            label="Mordidas"
            namePhoto="mordidasFoto"
          />
          <PhotoAndInputForm
            control={control}
            getValues={getValues}
            isDisabled={false}
            nameInput="golpes"
            label="Golpes"
            namePhoto="golpesFoto"
          />
          <PhotoAndInputForm
            control={control}
            getValues={getValues}
            isDisabled={false}
            nameInput="otroTipoDeHeridas"
            label="Otro tipo de heridas"
            namePhoto="otroTipoDeHeridasFoto"
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default Especimen;
