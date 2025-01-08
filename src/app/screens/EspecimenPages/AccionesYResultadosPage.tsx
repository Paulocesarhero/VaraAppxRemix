import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { ColorsPalete } from "../../../constants/COLORS";
import AccionesYResultadosForm from "../../../forms/AccionesYResultados/AccionesYResultados";
import FormValuesAccionesYresultados from "../../../forms/AccionesYResultados/FormValuesAccionesYresultados";
import accionesResultadosFormStore from "../../../hooks/accionesResultadosFormStore";

const Recommendations: React.FC = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const handleSubmit = () => {};
  const handleRegistrarAviso = () => {
    router.push("screens/Stranding/StrandingPage");
  };
  const { formValues, setFormValues, resetForm } =
    accionesResultadosFormStore();

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: ColorsPalete.light }}
    >
      <AccionesYResultadosForm
        onSubmitData={(data: FormValuesAccionesYresultados) => {
          console.log("Datos enviados:", data);
        }}
        loading={false}
        setLoading={function (loading: boolean): void {
          throw new Error("Function not implemented.");
        }}
        initialValues={formValues}
        onValuesChange={setFormValues}
      />
    </SafeAreaView>
  );
};
export default Recommendations;
