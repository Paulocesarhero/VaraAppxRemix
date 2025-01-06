import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import React, { useEffect, useState } from "react";
import { Platform, Text } from "react-native";
import { AvisoForm } from "varaapplib/components/AvisoForm/AvisoForm";
import { AvisoValues } from "varaapplib/components/AvisoForm/types";

import InlineButton from "../../../components/InlineButton/InlineButton";
import {
  addAviso,
  getAvisoByIdLocalDb,
  getAvisosBdLocal,
  updateAviso,
} from "../../../database/repository/avisoRepo";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";
import useListAvisosStore from "../../../hooks/globalState/useListAvisosStore";
import { getDateNow } from "../../../hooks/helpers";

const AvisoPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const idSelected = useAvisoStore((state) => state.idSelected);
  const { setIdSelected } = useAvisoStore();
  const { addAvisoStore } = useListAvisosStore();
  const headerHeight = useHeaderHeight();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    CantidadDeAnimales: "1",
    InformacionDeLocalizacion: "",
    Latitud: "",
    Longitud: "",
    Fotografia: null,
  });

  const loadAvisos = async () => {
    setIsLoading(true); // Activar estado de carga
    try {
      if (idSelected > 0) {
        const aviso = await getAvisoByIdLocalDb(idSelected);
        setDataAvisos(aviso);
      } else {
        setDataAvisos({
          ...dataAvisos,
          FechaDeAvistamiento: "",
        });
      }
    } catch (error) {
      console.error("Error al obtener aviso: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValuesChange = async (values: Partial<AvisoValues>) => {
    if (idSelected > 0) {
      try {
        await updateAviso(values, dataAvisos.Nombre ?? "", idSelected);
      } catch (error) {
        console.error("Error al actualizar aviso: ", error);
      }
    }
  };

  const handleButtonPress = async (data: AvisoValues) => {
    try {
      const nombreAviso = Date.now().toString();
      const idAvisoSqlite = await addAviso(data, nombreAviso);

      const avisoData = {
        id: idAvisoSqlite,
        fotografia: data.Fotografia,
        isModificable: true,
        fechaDeAvistamiento: data.FechaDeAvistamiento,
        cantidadDeAnimales: data.CantidadDeAnimales,
      };

      addAvisoStore(avisoData);
      setIdSelected(Number(idAvisoSqlite));
    } catch (error) {
      console.error("Error al manejar los avisos", error);
    }
  };

  const CustomButton = ({ onPress }: { onPress?: () => void }) => (
    <InlineButton
      text="Continuar y guardar"
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

  useEffect(() => {
    loadAvisos();
  }, [idSelected]);

  if (isLoading) {
    return <Text>Cargando datos...</Text>;
  }

  return (
    <AvisoForm
      scroolViewStyles={{
        paddingTop: Platform.OS === "android" ? 0 : headerHeight,
        paddingHorizontal: 0,
      }}
      reactNodeButton={CustomButton}
      onSubmitData={handleButtonPress}
      loading={loading}
      setLoading={setLoading}
      onValuesChange={handleValuesChange}
      data={dataAvisos}
    />
  );
};

export default AvisoPage;
