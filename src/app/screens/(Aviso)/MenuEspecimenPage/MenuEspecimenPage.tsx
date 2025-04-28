import { MenuEspecimen } from "../../../../components/MenuEspecimen/MenuEspecimen";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { useLiveQuery } from "drizzle-orm/expo-sqlite/index";
import { db } from "../../../../database/connection/sqliteConnection";
import useAvisoStore from "../../../../hooks/globalState/useAvisoStore";
import { acciones, organismo } from "../../../../database/schemas/avisoSchema";

const MenuEspecimenPage = () => {
  const router = useRouter();
  const idAviso = useAvisoStore((state) => state.idAvisoSelected);
  const idEspecimen = useAvisoStore((state) => state.idEspecimen);
  const { setIdEspecimen } = useAvisoStore();
  const [hasMorfometria, setHasMorfometria] = useState<boolean>();

  const { data: especimenBdLocal } = useLiveQuery(
    idEspecimen > 0
      ? db.query.especimen.findFirst({
          where: (especimen, { eq }) => eq(especimen.id, idEspecimen),
          with: {
            especie: true,
          },
        })
      : db.query.especimen.findFirst({
          where: (especimen, { eq }) => eq(especimen.avisoId, idAviso),
          with: {
            especie: true,
          },
        }),
    [idEspecimen, idAviso]
  );
  useFocusEffect(
    React.useCallback(() => {
      if (especimenBdLocal?.id) {
        setIdEspecimen(especimenBdLocal.id);
      }
    }, [especimenBdLocal?.id])
  );
  const { data: organismoVivoBD } = useLiveQuery(
    db.query.organismo.findFirst({
      where: (especimen, { eq }) => eq(organismo.especimenId, idEspecimen),
    }),
    [idEspecimen]
  );
  const { data: accionesBd } = useLiveQuery(
    db.query.acciones.findFirst({
      where: (especimen, { eq }) => eq(acciones.especimenId, idEspecimen),
    }),
    [idEspecimen]
  );

  // En tu componente React
  const { data: hasMisticeto } = useLiveQuery(
    db.query.misticeto.findFirst({
      where: (misticeto, { eq }) => eq(misticeto.especimenId, idEspecimen),
    }),
    [idEspecimen]
  );

  const { data: hasOdontoceto } = useLiveQuery(
    db.query.odontoceto.findFirst({
      where: (odontoceto, { eq }) => eq(odontoceto.especimenId, idEspecimen),
    }),
    [idEspecimen]
  );

  const { data: hasPinnipedo } = useLiveQuery(
    db.query.pinnipedo.findFirst({
      where: (pinnipedo, { eq }) => eq(pinnipedo.especimenId, idEspecimen),
    }),
    [idEspecimen]
  );

  const { data: hasSirenio } = useLiveQuery(
    db.query.sirenio.findFirst({
      where: (sirenio, { eq }) => eq(sirenio.especimenId, idEspecimen),
    }),
    [idEspecimen]
  );

  useEffect(() => {
    setHasMorfometria(
      !!hasMisticeto || !!hasOdontoceto || !!hasPinnipedo || !!hasSirenio
    );
  }, [hasMisticeto, hasOdontoceto, hasPinnipedo, hasSirenio]);

  const handleOnPressFormatoIndividual = async () => {
    router.push("screens/(Especimen)/EspecimenPages/EspecimenPage");
  };
  const handleOnPressMorfometrico = async () => {
    const MISTICETO = 0;
    const PINNIPEDO = 1;
    const ODONTOCETO = 2;
    const SIRENIO = 3;
    switch (especimenBdLocal?.especie?.taxa) {
      case MISTICETO:
        router.push("screens/(Especimen)/Misticeto/Misticeto");
        break;
      case PINNIPEDO:
        router.push("screens/(Especimen)/Pinnipedo/Pinnipedo");
        break;
      case ODONTOCETO:
        router.push("screens/(Especimen)/Odontoceto/Odontoceto");
        break;
      case SIRENIO:
        router.push("screens/(Especimen)/Sirenio/Sirenio");
        break;
    }
  };
  const handleOnPressSoloOrganismoVivo = async () => {
    router.push(
      "screens/(Especimen)/SoloOrganismosVivosPage/SoloOrganismosVivosPage"
    );
  };
  const handleOnPressAccionesYResultados = async () => {
    router.push(
      "screens/(Especimen)/AccionesYResultadosPage/AccionesYResultadosPage"
    );
  };
  return (
    <MenuEspecimen
      onPressFormatoIndividual={handleOnPressFormatoIndividual}
      formatoIndividualComplete={hasMorfometria}
      avisoComplete={!!especimenBdLocal?.especie}
      registroMorfometricoComplete={hasMorfometria}
      soloOrganismoVivoComplete={!!organismoVivoBD}
      accionesYResultadosComplete={!!accionesBd}
      onPressRegistroMorfometrico={handleOnPressMorfometrico}
      onPressSoloOrganismoVivo={handleOnPressSoloOrganismoVivo}
      onPressAccionesYResultados={handleOnPressAccionesYResultados}
    />
  );
};
export default MenuEspecimenPage;
