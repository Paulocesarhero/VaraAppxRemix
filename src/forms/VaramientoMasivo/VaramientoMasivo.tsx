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

import { FormValuesVaramientoMasivo } from "./FormValuesVaramientoMasivo";
import { VaramientoMasivoProps } from "./types";
import InlineButton from "../../components/InlineButton/InlineButton";
import { handleNumericInputWithOnepoint } from "../../hooks/validations";

const VaramientoMasivo: React.FC<VaramientoMasivoProps> = ({
  initialValues,
  isDisabled,
  onValuesChange,
  onSubmitData,
}) => {
  const { handleSubmit, control, watch, setValue } =
    useForm<FormValuesVaramientoMasivo>({
      mode: "onBlur",
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={{ paddingTop: 10 }}
          keyboardShouldPersistTaps="handled"
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
          <Controller
            control={control}
            name="AvesMuertas"
            render={({ field: { value, onChange } }) => (
              <View
                style={{ paddingHorizontal: 10 }}
                pointerEvents={isDisabled ? "none" : "auto"}
              >
                <CustomCheckBox
                  label="¿Hay aves muertas?"
                  isChecked={value}
                  onToggle={() => onChange(!value)}
                />
              </View>
            )}
          />
          <InputField
            onChangeText={(text) =>
              handleNumericInputWithOnepoint(
                "AvesMuertasCantidad",
                text,
                setValue
              )
            }
            keyboardType="numeric"
            isDisabled={isDisabled}
            nameInput="AvesMuertasCantidad"
            iconName="skull"
            iconFamily="Ionicons"
            label="Cantidad de aves muertas"
            placeholder="Ejemplo: 12"
            maxLength={20}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <Controller
            control={control}
            name="PecesMuertos"
            render={({ field: { value, onChange } }) => (
              <View
                style={{ paddingHorizontal: 10 }}
                pointerEvents={isDisabled ? "none" : "auto"}
              >
                <CustomCheckBox
                  label="¿Hay peces muertos?"
                  isChecked={value}
                  onToggle={() => onChange(!value)}
                />
              </View>
            )}
          />
          <InputField
            onChangeText={(text) =>
              handleNumericInputWithOnepoint(
                "PecesMuertasCantidad",
                text,
                setValue
              )
            }
            keyboardType="numeric"
            isDisabled={isDisabled}
            nameInput="PecesMuertasCantidad"
            iconName="skull"
            iconFamily="Ionicons"
            label="Cantidad de peces muertos"
            placeholder="Ejemplo: 12"
            maxLength={20}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <InputField
            onChangeText={(text) =>
              handleNumericInputWithOnepoint(
                "NumeroTotalDeAnimales",
                text,
                setValue
              )
            }
            isDisabled={isDisabled}
            keyboardType="numeric"
            nameInput="NumeroTotalDeAnimales"
            iconName="line-graph"
            iconFamily="Entypo"
            label="Número total de animales"
            placeholder="Ejemplo: 12"
            maxLength={20}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <InputField
            onChangeText={(text) =>
              handleNumericInputWithOnepoint("SubGrupos", text, setValue)
            }
            isDisabled={isDisabled}
            keyboardType="numeric"
            nameInput="SubGrupos"
            iconName="line-graph"
            iconFamily="Entypo"
            label="Subgrupos"
            placeholder="Ejemplo: 12"
            maxLength={20}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <InputField
            onChangeText={(text) =>
              handleNumericInputWithOnepoint("AnimalesVivos", text, setValue)
            }
            nameInput="AnimalesVivos"
            isDisabled={isDisabled}
            iconName="heart"
            iconFamily="Entypo"
            label="Cantidad de animales vivos"
            placeholder="Ejemplo: 12"
            maxLength={20}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <InputField
            onChangeText={(text) =>
              handleNumericInputWithOnepoint("AnimalesMuertos", text, setValue)
            }
            nameInput="AnimalesMuertos"
            iconName="skull"
            iconFamily="Ionicons"
            label="Cantidad de animales muertos"
            placeholder="Ejemplo: 12"
            maxLength={20}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
          <InputField
            onChangeText={(text) =>
              handleNumericInputWithOnepoint("Observaciones", text, setValue)
            }
            nameInput="Observaciones"
            iconName="open-book"
            iconFamily="Entypo"
            label="Observaciones"
            placeholder="Ejemplo: 12"
            maxLength={20}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default VaramientoMasivo;
