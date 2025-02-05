import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite/index";
import React, { useRef } from "react";
import { ActivityIndicator, Alert, View } from "react-native";

import { db } from "../../../database/connection/sqliteConnection";
import { updateRecorrido } from "../../../database/repository/RecorridoRepo";
import { recorrido } from "../../../database/schemas/avisoSchema";
import { FormValuesRecorrido } from "../../../forms/Recorrido/FormValuesRecorrido";
import RecorridoForm from "../../../forms/Recorrido/RecorridoForm";
import useRecorridoStore from "../../../hooks/globalState/useRecorridoStore";

const RecorridoFormPage: React.FC = () => {
  const { idRecorridoSelected } = useRecorridoStore();
  const previousValuesRef = useRef<Partial<FormValuesRecorrido>>({});

  const { data } = useLiveQuery(
    db.query.recorrido.findFirst({
      // @ts-ignore
      where: eq(recorrido.id, idRecorridoSelected),
      columns: {
        fecha: true,
        horaInicio: true,
        horaFin: true,
        referenciasInicio: true,
        referenciasFin: true,
        observaciones: true,
        participantes: true,
        zonaSeguimiento: true,
      },
    }),
    [idRecorridoSelected]
  );
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  const handleChange = async (data: Partial<FormValuesRecorrido>) => {
    const previousValues = previousValuesRef.current;
    if (JSON.stringify(previousValues) === JSON.stringify(data)) {
      return;
    }
    previousValuesRef.current = data;

    console.log("handleChange", data);
    try {
      if (idRecorridoSelected == null) {
        return;
      }
      await updateRecorrido({
        id: idRecorridoSelected,
        ...data,
        horaInicio: data.horaInicio?.toString(),
        horaFin: data.horaFin?.toString(),
      });
    } catch (error: Error | any) {
      Alert.alert("Error al actualizar el recorrido: " + error.message);
    }
  };
  if (data == null) {
    return (
      <ActivityIndicator
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        size="large"
      />
    );
  }

  return (
    <View>
      <RecorridoForm
        onSubmitData={(data) => handleSubmit(data)}
        initialValues={{
          fecha: data?.fecha ?? new Date().toString(),
          horaInicio: new Date(data?.horaInicio ?? new Date()),
          horaFin: new Date(data?.horaFin ?? new Date()),
          referenciasInicio: data?.referenciasInicio ?? "",
          referenciasFin: data?.referenciasFin ?? "",
          observaciones: data?.observaciones ?? "",
          participantes: data?.participantes ?? "",
          zonaSeguimiento: data?.zonaSeguimiento ?? "",
        }}
        onChangeData={(data: Partial<FormValuesRecorrido>) =>
          handleChange(data)
        }
      />
    </View>
  );
};
export default RecorridoFormPage;
