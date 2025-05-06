import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import DateSelector from "varaapplib/components/DateSelector/DateSelector";
import InputField from "varaapplib/components/MaterialInput/MaterialInput";

import { FormValuesRecorrido } from "./FormValuesRecorrido";

type RecorrdioProps = {
  onSubmitData: (data: FormValuesRecorrido) => void;
  initialValues: FormValuesRecorrido;
  onChangeData?: (data: Partial<FormValuesRecorrido>) => void;
};

const RecorridoForm: React.FC<RecorrdioProps> = ({
  onSubmitData,
  initialValues,
  onChangeData,
}) => {
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const { control, setValue, watch } = useForm<FormValuesRecorrido>({
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const watchedValues = watch();

  useEffect(() => {
    if (onChangeData) {
      onChangeData(watchedValues);
    }
  }, [watchedValues, onChangeData]);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Controller
              control={control}
              name="fecha"
              render={({ field: { value, onChange } }) => (
                <DateSelector
                  value={value ? new Date(value) : new Date()}
                  label="Fecha de Recorrido"
                  onDateChange={(selectedDate: Date) => {
                    const year = selectedDate.getFullYear();
                    const month = String(selectedDate.getMonth() + 1).padStart(
                      2,
                      "0"
                    ); // Los meses son base 0
                    const day = String(selectedDate.getDate()).padStart(2, "0");
                    const formattedDate = `${year}-${month}-${day}`;
                    setValue("fecha", formattedDate, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                    onChange(formattedDate);
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="horaInicio"
              render={({ field: { value, onChange } }) => (
                <View style={{ padding: 10 }}>
                  <Text style={{ fontSize: 20 }}>Hora de inicio</Text>
                  <TouchableOpacity
                    onPress={() => setShowStartTime(true)}
                    style={{ padding: 10, borderWidth: 1, borderRadius: 5 }}
                  >
                    <Text>
                      {value
                        ? new Date(value).toLocaleTimeString()
                        : "Seleccionar hora"}
                    </Text>
                  </TouchableOpacity>

                  {showStartTime && (
                    <RNDateTimePicker
                      style={{ marginTop: 10 }}
                      mode="time"
                      value={value ? new Date(value) : new Date()}
                      onChange={(event, selectedDate) => {
                        setShowStartTime(Platform.OS === "ios"); // Mantiene visible solo en iOS
                        if (selectedDate) {
                          onChange(selectedDate);
                        }
                      }}
                    />
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="horaFin"
              render={({ field: { value, onChange } }) => (
                <View style={{ padding: 10 }}>
                  <Text style={{ fontSize: 20 }}>Hora de fin</Text>
                  <TouchableOpacity
                    onPress={() => setShowEndTime(true)}
                    style={{
                      padding: 10,
                      borderWidth: StyleSheet.hairlineWidth,
                      borderRadius: 5,
                    }}
                  >
                    <Text>
                      {value
                        ? new Date(value).toLocaleTimeString()
                        : "Seleccionar hora"}
                    </Text>
                  </TouchableOpacity>

                  {showEndTime && (
                    <RNDateTimePicker
                      mode="time"
                      style={{ marginTop: 10 }}
                      value={value ? new Date(value) : new Date()}
                      onChange={(event, selectedDate) => {
                        setShowEndTime(Platform.OS === "ios"); // Mantiene visible solo en iOS
                        if (selectedDate) {
                          onChange(selectedDate);
                        }
                      }}
                    />
                  )}
                </View>
              )}
            />
            <InputField
              nameInput="referenciasInicio"
              iconName="basecamp"
              iconFamily="Entypo"
              label="Referencia de inicio"
              placeholder="En la playa la bamba"
              maxLength={200}
              autoCorrect={false}
              control={control}
              isRequired={false}
            />
            <InputField
              nameInput="referenciasFin"
              iconName="basecamp"
              iconFamily="Entypo"
              label="Referencia de fin"
              placeholder="Por el hotel california"
              maxLength={200}
              autoCorrect={false}
              control={control}
              isRequired={false}
            />
            <InputField
              nameInput="observaciones"
              iconName="eye"
              iconFamily="Ionicons"
              label="Observaciones"
              placeholder="Los residentes reportan que la luz se ha ido"
              maxLength={200}
              autoCorrect={false}
              control={control}
              isRequired={false}
            />
            <InputField
              nameInput="zonaSeguimiento"
              iconName="map"
              iconFamily="Ionicons"
              label="Zona de seguimiento"
              placeholder="En la playa"
              maxLength={200}
              autoCorrect={false}
              control={control}
              isRequired={false}
            />
            <InputField
              nameInput="participantes"
              iconName="people"
              iconFamily="Ionicons"
              label="Participantes"
              placeholder="Morteo, Juan, Maria"
              maxLength={200}
              autoCorrect={false}
              control={control}
              isRequired={false}
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default RecorridoForm;
