import React from "react";
import { MenuAviso } from "../../../components/MenuAviso/MenuAviso";
import { router } from "expo-router";

const MenuAvisoPage = () => {
  const handlePressAviso = () => {
    router.push("screens/(Aviso)/AvisoPage/AvisoPage");
  };
  const handlePressCaracteristicas = () => {
    router.push(
      "/screens/(Aviso)/CaracteristicasFisicasYAmbientalesPage/CaracteristicasFisicasYAmbientalesPage"
    );
  };
  const handleSeleccionDeVaramiento = () => {
    router.push("screens/(Aviso)/MenuTipoDeAviso/MenuTipoDeAviso");
  };
  return (
    <MenuAviso
      onPressCaractaristicas={handlePressCaracteristicas}
      onPressAviso={handlePressAviso}
      onPressSeleccionDeVaramiento={handleSeleccionDeVaramiento}
    />
  );
};
export default MenuAvisoPage;
