import { CustomTitle } from "../CustomTitle";
import { CardMenu } from "../CardMenu/CardMenu";
import Entypo from "@expo/vector-icons/Entypo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import React from "react";

interface MenuEspecimenProps {
  onPressFormatoIndividual: () => void;
  formatoIndividualComplete?: boolean;
  onPressRegistroMorfometrico: () => void;
  registroMorfometricoComplete?: boolean;
  onPressSoloOrganismoVivo: () => void;
  soloOrganismoVivoComplete?: boolean;
  onPressAccionesYResultados: () => void;
  accionesYResultadosComplete?: boolean;
  avisoComplete?: boolean;
}

export const MenuEspecimen = (props: MenuEspecimenProps) => {
  const {
    onPressFormatoIndividual,
    formatoIndividualComplete,
    onPressRegistroMorfometrico,
    registroMorfometricoComplete,
    onPressSoloOrganismoVivo,
    soloOrganismoVivoComplete,
    onPressAccionesYResultados,
    accionesYResultadosComplete,
    avisoComplete,
  } = props;
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <CustomTitle>Información espécimen</CustomTitle>
      <CardMenu
        onPress={onPressFormatoIndividual}
        title="Formato individual"
        complete={formatoIndividualComplete}
        isRequired={!avisoComplete}
      >
        <Entypo name="camera" size={24} color="black" />
      </CardMenu>
      <CardMenu
        complete={registroMorfometricoComplete}
        onPress={onPressRegistroMorfometrico}
        title="Registro morfometrico"
        disabled={!avisoComplete}
      >
        <MaterialCommunityIcons name="ruler" size={24} color="black" />
      </CardMenu>
      <CardMenu
        complete={soloOrganismoVivoComplete}
        onPress={onPressSoloOrganismoVivo}
        title="Formato solo organismo vivo"
        disabled={!avisoComplete}
      >
        <Entypo name="lifebuoy" size={24} color="black" />
      </CardMenu>
      <CardMenu
        complete={accionesYResultadosComplete}
        onPress={onPressAccionesYResultados}
        title="Acciones y resultados"
        disabled={!avisoComplete}
      >
        <MaterialCommunityIcons name="police-badge" size={24} color="black" />
      </CardMenu>
    </View>
  );
};
