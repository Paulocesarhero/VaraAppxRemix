import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";
import InputField from "varaapplib/components/MaterialInput/MaterialInput";

import { FormValuesMorfometriaMisticeto } from "./FormValuesMorfometriaMisticeto";
import { MorfometriaMisticetoStyle } from "./MorfometriaMisticetoStyle";
import MorfometriaMisticetoProps from "./types";
import InlineButton from "../../components/InlineButton/InlineButton";
import LabelAndImage from "../../components/LabelAndImage/LabelAndImage";
import { ColorsPalete } from "../../constants/COLORS";
import {
  handleNumericInput,
  handleNumericInputWithOnepoint,
} from "../../hooks/validations";

const MorfometriaMisticeto: React.FC<MorfometriaMisticetoProps> = ({
  data,
  onValuesChange,
  isDisabled,
  onSubmitData,
}) => {
  const { handleSubmit, control, setValue, getValues, watch } =
    useForm<FormValuesMorfometriaMisticeto>({
      defaultValues: data,
    });

  function formatFieldName(fieldName: string) {
    let formatted = fieldName
      .replace(/LR$/, " (línea recta)") // Reemplaza "LR" al final
      .replace(/C$/, " (curvilínea)") // Reemplaza "C" al final
      .replace(/([A-Z])/g, " $1") // Agrega un espacio antes de cada mayúscula
      .trim(); // Elimina espacios extra al principio y al final

    // Convierte la primera letra en mayúscula y las demás en minúscula
    formatted =
      formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase();

    return formatted;
  }

  const images = [
    {
      medida: 1,
      url: require("./images/mysticeti1/mysticeti1.png"),
    },
    {
      medida: 2,
      url: require("./images/mysticeti2/mysticeti2.png"),
    },
    {
      medida: 3,
      url: require("./images/mysticeti3/mysticeti3.png"),
    },
    {
      medida: 4,
      url: require("./images/mysticeti4/mysticeti4.png"),
    },
    {
      medida: 5,
      url: require("./images/mysticeti5/mysticeti5.png"),
    },
    {
      medida: 6,
      url: require("./images/mysticeti6/mysticeti6.png"),
    },
    {
      medida: 7,
      url: require("./images/mysticeti7/mysticeti7.png"),
    },
    {
      medida: 8,
      url: require("./images/mysticeti8/mysticeti8.png"),
    },
    {
      medida: 9,
      url: require("./images/mysticeti9/mysticeti9.png"),
    },
    {
      medida: 10,
      url: require("./images/mysticeti10/mysticeti10.png"),
    },
    {
      medida: 11,
      url: require("./images/mysticeti11/mysticeti11.png"),
    },
    {
      medida: 12,
      url: require("./images/mysticeti12/mysticeti12.png"),
    },
    {
      medida: 13,
      url: require("./images/mysticeti13/mysticeti13.png"),
    },
    {
      medida: 16,
      url: require("./images/mysticeti16/mysticeti16.png"),
    },
    {
      medida: 23,
      url: require("./images/mysticeti23/mysticeti23.png"),
    },
    {
      medida: 24,
      url: require("./images/mysticeti24/mysticeti24.png"),
    },
    {
      medida: 25,
      url: require("./images/mysticeti25/mysticeti25.png"),
    },
    {
      medida: 26,
      url: require("./images/mysticeti26/mysticeti26.png"),
    },
    {
      medida: 27,
      url: require("./images/mysticeti27/mysticeti27.png"),
    },
    {
      medida: 30,
      url: require("./images/mysticeti30/mysticeti30.png"),
    },
    {
      medida: 31,
      url: require("./images/mysticeti31/mysticeti31.png"),
    },
    {
      medida: 32,
      url: require("./images/mysticeti32/mysticeti32.png"),
    },
    {
      medida: 33,
      url: require("./images/mysticeti33/mysticeti33.png"),
    },
    {
      medida: 34,
      url: require("./images/mysticeti34/mysticeti34.png"),
    },
    {
      medida: 35,
      url: require("./images/mysticeti35/mysticeti35.png"),
    },
    {
      medida: 36,
      url: require("./images/mysticeti36/mysticeti36.png"),
    },
    {
      medida: 37,
      url: require("./images/mysticeti37/mysticeti37.png"),
    },
    {
      medida: 38,
      url: require("./images/mysticeti38/mysticeti38.png"),
    },
    {
      medida: 39,
      url: require("./images/mysticeti39/mysticeti39.png"),
    },
  ];

  const formKeys = Object.keys(
    data ?? {}
  ) as (keyof FormValuesMorfometriaMisticeto)[];

  const watchedValues = watch();

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(watchedValues);
    }
  }, [watchedValues, onValuesChange]);

  return (
    <View style={{ flex: 1, backgroundColor: ColorsPalete.light }}>
      <CustomizableHeader
        containerStyle={{ backgroundColor: ColorsPalete.dark }}
        centerComponent={
          <Text style={{ color: ColorsPalete.light }}>
            Morfometría de misticeto
          </Text>
        }
      />
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
              const medidaKey = key.match(/M(\d+)/)?.[1]; // Extraer el número de la medida
              const imagenReferencia = images.find(
                (img) => img.medida === parseInt(medidaKey ?? "", 10)
              );

              return (
                <View key={key}>
                  {index === 0 && (
                    <Text style={MorfometriaMisticetoStyle.sutitle}>
                      Características de las barbas
                    </Text>
                  )}
                  {index === 4 && (
                    <Text style={MorfometriaMisticetoStyle.sutitle}>
                      Características morfométricas
                    </Text>
                  )}
                  {imagenReferencia && (
                    <>
                      <View style={MorfometriaMisticetoStyle.divider} />
                      <LabelAndImage
                        image={imagenReferencia.url} // Mostrar la URL de la imagen
                        label="Referencia de la medida"
                      />
                    </>
                  )}
                  {index === 1 ? (
                    <>
                      <InputField
                        label={formatFieldName(key)}
                        isRequired={false}
                        key={key}
                        control={control}
                        maxLength={20}
                        nameInput={key}
                        placeholder="Ejemplo: Blanco"
                        iconName="color-palette"
                        iconFamily="Ionicons"
                        isDisabled={isDisabled}
                      />
                    </>
                  ) : (
                    <>
                      <InputField
                        label={formatFieldName(key)}
                        isRequired={false}
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
                    </>
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

export default MorfometriaMisticeto;
