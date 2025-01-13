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

import { RegistroMorfometricoPinnipedo } from "./RegistroMorfometricoPinnipedo";
import MorfometriaPinnipedoProps from "./types";
import InlineButton from "../../components/InlineButton/InlineButton";
import LabelAndImage from "../../components/LabelAndImage/LabelAndImage";
import { ColorsPalete } from "../../constants/COLORS";
import {
  handleNumericInput,
  handleNumericInputWithOnepoint,
} from "../../hooks/validations";
import { MorfometriaMisticetoStyle } from "../MorfometriaMisticeto/MorfometriaMisticetoStyle";

const MorfometriaPinnipedo: React.FC<MorfometriaPinnipedoProps> = ({
  data,
  isDisabled,
  onValuesChange,
  onSubmitData,
}) => {
  const { handleSubmit, control, setValue, getValues, watch } =
    useForm<RegistroMorfometricoPinnipedo>({
      defaultValues: data,
    });

  const inputDatas = [
    {
      dato: "lrNarizAColaCm",
      url: require("./images/pinniped1/pinniped1.png"),
    },
    {
      dato: "lcNarizAColaCm",
      url: require("./images/pinniped2/pinniped2.png"),
    },
    {
      dato: "cCuerpoDetrasDePectorales",
      url: require("./images/pinniped3/pinniped3.png"),
    },
    {
      dato: "cCuerpoANivelDelOmbligo",
      url: require("./images/pinniped4/pinniped4.png"),
    },
    {
      dato: "lNarizAlCentroDelOjo",
      url: require("./images/pinniped5/pinniped5.png"),
    },
    {
      dato: "lNarizAlCentroDelOido",
      url: require("./images/pinniped6/pinniped6.png"),
    },
    {
      dato: "lAletaPectoralEnParteAnterior",
      url: require("./images/pinniped7/pinniped7.png"),
    },
    {
      dato: "aAletaPectoralANivelAxila",
      url: require("./images/pinniped8/pinniped8.png"),
    },
    {
      dato: "aMaximoDeAletapectora",
      url: require("./images/pinniped9/pinniped9.png"),
    },
    {
      dato: "lAletaPosteriorParteAnterior",
      url: require("./images/pinniped10/pinniped10.png"),
    },
    {
      dato: "anchoMaximoAletaPosterior",
      url: require("./images/pinniped11/pinniped11.png"),
    },
    {
      dato: "lCola",
      url: require("./images/pinniped12/pinniped12.png"),
    },
    {
      dato: "aRostro",
      url: require("./images/pinniped15/pinniped15.png"),
    },
    {
      dato: "aCabeza",
      url: require("./images/pinniped16/pinniped16.png"),
    },
    {
      dato: "lCabeza",
      url: require("./images/pinniped17/pinniped17.png"),
    },

    {
      dato: "lPoscaninosSuperiores",
      url: require("./images/pinniped18/pinniped18.png"),
    },

    {
      dato: "anchoInterorbital",
      url: require("./images/pinniped19/pinniped19.png"),
    },

    {
      dato: "anchoCigomatico",
      url: require("./images/pinniped20/pinniped20.png"),
    },
    {
      dato: "anchoCondilobasal",
      url: require("./images/pinniped21/pinniped21.png"),
    },
  ];
  const formKeys = Object.keys(
    data ?? {}
  ) as (keyof RegistroMorfometricoPinnipedo)[];

  function formatFieldName(fieldName: string): string {
    let formatted = fieldName;

    if (!fieldName.startsWith("lr")) {
      if (!fieldName.startsWith("lc")) {
        formatted = formatted.replace(/^l/, "longitud"); // Cambia "l" al principio
      }
    }
    if (!fieldName.startsWith("ancho")) {
      formatted = formatted.replace(/^a/, "ancho"); // Cambia "a" al principio
    }

    // Realiza los reemplazos de las abreviaciones
    formatted = formatted
      .replace(/^lr/, "línea recta") // Cambia "lr" al principio
      .replace(/^lc/, "línea curvilínea") // Cambia "lc" al principio
      .replace(/^c/, "circunferencia") // Cambia "c" al principio
      .replace(/^e/, "espesor") // Cambia "e" al principio
      .replace(/([A-Z])/g, " $1") // Agrega un espacio antes de cada mayúscula
      .trim();

    // Convierte la primera letra en mayúscula y las demás en minúscula
    formatted =
      formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase();

    // Correcciones ortográficas para palabras comunes
    formatted = formatted
      .replace(/\boido\b/g, "oído") // Cambia "oido" a "oído"
      .replace(/\bmaximo\b/g, "máximo") // Cambia "maximo" a "máximo"
      .replace(/\bcm\b/g, ""); // Elimina "cm"

    return formatted;
  }
  const watchedValues = watch();

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(watchedValues);
    }
  }, [watchedValues, onValuesChange]);

  const getImageUrl = (key: string) => {
    const found = inputDatas.find((item) => item.dato === key);
    return found ? found.url : null;
  };

  return (
    <View style={{ flex: 1, backgroundColor: ColorsPalete.light }}>
      <CustomizableHeader
        containerStyle={{ backgroundColor: ColorsPalete.dark }}
        centerComponent={
          <Text style={{ color: ColorsPalete.light }}>
            Registro Morfométrico de Pinnípedos varados
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
              const imageUrl = getImageUrl(key);
              return (
                <View key={key}>
                  {index === 21 && (
                    <Text style={MorfometriaMisticetoStyle.sutitle}>
                      Características de los dientes
                    </Text>
                  )}
                  {imageUrl && (
                    <>
                      <View style={MorfometriaMisticetoStyle.divider} />
                      <LabelAndImage
                        image={imageUrl} // Mostrar la URL de la imagen
                        label="Referencia de la medida" // La etiqueta con el nombre del campo formateado
                      />
                    </>
                  )}
                  {index > 20 ? (
                    <>
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
                        placeholder="Ejemplo: 1 diente"
                        iconName="scale"
                        iconFamily="Ionicons"
                        isDisabled={isDisabled}
                      />
                    </>
                  ) : (
                    <InputField
                      isRequired={false}
                      keyboardType="numeric"
                      label={formatFieldName(key)}
                      key={key}
                      onChangeText={(value: string) => {
                        handleNumericInputWithOnepoint(key, value, setValue);
                      }}
                      control={control}
                      maxLength={20}
                      nameInput={key}
                      placeholder="Ejemplo: 12 cm"
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
export default MorfometriaPinnipedo;
