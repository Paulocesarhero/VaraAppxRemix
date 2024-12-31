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

import RegistroMorfometricoOdontoceto from "./RegistroMorfometricoOdontoceto";
import { MorformetriaOdontocetoProps } from "./types";
import LabelAndImage from "../../components/LabelAndImage/LabelAndImage";
import { ColorsPalete } from "../../constants/COLORS";
import { handleNumericInputWithOnepoint } from "../../hooks/validations";
import FormValuesMorfometriaMisticeto from "../MorfometriaMisticeto/FormValuesMorfometriaMisticeto";
import { MorfometriaMisticetoStyle } from "../MorfometriaMisticeto/MorfometriaMisticetoStyle";

const MorfometriaOdontoceto: React.FC<MorformetriaOdontocetoProps> = ({
  onSubmitData,
  onValuesChange,
  data,
  isDisabled,
}) => {
  const { handleSubmit, control, setValue, getValues, watch } =
    useForm<RegistroMorfometricoOdontoceto>({
      defaultValues: data,
    });

  const images = [
    {
      medida: 1,
      image: require("./images/odontoceti1/odontoceti1.png"),
    },
    {
      medida: 2,
      image: require("./images/odontoceti2/odontoceti2.png"),
    },
    {
      medida: 3,
      image: require("./images/odontoceti3/odontoceti3.png"),
    },
    {
      medida: 4,
      image: require("./images/odontoceti4/odontoceti4.png"),
    },
    {
      medida: 5,
      image: require("./images/odontoceti5/odontoceti5.png"),
    },
    {
      medida: 6,
      image: require("./images/odontoceti6/odontoceti6.png"),
    },
    {
      medida: 7,
      image: require("./images/odontoceti7/odontoceti7.png"),
    },
    {
      medida: 8,
      image: require("./images/odontoceti8/odontoceti8.png"),
    },
    {
      medida: 9,
      image: require("./images/odontoceti9/odontoceti9.png"),
    },
    {
      medida: 10,
      image: require("./images/odontoceti10/odontoceti10.png"),
    },
    {
      medida: 11,
      image: require("./images/odontoceti11/odontoceti11.png"),
    },
    {
      medida: 12,
      image: require("./images/odontoceti12/odontoceti12.png"),
    },
    {
      medida: 14,
      image: require("./images/odontoceti14/odontoceti14.png"),
    },
    {
      medida: 23,
      image: require("./images/odontoceti23/odontoceti23.png"),
    },
    {
      medida: 24,
      image: require("./images/odontoceti24/odontoceti24.png"),
    },
    {
      medida: 25,
      image: require("./images/odontoceti25/odontoceti25.png"),
    },
    {
      medida: 26,
      image: require("./images/odontoceti26/odontoceti26.png"),
    },
    {
      medida: 27,
      image: require("./images/odontoceti27/odontoceti27.png"),
    },
    {
      medida: 28,
      image: require("./images/odontoceti28/odontoceti28.png"),
    },
    {
      medida: 29,
      image: require("./images/odontoceti29/odontoceti29.png"),
    },
    {
      medida: 30,
      image: require("./images/odontoceti30/odontoceti30.png"),
    },
    {
      medida: 31,
      image: require("./images/odontoceti31/odontoceti31.png"),
    },
    {
      medida: 32,
      image: require("./images/odontoceti32/odontoceti32.png"),
    },
    {
      medida: 33,
      image: require("./images/odontoceti33/odontoceti33.png"),
    },
    {
      medida: 34,
      image: require("./images/odontoceti34/odontoceti34.png"),
    },
    {
      medida: 35,
      image: require("./images/odontoceti35/odontoceti35.png"),
    },
    {
      medida: 36,
      image: require("./images/odontoceti36/odontoceti36.png"),
    },
    {
      medida: 37,
      image: require("./images/odontoceti37/odontoceti37.png"),
    },
    {
      medida: 38,
      image: require("./images/odontoceti38/odontoceti38.png"),
    },
  ];

  function formatFieldName(fieldName: string): string {
    let formatted = fieldName;

    // Realiza los reemplazos de las abreviaciones
    formatted = formatted
      .replace(/LR$/, " (línea recta)") // Cambia "lr" al final
      .replace(/C$/, " (línea curvilínea)") // Cambia "lc" al final
      .replace(/([A-Z])/g, " $1") // Agrega un espacio antes de cada mayúscula
      .trim();

    // Convierte la primera letra en mayúscula y las demás en minúscula
    formatted =
      formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase();

    // Correcciones ortográficas para palabras comunes
    formatted = formatted
      .replace(/\boido\b/g, "oído")
      .replace(/\bmaximo\b/g, "máximo")
      .replace(/\bmandibula\b/g, "mandíbula")
      .replace(/\bMandibula\b/g, "Mandíbula")
      .replace(/\bcm\b/g, ""); // Elimina "cm"

    return formatted;
  }

  const watchedValues = watch();

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(watchedValues);
    }
  }, [watchedValues, onValuesChange]);

  const formKeys = Object.keys(
    data ?? {}
  ) as (keyof FormValuesMorfometriaMisticeto)[];

  return (
    <View style={{ flex: 1, backgroundColor: ColorsPalete.light }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            {formKeys.map((key) => {
              const medidaKey = key.match(/m(\d+)/)?.[1];
              const imagenReferencia = images.find(
                (img) => img.medida === parseInt(medidaKey ?? "", 10)
              );
              return (
                <View key={key}>
                  {imagenReferencia && (
                    <>
                      <View style={MorfometriaMisticetoStyle.divider} />
                      <LabelAndImage
                        image={imagenReferencia.image} // Mostrar la URL de la imagen
                        label="Referencia de la medida"
                      />
                    </>
                  )}

                  <InputField
                    label={formatFieldName(key)}
                    key={key}
                    maxLength={20}
                    control={control}
                    nameInput={key}
                    onChangeText={(text) =>
                      handleNumericInputWithOnepoint(key, text, setValue)
                    }
                    placeholder="Ejemplo: 1223 cm"
                    keyboardType="numeric"
                    iconName="ruler"
                    iconFamily="Entypo"
                    isDisabled={isDisabled}
                  />
                </View>
              );
            })}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};
export default MorfometriaOdontoceto;
