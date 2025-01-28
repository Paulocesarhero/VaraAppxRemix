import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import MaterialCard from "varaapplib/components/MaterialCard/MaterialCard";

import { db } from "../../../database/connection/sqliteConnection";
import { hasVaramientoMasivo } from "../../../database/repository/varamientoMasivoRepo";
import {
  avisos,
  especimen,
  varamientoMasivo,
} from "../../../database/schemas/avisoSchema";
import useAvisoStore from "../../../hooks/globalState/useAvisoStore";

const MenuRegistrarAviso: React.FC = () => {
  const router = useRouter();
  const handleAvisoIndividual = () => {
    router.push("screens/EspecimenPages/EspecimenPage");
  };
  const handleVaramientoMasivo = () => {
    router.push("screens/VaramientoMasivoPage/VaramientoMasivoPage");
  };
  const { idAvisoSelected } = useAvisoStore();

  const { data: dataVaramientoMasivo } = useLiveQuery(
    db
      .select()
      .from(varamientoMasivo)
      .where(eq(varamientoMasivo.avisoId, idAvisoSelected)),
    [idAvisoSelected]
  );

  const { data: dataAvisoEspecimen } = useLiveQuery(
    db.select().from(especimen).where(eq(especimen.avisoId, idAvisoSelected)),
    [idAvisoSelected]
  );
  const hasAvisoIndividual = dataAvisoEspecimen?.length > 0;

  const hasVaramientoMasivoLocal = dataVaramientoMasivo?.length > 0;

  const renderCards = () => {
    if (hasAvisoIndividual && !hasVaramientoMasivoLocal) {
      return (
        <MaterialCard
          onPress={handleAvisoIndividual}
          leftComponent={
            <MaterialIcons name="add-to-queue" size={50} color="black" />
          }
          label="Aviso individual"
        />
      );
    }
    if (hasVaramientoMasivoLocal) {
      return (
        <MaterialCard
          onPress={handleVaramientoMasivo}
          leftComponent={
            <MaterialIcons name="add-to-photos" size={50} color="black" />
          }
          label="Varamiento masivo"
        />
      );
    }
    if (!hasAvisoIndividual && !hasVaramientoMasivoLocal) {
      return (
        <>
          <MaterialCard
            onPress={handleAvisoIndividual}
            leftComponent={
              <MaterialIcons name="add-to-queue" size={50} color="black" />
            }
            label="Aviso individual"
          />
          <MaterialCard
            onPress={handleVaramientoMasivo}
            leftComponent={
              <MaterialIcons name="add-to-photos" size={50} color="black" />
            }
            label="Varamiento masivo"
          />
        </>
      );
    }
    return null;
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 40,
      }}
    >
      {renderCards()}
    </View>
  );
};
export default MenuRegistrarAviso;
