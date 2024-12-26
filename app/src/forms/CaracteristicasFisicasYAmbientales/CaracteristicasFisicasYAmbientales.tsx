import React, { useRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomCheckBox from "varaapplib/components/CustomCheckBox/CustomCheckBox";
import InputField from "varaapplib/components/MaterialInput/MaterialInput";
import MaterialSelector from "varaapplib/components/MaterialSelector/MaterialSelector";
import { Estado } from "varaapplib/components/MaterialSelector/types";
import RoundedButton from "varaapplib/components/RoundedButton/RoundedButton";

import CaracteristicasFisicasYAmbientalesProps from "./types";

const CaracteristicasFisicasYAmbientales: React.FC<
  CaracteristicasFisicasYAmbientalesProps
> = ({ onSubmitData, loading, setLoading }) => {
  const { handleSubmit, control } =
    useForm<FormValuesCaracteristicasFisicasYAmbientales>({
      mode: "onSubmit",
      defaultValues: {
        temperaturaAmbiente: 20,
        precipitacionHoy: 0,
        temperaturaSupMar: 18,
        marea: 0,
        mareaMedida: 0,
        direccionCorriente: 0,
        direccionDelViento: 0,
        velocidadDelViento: 0,
        nubosidad: 0,
        oleaje: 0,
        beaufort: 0,
        precipitacionTormentaPrevia: 0,
        anormalidadGeomagnetica: false,
        mareaRoja: false,
        anormalidadEnLaPesca: "",
      },
    });

  const onSubmit: SubmitHandler<
    FormValuesCaracteristicasFisicasYAmbientales
  > = (data) => {
    console.log(data);
    onSubmitData(data);
  };

  const mareaList: Estado[] = [
    {
      id: "Subiendo",
      label: "Subiendo",
      apiValue: "0",
    },
    {
      id: "Bajando",
      label: "Bajando",
      apiValue: "1",
    },
  ];
  const direccionVientoList: Estado[] = [
    {
      id: "0",
      label: "Norte",
      apiValue: "0",
    },
    {
      id: "1",
      label: "Sur",
      apiValue: "1",
    },
    {
      id: "2",
      label: "Este",
      apiValue: "2",
    },
    {
      id: "3",
      label: "Oeste",
      apiValue: "3",
    },
  ];

  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView ref={scrollViewRef} keyboardShouldPersistTaps="handled">
          <RoundedButton
            style={{ paddingHorizontal: 10 }}
            onPress={handleSubmit(onSubmit)}
            color="#000"
            text="Enviar"
            loading={loading}
          />

          <InputField
            nameInput="temperaturaAmbiente"
            iconName="thermometer"
            iconFamily="Ionicons"
            label="Temperatura ambiente"
            placeholder="Ejemplo: 20° C"
            keyboardType="numeric"
            validateRules={{
              pattern: {
                value: /^-?\d+(\.\d+)?$/,
                message: "Debe ser un número válido (puede incluir decimales)",
              },
            }}
            maxLength={20}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <InputField
            nameInput="precipitacionHoy"
            iconName="rainy"
            iconFamily="Ionicons"
            label="Precipitación hoy"
            placeholder="Ejemplo: 200 mm"
            keyboardType="numeric"
            validateRules={{
              pattern: {
                value: /^-?\d+(\.\d+)?$/,
                message: "Debe ser un número válido (puede incluir decimales)",
              },
            }}
            maxLength={20}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <InputField
            nameInput="precipitacionTormentaPrevia"
            iconName="rainy"
            iconFamily="Ionicons"
            label="Precipitación de tormenta previa"
            placeholder="Ejemplo: 200 mm"
            keyboardType="numeric"
            validateRules={{
              pattern: {
                value: /^-?\d+(\.\d+)?$/,
                message: "Debe ser un número válido (puede incluir decimales)",
              },
            }}
            maxLength={20}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <InputField
            nameInput="temperaturaSupMar"
            iconName="thermometer"
            iconFamily="Ionicons"
            label="Temp. sup. del mar"
            placeholder="Ejemplo: 20° C"
            keyboardType="numeric"
            validateRules={{
              pattern: {
                value: /^-?\d+(\.\d+)?$/,
                message: "Debe ser un número válido (puede incluir decimales)",
              },
            }}
            maxLength={20}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <Controller
            control={control}
            name="marea"
            render={({ field: { onChange, value } }) => (
              <MaterialSelector
                iconName="water"
                iconFamily="Ionicons"
                label="Marea"
                estados={mareaList}
                onEstadoChange={(estado: string) => {
                  onChange(estado);
                }}
                value={value}
              />
            )}
          />
          <InputField
            nameInput="mareaMedida"
            iconName="water"
            iconFamily="Ionicons"
            label="Medida de la marea"
            placeholder="Ejemplo: 2mm"
            keyboardType="numeric"
            validateRules={{
              pattern: {
                value: /^-?\d+(\.\d+)?$/,
                message: "Debe ser un número válido (puede incluir decimales)",
              },
            }}
            maxLength={20}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <Controller
            control={control}
            name="direccionDelViento"
            render={({ field: { onChange, value } }) => (
              <MaterialSelector
                iconName="compass"
                iconFamily="Ionicons"
                label="Direccion del viento"
                estados={direccionVientoList}
                onEstadoChange={(estado: string) => {
                  onChange(estado);
                }}
                value={value}
              />
            )}
          />
          <InputField
            nameInput="velocidadDelViento"
            iconName="speedometer"
            iconFamily="Ionicons"
            label="Velocidad del viento"
            placeholder="Ejemplo: 20 km/hr"
            keyboardType="numeric"
            validateRules={{
              pattern: {
                value: /^-?\d+(\.\d+)?$/,
                message: "Debe ser un número válido (puede incluir decimales)",
              },
            }}
            maxLength={20}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <InputField
            nameInput="nubosidad"
            iconName="cloud"
            iconFamily="Ionicons"
            label="Porcentaje de nubosidad"
            placeholder="Ejemplo: 20 %"
            keyboardType="numeric"
            validateRules={{
              pattern: {
                value: /^-?\d+(\.\d+)?$/,
                message: "Debe ser un número válido (puede incluir decimales)",
              },
            }}
            maxLength={20}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <InputField
            nameInput="oleaje"
            iconName="boat"
            iconFamily="Ionicons"
            label="Oleaje"
            placeholder="Ejemplo: 20 cm"
            keyboardType="numeric"
            validateRules={{
              pattern: {
                value: /^-?\d+(\.\d+)?$/,
                message: "Debe ser un número válido (puede incluir decimales)",
              },
            }}
            maxLength={20}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <InputField
            nameInput="beaufort"
            iconName="flag"
            iconFamily="Ionicons"
            label="Escala de Beaufort"
            placeholder="Ejemplo: 6"
            keyboardType="numeric"
            validateRules={{
              pattern: {
                value: /^[0-9]$|^1[0-2]$/,
                message: "Debe ser un número entre 0 y 12",
              },
            }}
            maxLength={2}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <Controller
            control={control}
            name="anormalidadGeomagnetica"
            render={({ field: { onChange, value } }) => (
              <View style={{ paddingHorizontal: 10 }}>
                <CustomCheckBox
                  label="¿Se realizó Necropsia?"
                  isChecked={value}
                  onToggle={() => onChange(!value)}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="mareaRoja"
            render={({ field: { onChange, value } }) => (
              <View style={{ paddingHorizontal: 10 }}>
                <CustomCheckBox
                  label="¿Hay marea roja?"
                  isChecked={value}
                  onToggle={() => onChange(!value)}
                />
              </View>
            )}
          />
          <InputField
            nameInput="anormalidadEnLaPesca"
            iconName="fish"
            iconFamily="Ionicons"
            label="Anormalidad en la pesca"
            placeholder="Presencia de restos de petróleo"
            keyboardType="numeric"
            validateRules={{
              pattern: {
                value: /^[0-9]$|^1[0-2]$/,
                message: "Debe ser un número entre 0 y 12",
              },
            }}
            maxLength={2}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default CaracteristicasFisicasYAmbientales;
