import { useFocusEffect, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";

import {
  addEspecimenIfNotExist,
  deletePhotoEspecimenById,
  hasRegistroMorfometrico,
  updateEspecimenById,
} from "../../../../../database/repository/especimenRepo";
import Especimen from "../../../../../forms/Especimen/Especimen";
import { FormValuesEspecimen } from "../../../../../forms/Especimen/FormValuesEspecimen";

import useAvisoStore from "../../../../../hooks/globalState/useAvisoStore";
import { saveImage } from "../../../../../hooks/helpers";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "../../../../../database/connection/sqliteConnection";
import { Especie } from "../../../../../services/Especie/GetEspecie";
import { addMisticetoIfNotExist } from "../../../../../database/repository/misticetoRepo";
import { addOdontocetoIfNotExist } from "../../../../../database/repository/odontocetoRepo";
import { addPinnipedoIfNotExists } from "../../../../../database/repository/pinipedoRepo";
import { addSirenioIfNotExists } from "../../../../../database/repository/sirenioRepo";
import { SQL } from "drizzle-orm";
import { especimen as especimenSchema } from "../../../../../database/schemas/avisoSchema"; // Ajusta esta ruta según tu estructura

const EspecimenPage: React.FC = () => {
  const idAviso = useAvisoStore((state) => state.idAvisoSelected);
  const { setIdtaxaEspecie } = useAvisoStore();

  const idEspecimen = useAvisoStore((state) => state.idEspecimen);
  const { setIdEspecimen } = useAvisoStore();
  const [hasMorfometria, setHasMorfometria] = useState<boolean>();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const previouValuesRef = useRef<Partial<FormValuesEspecimen>>({});

  const { data: especimenBdLocal } = useLiveQuery(
    db.query.especimen.findFirst({
      where: (
        especimen: typeof especimenSchema,
        { eq }: { eq: (column: unknown, value: unknown) => SQL<unknown> }
      ) => eq(especimen.id, idEspecimen),
      with: {
        especie: true,
      },
    }),
    [idEspecimen, isLoading]
  );

  const loadHasMorfometria = async () => {
    if (idEspecimen < 1) {
      const idEspecimen = await addEspecimenIfNotExist(idAviso);
      setIdEspecimen(idEspecimen);
    }
    setIsLoading(true);
    const result = await hasRegistroMorfometrico(idEspecimen);
    setHasMorfometria(result);
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadHasMorfometria();
    }, [idEspecimen])
  );
  const onSubmitData = async (data: FormValuesEspecimen) => {
    const MISTICETO = 0;
    const PINNIPEDO = 1;
    const ODONTOCETO = 2;
    const SIRENIO = 3;
    try {
      if (!data.Especie) return;
      if (idEspecimen === null) return;

      if (data.golpesFoto) {
        const response = await saveImage(data.golpesFoto);
        if (!response.existImage) {
          data.golpesFoto = response.uri;
          await deletePhotoEspecimenById(idEspecimen, "golpes");
        }
      }
      if (data.heridasBalaFoto) {
        const response = await saveImage(data.heridasBalaFoto);
        if (!response.existImage) {
          await deletePhotoEspecimenById(idEspecimen, "heridasDeBala");
          data.heridasBalaFoto = response.uri;
        }
      }
      if (data.presenciaDeRedesFoto) {
        const response = await saveImage(data.presenciaDeRedesFoto);
        if (!response.existImage) {
          await deletePhotoEspecimenById(idEspecimen, "presenciaDeRedes");
          data.presenciaDeRedesFoto = response.uri;
        }
      }
      if (data.mordidasFoto) {
        const response = await saveImage(data.mordidasFoto);
        if (!response.existImage) {
          await deletePhotoEspecimenById(idEspecimen, "mordidas");
          data.mordidasFoto = response.uri;
        }
      }
      if (data.otroTipoDeHeridasFoto) {
        const response = await saveImage(data.otroTipoDeHeridasFoto);
        if (!response.existImage) {
          await deletePhotoEspecimenById(idEspecimen, "otros");
          data.otroTipoDeHeridasFoto = response.uri;
        }
      }
      await updateEspecimenById(data, idEspecimen);

      const taxaDelForm = data.Especie?.taxa;
      setIdtaxaEspecie(taxaDelForm);
      switch (taxaDelForm) {
        case MISTICETO:
          await addMisticetoIfNotExist(idEspecimen);
          break;
        case PINNIPEDO:
          await addPinnipedoIfNotExists(idEspecimen);
          break;
        case ODONTOCETO:
          await addOdontocetoIfNotExist(idEspecimen);
          break;
        case SIRENIO:
          await addSirenioIfNotExists(idEspecimen);
          break;
      }
      router.back();
    } catch {
      Alert.alert(
        "Error al enviar los datos intenta volver a seleccionar las fotos"
      );
    }
  };

  const handleValuesChange = async (data: Partial<FormValuesEspecimen>) => {
    console.log("handle values change", data);
    const previousValues = previouValuesRef.current;
    if (!data) return;
    if (JSON.stringify(previousValues) === JSON.stringify(data)) {
      return;
    }
    previouValuesRef.current = data;
    if (!data.Especie) return;
    if (idEspecimen === null) return;
    try {
      if (
        data.presenciaDeRedesFoto !== previousValues.presenciaDeRedesFoto &&
        data.presenciaDeRedesFoto
      ) {
        try {
          setIsLoading(true);
          const response = await saveImage(data.presenciaDeRedesFoto);
          if (!response.existImage) {
            await deletePhotoEspecimenById(idEspecimen, "presenciaDeRedes");
            const updatedData = {
              ...data,
              presenciaDeRedesFoto: response.uri,
            };
            await updateEspecimenById(updatedData, idEspecimen);

            previouValuesRef.current = {
              ...previouValuesRef.current,
              presenciaDeRedesFoto: response.uri,
            };
            data.presenciaDeRedesFoto = response.uri;
          }
          setIsLoading(false);
          return;
        } finally {
          setIsLoading(false);
        }
      }
      if (data.golpesFoto !== previousValues.golpesFoto && data.golpesFoto) {
        try {
          setIsLoading(true);
          const response = await saveImage(data.golpesFoto);
          if (!response.existImage) {
            await deletePhotoEspecimenById(idEspecimen, "golpes");
            const updatedData = { ...data, golpesFoto: response.uri };
            await updateEspecimenById(updatedData, idEspecimen);
            previouValuesRef.current = {
              ...previouValuesRef.current,
              golpesFoto: response.uri,
            };
            data.golpesFoto = response.uri;
          }
          setIsLoading(false);
          return;
        } finally {
          setIsLoading(false);
        }
      }
      if (
        data.heridasBalaFoto !== previousValues.heridasBalaFoto &&
        data.heridasBalaFoto
      ) {
        try {
          setIsLoading(true);
          const response = await saveImage(data.heridasBalaFoto);
          if (!response.existImage) {
            await deletePhotoEspecimenById(idEspecimen, "heridasDeBala");
            const updatedData = {
              ...data,
              heridasBalaFoto: response.uri,
            };

            await updateEspecimenById(updatedData, idEspecimen);

            previouValuesRef.current = {
              ...previouValuesRef.current,
              heridasBalaFoto: response.uri,
            };

            data.heridasBalaFoto = response.uri;
          }
          setIsLoading(false);
          return;
        } finally {
          setIsLoading(false);
        }
      }

      if (
        data.mordidasFoto !== previousValues.mordidasFoto &&
        data.mordidasFoto
      ) {
        try {
          setIsLoading(true);
          const response = await saveImage(data.mordidasFoto);
          if (!response.existImage) {
            await deletePhotoEspecimenById(idEspecimen, "mordidas");
            const updatedData = { ...data, mordidasFoto: response.uri };

            await updateEspecimenById(updatedData, idEspecimen);

            previouValuesRef.current = {
              ...previouValuesRef.current,
              mordidasFoto: response.uri,
            };
            data.mordidasFoto = response.uri;
          }
          setIsLoading(false);
          return;
        } finally {
          setIsLoading(false);
        }
      }

      if (
        data.otroTipoDeHeridasFoto !== previousValues.otroTipoDeHeridasFoto &&
        data.otroTipoDeHeridasFoto
      ) {
        try {
          setIsLoading(true);
          const response = await saveImage(data.otroTipoDeHeridasFoto);
          if (!response.existImage) {
            await deletePhotoEspecimenById(idEspecimen, "otros");
            const updatedData = {
              ...data,
              otroTipoDeHeridasFoto: response.uri,
            };
            await updateEspecimenById(updatedData, idEspecimen);
            previouValuesRef.current = {
              ...previouValuesRef.current,
              otroTipoDeHeridasFoto: response.uri,
            };
            data.otroTipoDeHeridasFoto = response.uri;
          }
          setIsLoading(false);
          return;
        } finally {
          setIsLoading(false);
        }
      }
      console.log("Antes update", data);
      await updateEspecimenById(data, idEspecimen);
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error al enviar los datos intenta volver a seleccionar las fotos"
      );
    }
  };

  if (isLoading || idEspecimen === null || hasMorfometria == undefined) {
    return (
      <ActivityIndicator
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        size="large"
      />
    );
  }

  return (
    <Especimen
      hasMorfometria={hasMorfometria}
      initialValues={
        {
          Latitud: especimenBdLocal?.latitud ?? "",
          Longitud: especimenBdLocal?.longitud ?? "",
          EspecieId: especimenBdLocal?.especieId ?? 1,
          Especie: especimenBdLocal?.especie as Especie,
          condicion: especimenBdLocal?.condicion ?? 0,
          longitudTotalRectilinea:
            especimenBdLocal?.longitudTotalRectilinea ?? "",
          peso: especimenBdLocal?.peso ?? "",
          sexo: especimenBdLocal?.sexo ?? 0,
          grupoDeEdad: especimenBdLocal?.grupoDeEdad ?? 0,
          orientacionDelEspecimen:
            especimenBdLocal?.orientacionDelEspecimen ?? "",
          sustrato: especimenBdLocal?.sustrato ?? 0,
          otroSustrato: especimenBdLocal?.otroSustrato ?? "",
          heridasBala: especimenBdLocal?.heridasBala ?? "",
          heridasBalaFoto: especimenBdLocal?.heridasBalaFoto ?? "",
          presenciaDeRedes: especimenBdLocal?.presenciaDeRedes ?? "",
          presenciaDeRedesFoto: especimenBdLocal?.presenciaDeRedesFoto ?? "",
          mordidas: especimenBdLocal?.mordidas ?? "",
          mordidasFoto: especimenBdLocal?.mordidasFoto ?? "",
          golpes: especimenBdLocal?.golpes ?? "",
          golpesFoto: especimenBdLocal?.golpesFoto ?? "",
          otroTipoDeHeridas: especimenBdLocal?.otroTipoDeHeridas ?? "",
          otroTipoDeHeridasFoto: especimenBdLocal?.otroTipoDeHeridasFoto ?? "",
        } as FormValuesEspecimen
      }
      onValuesChange={async (values: Partial<FormValuesEspecimen>) => {
        await handleValuesChange(values);
      }}
      onSubmitData={onSubmitData}
    />
  );
};
export default EspecimenPage;
