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
import { getDateNow } from "../../../hooks/helpers";

const AvisoPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const idSelected = useAvisoStore((state) => state.idSelected);
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
  const handleButtonPress = (data: AvisoValues) => {
    const nombreAviso = Date.now().toString();
    const result = addAviso(data, nombreAviso).then((respueste: number) => {
      console.log("respuesta de add aviso" + respueste);
    });
    console.log(result);
    const avisosResult = getAvisosBdLocal().then((respuesta: any) => {
      console.log(
        "respuesta de get avisos" + JSON.stringify(respuesta, null, 2)
      );
    });
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
