import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { AvisoForm } from "varaapplib/components/AvisoForm/AvisoForm";
import { AvisoValues } from "varaapplib/components/AvisoForm/types";

import InlineButton from "../../../components/InlineButton/InlineButton";
import {
  addAviso,
  getAvisoByIdLocalDb,
  getAvisosBdLocal,
} from "../../../database/repository/avisoRepo";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";
import useListAvisosStore from "../../../hooks/globalState/useListAvisosStore";
import { getDateNow } from "../../../hooks/helpers";
import { AvisoApiGet } from "../../../services/Avisos/GetAvisosVaraWeb";

const AvisoPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const idSelected = useAvisoStore((state) => state.idSelected);
  const { addAvisoStore, fetchAvisosLocales } = useListAvisosStore();
  const [dataAvisos, setDataAvisos] = useState<AvisoValues>({
    Nombre: "",
    Telefono: "",
    FacilAcceso: false,
    Acantilado: false,
    Sustrato: 0,
    LugarDondeSeVio: 0,
    FechaDeAvistamiento: getDateNow(),
    Observaciones: "",
    CondicionDeAnimal: 0,
    CantidadDeAnimales: "",
    InformacionDeLocalizacion: "",
    Latitud: "",
    Longitud: "",
    Fotografia: null,
  });

  const handleValuesChange = async (values: Partial<AvisoValues>) => {
    //console.log(values);
  };

  useEffect(() => {
    const loadAvisos = async () => {
      if (idSelected > 0) {
        const aviso = await getAvisoByIdLocalDb(idSelected);
        setDataAvisos(aviso);
      } else {
        setDataAvisos({
          Nombre: "",
          Telefono: "",
          FacilAcceso: false,
          Acantilado: false,
          Sustrato: 0,
          LugarDondeSeVio: 0,
          FechaDeAvistamiento: "",
          Observaciones: "",
          CondicionDeAnimal: 0,
          CantidadDeAnimales: "",
          InformacionDeLocalizacion: "",
          Latitud: "",
          Longitud: "",
          Fotografia: null,
        });
      }
    };

    loadAvisos();
  }, [idSelected]);
  const handleButtonPress = async (data: AvisoValues) => {
    try {
      const nombreAviso = Date.now().toString();

      const idAvisoSqlite = await addAviso(data, nombreAviso);
      console.log("respuesta de add aviso: ", idAvisoSqlite);

      const avisoData: AvisoApiGet = {
        id: idAvisoSqlite,
        fotografia: data.Fotografia,
        isModificable: true,
        fechaDeAvistamiento: data.FechaDeAvistamiento,
        cantidadDeAnimales: data.CantidadDeAnimales,
      };

      addAvisoStore(avisoData);

      const avisosResult = await getAvisosBdLocal();
      console.log(
        "respuesta de get avisos",
        JSON.stringify(avisosResult, null, 2)
      );
    } catch (error) {
      console.error("Error al manejar los avisos", error);
    }
  };

  const headerHeight = useHeaderHeight();
  const CustomButton = ({ onPress }: { onPress?: () => void }) => {
    return (
      <InlineButton
        text="Continuar"
        icon={
          <MaterialCommunityIcons
            name="page-next-outline"
            size={24}
            color="black"
          />
        }
        onPress={onPress}
      />
    );
  };

  return (
    <AvisoForm
      scroolViewStyles={{
        paddingTop: Platform.OS === "android" ? 0 : headerHeight,
        paddingHorizontal: 0,
      }}
      reactNodeButton={CustomButton}
      onSubmitData={(value) => {
        handleButtonPress(value);
      }}
      loading={loading}
      setLoading={setLoading}
      onValuesChange={handleValuesChange}
      data={dataAvisos}
    />
  );
};

export default AvisoPage;
