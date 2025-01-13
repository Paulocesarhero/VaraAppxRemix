import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import InputField from "varaapplib/components/MaterialInput/MaterialInput";

import RegistroMorfometricoSirenio from "./RegistroMorfometricoSirenio";
import MorfometriaSirenioProps from "./types";
import InlineButton from "../../components/InlineButton/InlineButton";
import LabelAndImage from "../../components/LabelAndImage/LabelAndImage";
import { ColorsPalete } from "../../constants/COLORS";
import { handleNumericInput } from "../../hooks/validations";
import { MorfometriaMisticetoStyle } from "../MorfometriaMisticeto/MorfometriaMisticetoStyle";
import { RegistroMorfometricoPinnipedo } from "../MorfometriaPinnipedo/RegistroMorfometricoPinnipedo";

const MorfometriaSirenio: React.FC<MorfometriaSirenioProps> = ({
  onValuesChange,
  onSubmitData,
  data,
  isDisabled,
}) => {
  const { handleSubmit, control, setValue, getValues, watch } =
    useForm<RegistroMorfometricoSirenio>({
      defaultValues: data,
    });

  const watchedValues = watch();

  function formatFieldName(fieldName: string): string {
    let formatted = fieldName;
    formatted = formatted
      .replace(/([A-Z])/g, " $1") // Agrega un espacio antes de cada mayúscula
      .trim();

    // Convierte la primera letra en mayúscula y las demás en minúscula
    formatted =
      formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase();

    // Correcciones ortográficas para palabras comunes
    formatted = formatted
      .replace(/\boido\b/g, "oído") // Cambia "oido" a "oído"
      .replace(/\bmaximo\b/g, "máximo") // Cambia "maximo" a "máximo"
      .replace(/\bNumero\b/g, "Número") // Cambia "Numero" a "Número"
      .replace(/\bl\b/g, "línea recta") // Cambia "l" a "línea recta"
      .replace(/\bc\b/g, "línea curvilínea") // Cambia "l" a "línea recta"
      .replace(/\bcm\b/g, ""); // Elimina "cm"

    return formatted;
  }

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(watchedValues);
    }
  }, [watchedValues, onValuesChange]);

  const getImageUrl = (key: string) => {
    const found = inputDatas.find((item) => item.dato === key);
    return found ? found.image : null;
  };

  const inputDatas = [
    {
      dato: "extremoHocicoAExtremoAletaCaudalL",
      image: require("./images/sirenia1/sirenia1.png"),
    },
    {
      dato: "extremoHocicoAExtremoAletaCaudalC",
      image: require("./images/sirenia1/sirenia1.png"),
    },
    {
      dato: "extremoHocicoACentroAno",
      image: require("./images/sirenia2/sirenia2.png"),
    },
    {
      dato: "extremoHocicoAAberturaGenital",
      image: require("./images/sirenia3/sirenia3.png"),
    },
    {
      dato: "extremoHocicoACentroOmbligo",
      image: require("./images/sirenia4/sirenia4.png"),
    },
    {
      dato: "extremoHocicoAOrigenAnteriorDeAletasPectorales",
      image: require("./images/sirenia5/sirenia5.png"),
    },
    {
      dato: "extremoHocicoACentroOjo",
      image: require("./images/sirenia6/sirenia6.png"),
    },
    {
      dato: "extremoHocicoACentroMeatoAuditivoExterno",
      image: require("./images/sirenia7/sirenia7.png"),
    },
    {
      dato: "centroOjoACentroMeatoAuditivoExterno",
      image: require("./images/sirenia8/sirenia8.png"),
    },
    {
      dato: "distanciaOjoAOjoDorso",
      image: require("./images/sirenia9/sirenia9.png"),
    },
    {
      dato: "centroOjoAlCentroAberturaNasal",
      image: require("./images/sirenia10/sirenia10.png"),
    },
    {
      dato: "aletaPectoralOrigenAnteriorAlExtremo",
      image: require("./images/sirenia11/sirenia11.png"),
    },
    {
      dato: "aletaPectoralDeAxilaAlExtremo",
      image: require("./images/sirenia12/sirenia12.png"),
    },
    {
      dato: "anchoMaxAletaPectoral",
      image: require("./images/sirenia13/sirenia13.png"),
    },
    {
      dato: "baseAletaCaudalAlExtremo",
      image: require("./images/sirenia16/sirenia16.png"),
    },
    {
      dato: "diametroNivelOmbligo",
      image: require("./images/sirenia21/sirenia21.png"),
    },
  ];
  const formKeys = Object.keys(
    data ?? {}
  ) as (keyof RegistroMorfometricoPinnipedo)[];

  return (
    <View style={{ flex: 1, backgroundColor: ColorsPalete.light }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
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
            {formKeys.map((key, index) => {
              const imageUrl = getImageUrl(key);

              return (
                <View key={key}>
                  {imageUrl && (
                    <>
                      <View style={MorfometriaMisticetoStyle.divider} />
                      <LabelAndImage
                        image={imageUrl} // Mostrar la URL de la imagen
                        label="Referencia de la medida" // La etiqueta con el nombre del campo formateado
                      />
                    </>
                  )}
                  {index === 30 || index == 29 ? (
                    <InputField
                      isRequired={false}
                      label={formatFieldName(key)}
                      key={key}
                      control={control}
                      maxLength={20}
                      nameInput={key}
                      placeholder="Ejemplo: Paulo Cesar"
                      iconName="people"
                      iconFamily="Ionicons"
                      isDisabled={isDisabled}
                    />
                  ) : (
                    <InputField
                      isRequired={false}
                      label={formatFieldName(key)}
                      key={key}
                      onChangeText={(value: string) => {
                        handleNumericInput(key, value, setValue);
                      }}
                      control={control}
                      keyboardType="numeric"
                      maxLength={20}
                      nameInput={key}
                      placeholder="Ejemplo: 1224 cm"
                      iconName="ruler"
                      iconFamily="Entypo"
                      isDisabled={isDisabled}
                    />
                  )}
                </View>
              );
            })}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};
export default MorfometriaSirenio;
