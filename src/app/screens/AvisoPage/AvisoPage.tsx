import { useState } from "react";
import { View } from "react-native";
import { AvisoForm } from "varaapplib/components/AvisoForm/AvisoForm";
import { AvisoValues } from "varaapplib/components/AvisoForm/types";

import useAvisoStore from "../../../hooks/globalState/useAvisoStore";
interface GrupoProps {
  grupoId?: string;
}

const AvisoPage: React.FC<GrupoProps> = ({
  grupoId = `aviso_${Date.now()}`,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setFormulario } = useAvisoStore((state) => state.actions);
  const handleValuesChange = async (values: Partial<AvisoValues>) => {
    try {
      await setFormulario(grupoId, "Aviso", values);
      console.log("Valores parcialmente guardados:", values);
    } catch (error) {
      console.error("Error al guardar cambios parciales:", error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <AvisoForm
        onSubmitData={(value) => console.log()}
        loading={loading}
        setLoading={setLoading}
        onValuesChange={handleValuesChange}
      />
    </View>
  );
};
export default AvisoPage;
