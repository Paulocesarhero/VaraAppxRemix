import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Platform, Text, View } from "react-native";
import { AvisoForm } from "varaapplib/components/AvisoForm/AvisoForm";
import { AvisoValues } from "varaapplib/components/AvisoForm/types";

import InlineButton from "../../../components/InlineButton/InlineButton";
import {
  addAviso,
  deletePhotoByIdAviso,
  updateAviso,
} from "../../../database/repository/avisoRepo";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";
import { getDateNow, saveImage } from "../../../hooks/helpers";
import { db } from "../../../database/connection/sqliteConnection";
import { avisos } from "../../../database/schemas/avisoSchema";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

const AvisoPage: React.FC = () => {
  const idSelected = useAvisoStore((state) => state.idAvisoSelected);
  const { setIdAvisoSelected } = useAvisoStore();
  const headerHeight = useHeaderHeight();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      Alert.alert(
        "Salir de la pantalla",
        "Presione el botón de guardar antes de salir. ¿Desea continuar sin guardar?",
        [
          {
            text: "Cancelar",
            style: "cancel",
            onPress: () => {},
          },
          {
            text: "Aceptar",
            style: "destructive",
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const { data: avisosDbLocal } = useLiveQuery(
    db.select().from(avisos).where(eq(avisos.id, idSelected)),
    [idSelected]
  );

  const handleSaveAviso = async (data: AvisoValues) => {
    try {
      if (idSelected < 1) {
        await handleNewAviso(data);
      } else {
        await handleExistingAviso(data);
      }
    } catch (error) {
      console.error("Error al manejar los avisos", error);
    }
  };

  const handleNewAviso = async (data: AvisoValues) => {
    const nombreAviso = Date.now().toString();
    data.Fotografia = await saveImage(data.Fotografia);
    const idAvisoSqlite = await addAviso(data, nombreAviso);
    setIdAvisoSelected(Number(idAvisoSqlite));
  };

  const handleExistingAviso = async (data: AvisoValues) => {
    try {
      if (data.Fotografia) {
        data.Fotografia = await saveImage(data.Fotografia);
      }
      await deletePhotoByIdAviso(idSelected);
      await updateAviso(data, data.Nombre ?? "", idSelected);
    } catch (error) {
      console.error("Error al actualizar aviso: ", error);
    }
  };

  const CustomButton = ({ onPress }: { onPress?: () => void }) => (
    <InlineButton
      text="Guardar"
      icon={
        <MaterialCommunityIcons name="content-save" size={24} color="black" />
      }
      onPress={onPress}
    />
  );

  if (isLoading || (avisosDbLocal.length === 0 && idSelected > 0)) {
    return <Text>Cargando datos...</Text>;
  }

  return (
    <View style={{ marginHorizontal: 5 }}>
      <AvisoForm
        scroolViewStyles={{
          paddingTop: Platform.OS === "android" ? 0 : headerHeight,
          paddingHorizontal: 0,
        }}
        reactNodeButton={CustomButton}
        onSubmitData={handleSaveAviso}
        loading={false}
        setLoading={() => {}}
        onValuesChange={(values) => {}}
        data={{
          Nombre: avisosDbLocal[0]?.nombre ?? "",
          Telefono: avisosDbLocal[0]?.telefono ?? "",
          FacilAcceso: avisosDbLocal[0]?.facilAcceso === 1,
          Acantilado: avisosDbLocal[0]?.acantilado === 1,
          Sustrato: avisosDbLocal[0]?.sustrato ?? 0,
          LugarDondeSeVio: avisosDbLocal[0]?.lugarDondeSeVio ?? 0,
          FechaDeAvistamiento:
            avisosDbLocal[0]?.fechaDeAvistamiento ?? getDateNow(),
          TipoDeAnimal: avisosDbLocal[0]?.tipoDeAnimal ?? 0,
          Observaciones: avisosDbLocal[0]?.observaciones ?? "",
          CondicionDeAnimal: avisosDbLocal[0]?.condicionDeAnimal ?? 0,
          CantidadDeAnimales: (
            avisosDbLocal[0]?.cantidadDeAnimales ?? ""
          ).toString(),
          InformacionDeLocalizacion:
            avisosDbLocal[0]?.informacionDeLocalizacion ?? "",
          Latitud: avisosDbLocal[0]?.latitud ?? "",
          Longitud: avisosDbLocal[0]?.longitud ?? "",
          Fotografia: avisosDbLocal[0]?.fotografia ?? "",
        }}
      />
    </View>
  );
};

export default AvisoPage;
