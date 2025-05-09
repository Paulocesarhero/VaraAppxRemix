import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
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

import { FormValuesSoloOrganismosVivos } from "./FormValuesSoloOrganismosVivos";
import { SoloOrganismosVivosProps } from "./types";
import InlineButton from "../../components/InlineButton/InlineButton";
import { handleNumericInputWithOnepoint } from "../../hooks/validations";
import { CustomTitle } from "../../components/CustomTitle";

const SoloOrganismosVivos: React.FC<SoloOrganismosVivosProps> = ({
  initialValues,
  isDisabled,
  onValuesChange,
  onSubmitData,
}) => {
  const { control, setValue, watch, handleSubmit } =
    useForm<FormValuesSoloOrganismosVivos>({
      mode: "onSubmit",
      defaultValues: initialValues,
    });

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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          stickyHeaderIndices={[3]}
          style={{ paddingHorizontal: 0, paddingVertical: 0 }}
        >
          <InputField
            nameInput="tasaDeRespiracion"
            iconName="help"
            iconFamily="Ionicons"
            label="Tasa de respiración"
            placeholder="Ejemplo: 12 respiraciones por minuto"
            keyboardType="numeric"
            onChangeText={(text) =>
              handleNumericInputWithOnepoint(
                "tasaDeRespiracion",
                text,
                setValue
              )
            }
            maxLength={15}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <InputField
            nameInput="pulso"
            iconName="heart"
            iconFamily="Ionicons"
            label="Pulso"
            placeholder="Ejemplo: 200 lpm"
            keyboardType="numeric"
            onChangeText={(text) =>
              handleNumericInputWithOnepoint("pulso", text, setValue)
            }
            maxLength={15}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <InputField
            nameInput="temperatura"
            iconName="thermometer"
            iconFamily="Entypo"
            label="Temperatura"
            placeholder="Ejemplo: 200 °C"
            keyboardType="numeric"
            onChangeText={(text) =>
              handleNumericInputWithOnepoint("temperatura", text, setValue)
            }
            maxLength={15}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <CustomTitle>Comportamiento</CustomTitle>
          <InputField
            nameInput="antesDeVararse"
            iconName="help"
            iconFamily="Entypo"
            label="Antes de vararse"
            placeholder="Presento anormalidades"
            maxLength={400}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <InputField
            nameInput="varado"
            iconName="help"
            iconFamily="Entypo"
            label="Al vararse"
            placeholder="Presento anormalidades"
            maxLength={400}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <Controller
            control={control}
            name="reflotacion"
            render={({ field: { value, onChange } }) => (
              <View
                style={{ paddingHorizontal: 10 }}
                pointerEvents={isDisabled ? "none" : "auto"}
              >
                <CustomCheckBox
                  label="¿Hubo reflotación?"
                  isChecked={value}
                  onToggle={() => onChange(!value)}
                />
              </View>
            )}
          />
          <InputField
            nameInput="despuesDeReflotar"
            iconName="help"
            iconFamily="Entypo"
            label="Después de reflotar"
            placeholder="Presento anormalidades"
            maxLength={400}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <Controller
            control={control}
            name="animalTransferido"
            render={({ field: { value, onChange } }) => (
              <View
                style={{ paddingHorizontal: 10 }}
                pointerEvents={isDisabled ? "none" : "auto"}
              >
                <CustomCheckBox
                  label="¿Animal transferido a otro lugar?"
                  isChecked={value}
                  onToggle={() => onChange(!value)}
                />
              </View>
            )}
          />
          <InputField
            nameInput="lugarDeRehabilitacion"
            iconName="help"
            iconFamily="Entypo"
            label="Lugar de rehabilitación"
            placeholder="Se fue al ICMME"
            maxLength={400}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <InputField
            nameInput="despuesDeVararse"
            iconName="help"
            iconFamily="Entypo"
            label="Después de vararse"
            placeholder="Se presentaron anormalidades"
            maxLength={400}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <View style={{ marginVertical: 100 }} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default SoloOrganismosVivos;
