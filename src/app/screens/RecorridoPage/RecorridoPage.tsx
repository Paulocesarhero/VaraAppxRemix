import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite/index";
import React from "react";
import { View } from "react-native";

import { db } from "../../../database/connection/sqliteConnection";
import { recorrido } from "../../../database/schemas/avisoSchema";
import Recorrido from "../../../forms/Recorrido/Recorrido";
import useRecorridoStore from "../../../hooks/globalState/useRecorridoStore";

const RecorridoPage: React.FC = () => {
  const { idRecorridoSelected } = useRecorridoStore();
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
    })
  );
  const handleSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <View>
      <Recorrido
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
      />
    </View>
  );
};
export default RecorridoPage;
