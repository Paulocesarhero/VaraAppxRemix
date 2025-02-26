import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Platform, Text, View } from "react-native";
import { AvisoForm } from "varaapplib/components/AvisoForm/AvisoForm";
import { AvisoValues } from "varaapplib/components/AvisoForm/types";

import InlineButton from "../../../components/InlineButton/InlineButton";
import { db } from "../../../database/connection/sqliteConnection";
import {
  addAviso,
  deletePhotoByIdAviso,
  updateAviso,
} from "../../../database/repository/avisoRepo";
import { avisos } from "../../../database/schemas/avisoSchema";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";
import { getDateNow, saveImage } from "../../../hooks/helpers";
import useRecorridoStore from "../../../hooks/globalState/useRecorridoStore";

const AvisoPage: React.FC = () => {
  const idSelected = useAvisoStore((state) => state.idAvisoSelected);
  const { setIdAvisoSelected } = useAvisoStore();
  const headerHeight = useHeaderHeight();
  const { idRecorridoSelected } = useRecorridoStore();
  const router = useRouter();
  const previouValuesRef = useRef<Partial<AvisoValues>>({});
  const [loading, setLoading] = useState(false);

  const { data: avisosDbLocal } = useLiveQuery(
    db.select().from(avisos).where(eq(avisos.id, idSelected)),
    [idSelected]
  );

  const handleSaveAviso = async (data: AvisoValues) => {
    if (idSelected < 1) {
      await handleNewAviso(data);
    } else {
      await handleExistingAviso(data);
    }
    router.push(
      "/screens/Aviso/CaracteristicasFisicasYAmbientalesPage/CaracteristicasFisicasYAmbientalesPage"
    );
  };

  const handleNewAviso = async (data: AvisoValues) => {
    const nombreAviso = Date.now().toString();
    if (data.Fotografia) {
      const responseImage = await saveImage(data.Fotografia);
      data.Fotografia = responseImage.uri;
    }
    const idAvisoSqlite = await addAviso(
      data,
      nombreAviso,
      idRecorridoSelected
    );
    setIdAvisoSelected(Number(idAvisoSqlite));
  };

  const handleExistingAviso = async (data: AvisoValues) => {
    if (data.Fotografia) {
      const response = await saveImage(data.Fotografia);
      if (!response.existImage) {
        await deletePhotoByIdAviso(idSelected);
        data.Fotografia = response.uri;
      }
    }
    await updateAviso(data, data.Nombre ?? "", idSelected);
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

  const onValuesChange = async (data: Partial<AvisoValues>) => {
    const previousValues = previouValuesRef.current;
    if (JSON.stringify(previousValues) === JSON.stringify(data)) {
      return;
    }
    previouValuesRef.current = data;
    if (idSelected < 1) {
      await handleNewAviso(data as AvisoValues);
    } else {
      if (data.Fotografia !== previousValues.Fotografia && data.Fotografia) {
        setLoading(true);
        const response = await saveImage(data.Fotografia);
        if (!response.existImage) {
          await deletePhotoByIdAviso(idSelected);
          data.Fotografia = response.uri;
        }
        setLoading(false);
      }
      await updateAviso(data, data.Nombre ?? "", idSelected);
    }
  };

  if ((avisosDbLocal.length === 0 && idSelected > 0) || loading) {
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
        onValuesChange={(vaxlues) => {
          onValuesChange(vaxlues);
        }}
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
