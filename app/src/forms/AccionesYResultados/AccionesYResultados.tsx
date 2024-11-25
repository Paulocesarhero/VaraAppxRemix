import React, { useRef } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import RoundedButton from "varaapplib/components/RoundedButton/RoundedButton";
import InputField from "varaapplib/components/MaterialInput/MaterialInput";
import CustomCheckBox from "varaapplib/components/CustomCheckBox/CustomCheckBox";
import FormValuesAccionesYresultados from "./FormValuesAccionesYresultados";
import AccionesYResultadosFormProps from "./AccionesYResultadosProps";
import MaterialSelector from "varaapplib/components/MaterialSelector/MaterialSelector";
import { Estado } from "varaapplib/components/MaterialSelector/types";
import MultiMaterialSelector from "../../components/MultiMaterialSelector/MultiMaterialSelector";

const AccionesYResultadosForm: React.FC<AccionesYResultadosFormProps> = ({
  onSubmitData,
  loading,
  setLoading,
}: AccionesYResultadosFormProps) => {
  const { handleSubmit, control } = useForm<FormValuesAccionesYresultados>({
    mode: "onSubmit",
    defaultValues: {
      Autoridades: "",
      TelefonoAutoridades: "",
      Morfometria: false,
      Necropsia: false,
      DisposicionDelCadaver: 0,
      DisposicionOtro: "",
      PosibleCausaDelVaramiento: "",
      PosibleCausaDeMuerte: "",
      Participantes: "",
      Observaciones: "",
      TipoDeMuestras: [],
    },
  });

  const onSubmit: SubmitHandler<FormValuesAccionesYresultados> = (data) => {
    console.log(data);
    onSubmitData(data);
  };

  const scrollViewRef = useRef<ScrollView>(null);

  const disposicionList: Estado[] = [
    {
      id: "Enterrado",
      label: "Enterrado",
      apiValue: "0",
    },
    {
      id: "Quemado",
      label: "Quemado",
      apiValue: "1",
    },
    {
      id: "Otro",
      label: "Otro",
      apiValue: "2",
    },
  ];

  const muestrasList: Estado[] = [
    {
      id: "tejido",
      apiValue: "0",
      label: "Tejido",
    },
    {
      id: "grasa",
      apiValue: "1",
      label: "Grasa",
    },
    {
      id: "musculo",
      apiValue: "2",
      label: "Músculo",
    },
    {
      id: "sangre",
      apiValue: "3",
      label: "Sangre",
    },
    {
      id: "organos",
      apiValue: "4",
      label: "Órganos",
    },
    {
      id: "huesos",
      apiValue: "5",
      label: "Huesos",
    },
    {
      id: "dientesBarbas",
      apiValue: "6",
      label: "Dientes/Barbas",
    },
  ];

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
            color={"#000"}
            text={"Enviar"}
            loading={loading}
          />

          <InputField
            nameInput={"Autoridades"}
            iconName="briefcase"
            iconFamily="Ionicons"
            label="Autoridades"
            placeholder="Ejemplo: Secretaría de Medio Ambiente"
            maxLength={100}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />

          <InputField
            nameInput={"TelefonoAutoridades"}
            iconName="call"
            iconFamily="Ionicons"
            label="Teléfono de Autoridades"
            placeholder="123456789"
            keyboardType={"phone-pad"}
            maxLength={10}
            autoCorrect={false}
            control={control}
            isRequired={false}
            validateRules={{
              pattern: {
                value: /^[0-9]{10}$/,
                message:
                  "El número debe tener 10 dígitos sin espacios ni caracteres especiales.",
              },
              maxLength: {
                value: 10,
                message: "El número no puede tener más de 10 dígitos.",
              },
              minLength: {
                value: 10,
                message: "El número debe tener exactamente 10 dígitos.",
              },
            }}
          />

          <View
            style={{
              paddingHorizontal: 10,
            }}
          >
            <Controller
              control={control}
              name="Morfometria"
              render={({ field: { value, onChange } }) => (
                <CustomCheckBox
                  label="¿Se realizó Morfometría?"
                  isChecked={value}
                  onToggle={() => onChange(!value)}
                />
              )}
            />
            <Controller
              control={control}
              name="Necropsia"
              render={({ field: { onChange, value } }) => (
                <CustomCheckBox
                  label="¿Se realizó Necropsia?"
                  isChecked={value}
                  onToggle={() => onChange(!value)}
                />
              )}
            />
          </View>

          <Controller
            control={control}
            name="DisposicionDelCadaver"
            render={({ field: { onChange, value } }) => (
              <MaterialSelector
                iconName={"medical"}
                iconFamily={"Ionicons"}
                label={"Disposición del cadáver"}
                estados={disposicionList}
                onEstadoChange={(estado: string) => {
                  onChange(estado);
                }}
              />
            )}
          />
          <InputField
            nameInput={"DisposicionOtro"}
            iconName={"medical"}
            iconFamily={"Ionicons"}
            label="Otra disposición (si aplica)"
            placeholder="Especificar si se seleccionó 'Otro'"
            maxLength={100}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />

          <Controller
            control={control}
            name="TipoDeMuestras"
            render={({ field: { onChange, value } }) => (
              <MultiMaterialSelector
                iconFamily={"Ionicons"}
                iconName={"pie-chart"}
                label={"Colecta de muestras"}
                estados={muestrasList}
                onEstadoChange={(nuevasMuestras: string[]) => {
                  const formattedMuestras = nuevasMuestras.map((muestra) => ({
                    TipoMuestra: parseInt(muestra, 10),
                  }));
                  onChange(formattedMuestras);
                }}
              ></MultiMaterialSelector>
            )}
          />

          <InputField
            nameInput={"PosibleCausaDelVaramiento"}
            iconName="help-circle"
            iconFamily="Ionicons"
            label="Posible Causa del Varamiento"
            placeholder="Ejemplo: Falta de alimento"
            maxLength={200}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />

          <InputField
            nameInput={"PosibleCausaDeMuerte"}
            iconName="alert-circle"
            iconFamily="Ionicons"
            label="Posible Causa de Muerte"
            placeholder="Ejemplo: Enfermedad no diagnosticada"
            maxLength={200}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />

          <InputField
            nameInput={"Participantes"}
            iconName="people"
            iconFamily="Ionicons"
            label="Participantes"
            placeholder="Ejemplo: Juan Pérez, Maria López"
            maxLength={200}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />

          <InputField
            nameInput={"Observaciones"}
            iconName="clipboard"
            iconFamily="Ionicons"
            label="Observaciones"
            placeholder="Notas adicionales sobre el evento"
            maxLength={500}
            autoCorrect={false}
            control={control}
            isRequired={false}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AccionesYResultadosForm;
