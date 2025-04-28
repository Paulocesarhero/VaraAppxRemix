import { View } from "react-native";
import { CustomTitle } from "../CustomTitle";
import { CardMenu } from "../CardMenu/CardMenu";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useAvisoStore from "../../hooks/globalState/useAvisoStore";
import { useLiveQuery } from "drizzle-orm/expo-sqlite/index";
import { db } from "../../database/connection/sqliteConnection";
import {
  ambiente,
  avisos,
  especimen,
  varamientoMasivo,
} from "../../database/schemas/avisoSchema";
import { eq } from "drizzle-orm";

export interface MenuAvisoProps {
  onPressAviso?: () => void;
  onPressCaractaristicas?: () => void;
  onPressSeleccionDeVaramiento?: () => void;
  onPressEspecimen?: () => void;
  especimenComplete?: boolean;
}

export const MenuAviso = (menuAvisoProps: MenuAvisoProps) => {
  const { onPressAviso, onPressCaractaristicas, onPressSeleccionDeVaramiento } =
    menuAvisoProps;
  //datos de aviso
  const idAvisoSelected = useAvisoStore((state) => state.idAvisoSelected);
  console.log("idAvisoSelected", idAvisoSelected);
  const { data: avisosDbLocal } = useLiveQuery(
    db.select().from(avisos).where(eq(avisos.id, idAvisoSelected)),
    [idAvisoSelected]
  );
  const disabled = !avisosDbLocal[0]?.cantidadDeAnimales;
  // datos de caracteristicas fisicas y ambientales
  const { data: caracteristicasData } = useLiveQuery(
    db.select().from(ambiente).where(eq(ambiente.avisoId, idAvisoSelected)),
    [idAvisoSelected]
  );
  const NotCompleteCaracteristicas = !caracteristicasData[0];

  //datos de tipo de varamiento

  const { data: dataVaramientoMasivo } = useLiveQuery(
    db
      .select()
      .from(varamientoMasivo)
      .where(eq(varamientoMasivo.avisoId, idAvisoSelected)),
    [idAvisoSelected]
  );

  const { data: dataAvisoEspecimen } = useLiveQuery(
    db.select().from(especimen).where(eq(especimen.avisoId, idAvisoSelected)),
    [idAvisoSelected]
  );
  const hasAvisoIndividual = dataAvisoEspecimen?.length > 0;

  const hasVaramientoMasivoLocal = dataVaramientoMasivo?.length > 0;

  const seleccionTipoDeVaramientoComplete =
    hasAvisoIndividual || (hasVaramientoMasivoLocal && idAvisoSelected > 0);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <CustomTitle>Información general</CustomTitle>
      <CardMenu
        onPress={onPressAviso}
        title="Aviso"
        complete={!disabled}
        isRequired={disabled}
      >
        <Entypo name="warning" size={24} color="black" />
      </CardMenu>
      <CardMenu
        complete={!NotCompleteCaracteristicas}
        onPress={onPressCaractaristicas}
        title="Características físicas y ambientales"
        disabled={disabled}
      >
        <MaterialCommunityIcons name="weather-cloudy" size={24} color="black" />
      </CardMenu>
      <CardMenu
        complete={seleccionTipoDeVaramientoComplete}
        onPress={onPressSeleccionDeVaramiento}
        disabled={disabled}
        title="Selección de tipo de varamiento"
      >
        <MaterialIcons name="waves" size={24} color="black" />
      </CardMenu>
    </View>
  );
};
