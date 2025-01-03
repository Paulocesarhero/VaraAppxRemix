import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AvisoForm } from "varaapplib/components/AvisoForm/AvisoForm";
import { AvisoValues } from "varaapplib/components/AvisoForm/types";

import InlineButton from "../../../components/InlineButton/InlineButton";
import { ColorsPalete } from "../../../constants/COLORS";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";

const AvisoPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setFormulario } = useAvisoStore((state) => state.actions);
  const handleValuesChange = async (values: Partial<AvisoValues>) => {
    console.log(values);
  };
  const data: AvisoValues = {
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
  };

  const headerHeight = useHeaderHeight();
  const CustomButton = ({ onPress }: { onPress?: () => void }) => (
    <>
      <InlineButton
        text="Continar"
        icon={
          <MaterialCommunityIcons
            name="page-next-outline"
            size={24}
            color="black"
          />
        }
        onPress={onPress}
      />
    </>
  );
  return (
    <AvisoForm
      scroolViewStyles={{
        paddingTop: Platform.OS === "android" ? 0 : headerHeight,
        paddingHorizontal: 0,
      }}
      reactNodeButton={CustomButton}
      onSubmitData={(value) => console.log()}
      loading={loading}
      setLoading={setLoading}
      onValuesChange={handleValuesChange}
      data={data}
    />
  );
};

const AvisoPagestyle = StyleSheet.create({
  button: {
    borderWidth: 0.5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AvisoPage;
