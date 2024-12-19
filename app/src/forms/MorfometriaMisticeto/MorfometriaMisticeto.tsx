import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { ColorsPalete } from "../../constants/COLORS";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";
import { useForm } from "react-hook-form";
import InputField from "varaapplib/components/MaterialInput/MaterialInput";
import FormValuesMorfometriaMisticeto from "./FormValuesMorfometriaMisticeto";
import MorfometriaMisticetoProps from "./types";
import LabelAndImage from "../../components/InputAndImage/LabelAndImage";
import handleNumericInput from "../../hooks/validations";

const MorfometriaMisticeto: React.FC<MorfometriaMisticetoProps> = ({
  data,
  onValuesChange,
}) => {
  const { handleSubmit, control, setValue, getValues, watch } =
    useForm<FormValuesMorfometriaMisticeto>({
      defaultValues: data,
    });
  const watchedValues = watch();

  useEffect(() => {
    onValuesChange(watchedValues);
  }, [watchedValues]);
  return (
    <View style={{ flex: 1, backgroundColor: ColorsPalete.light }}>
      <CustomizableHeader
        containerStyle={{ backgroundColor: ColorsPalete.dark }}
        centerComponent={
          <Text style={{ color: ColorsPalete.light }}>
            Morfometría de misticeto
          </Text>
        }
      ></CustomizableHeader>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 0}
      >
        <TouchableWithoutFeedback>
          <ScrollView>
            <View>
              <Text style={{ textAlign: "center", margin: 5, fontSize: 16 }}>
                Misticetos (características de las barbas)
              </Text>
            </View>
            <InputField
              isRequired={false}
              iconName={"calculator"}
              onChangeText={(text) =>
                handleNumericInput("NumeroDeBarbas", text, setValue)
              }
              placeholder={"Ejemplo: 5"}
              keyboardType={"numeric"}
              label={"Numero de barbas"}
              control={control}
              nameInput="NumeroDeBarbas"
            />
            <InputField
              isRequired={false}
              keyboardType={"numeric"}
              placeholder={"Ejemplo: Blanco"}
              iconName={"color-palette-sharp"}
              label={"Color de barbas"}
              control={control}
              nameInput="BarbasColor"
            />
            <InputField
              isRequired={false}
              placeholder={"Ejemplo: 120 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              onChangeText={(text) =>
                handleNumericInput("BarbaLargo", text, setValue)
              }
              keyboardType={"numeric"}
              label={"Largo de la barba"}
              control={control}
              nameInput="BarbaLargo"
            />
            <InputField
              isRequired={false}
              placeholder={"Ejemplo: 120 cm"}
              iconFamily={"Entypo"}
              keyboardType={"numeric"}
              iconName={"ruler"}
              onChangeText={(text) =>
                handleNumericInput("BarbaAncho", text, setValue)
              }
              label={"Ancho de la barba"}
              control={control}
              nameInput="BarbaAncho"
            />

            <View>
              <Text style={{ textAlign: "center", margin: 5, fontSize: 16 }}>
                Medidas del misticeto
              </Text>
            </View>
            <LabelAndImage
              label={"Referencia longitud total"}
              image={require("./images/mysticeti1/mysticeti1.png")}
            />

            <InputField
              nameInput={"M1LongitudTotalLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              control={control}
              isRequired={false}
              onChangeText={(text) =>
                handleNumericInput("M1LongitudTotalLR", text, setValue)
              }
              label={"Longitud total de la línea recta"}
            />
            <InputField
              nameInput={"M1LongitudTotalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              isRequired={false}
              control={control}
              keyboardType={"numeric"}
              onChangeText={(text) =>
                handleNumericInput("M1LongitudTotalC", text, setValue)
              }
              label={"Longitud total de la línea curvilínea"}
            />
            <LabelAndImage
              label={"Referencia rostro al centro"}
              image={require("./images/mysticeti2/mysticeti2.png")}
            />
            <InputField
              nameInput={"M2LongitudRostroAlCentroDelAnoLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M2LongitudRostroAlCentroDelAnoLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud total del rostro al centro del ano en línea recta."
              }
            />
            <InputField
              nameInput={"M2LongitudRostroAlCentroDelAnoC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              isRequired={false}
              keyboardType={"numeric"}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M2LongitudRostroAlCentroDelAnoC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud total del rostro al centro del ano en línea curvilínea."
              }
            />
            <LabelAndImage
              label={"Referencia rostro al centro de la abertura genital"}
              image={require("./images/mysticeti3/mysticeti3.png")}
            />
            <InputField
              nameInput={"M3LongitudRostroAlCentroDeLaAberturaGenitalLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M3LongitudRostroAlCentroDeLaAberturaGenitalLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud rostro al centro de la abertura genital en línea recta."
              }
            />
            <InputField
              nameInput={"M3LongitudRostroAlCentroDeLaAberturaGenitalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              isRequired={false}
              control={control}
              keyboardType={"numeric"}
              onChangeText={(text) =>
                handleNumericInput(
                  "M3LongitudRostroAlCentroDeLaAberturaGenitalC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud rostro al centro de la abertura genital en línea curvilínea."
              }
            />

            <LabelAndImage
              label={"Referencia rostro a los pliegues gulares"}
              image={require("./images/mysticeti4/mysticeti4.png")}
            />
            <InputField
              nameInput={"M4LongitudDelRostroALosPlieguesGularesLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M4LongitudDelRostroALosPlieguesGularesLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a los pliegues gulares en línea recta."
              }
            />
            <InputField
              nameInput={"M4LongitudDelRostroALosPlieguesGularesC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              isRequired={false}
              keyboardType={"numeric"}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M4LongitudDelRostroALosPlieguesGularesC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a los pliegues gulares en línea curvilínea."
              }
            />

            <LabelAndImage
              label={"Referencia rostro al ombligo"}
              image={require("./images/mysticeti5/mysticeti5.png")}
            />
            <InputField
              nameInput={"M5LongitudDelRostroAlCentroDelOmbligoLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              isRequired={false}
              keyboardType={"numeric"}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M5LongitudDelRostroAlCentroDelOmbligoLR",
                  text,
                  setValue
                )
              }
              label={"Longitud del rostro al ombligo en línea recta."}
            />
            <InputField
              nameInput={"M5LongitudDelRostroAlCentroDelOmbligoC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M5LongitudDelRostroAlCentroDelOmbligoC",
                  text,
                  setValue
                )
              }
              label={"Longitud del rostro al ombligo en línea curvilínea."}
            />

            <LabelAndImage
              label={"Referencia rostro a la punta de la aleta dorsal"}
              image={require("./images/mysticeti6/mysticeti6.png")}
            />
            <InputField
              nameInput={"M6LongitudDelRostroAPuntaDeAletaDorsalLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              isRequired={false}
              control={control}
              keyboardType={"numeric"}
              onChangeText={(text) =>
                handleNumericInput(
                  "M6LongitudDelRostroAPuntaDeAletaDorsalLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la punta de la aleta dorsal em línea recta."
              }
            />

            <LabelAndImage
              label={"Referencia rostro a la aleta dorsal en parte anterior"}
              image={require("./images/mysticeti7/mysticeti7.png")}
            />
            <InputField
              nameInput={"M7LongitudDelRostroAAletaDorsalEnParteAnteriorLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M7LongitudDelRostroAAletaDorsalEnParteAnteriorLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la aleta dorsal en parte anterior en línea recta."
              }
            />
            <InputField
              nameInput={"M7LongitudDelRostroAAletaDorsalEnParteAnteriorC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              keyboardType={"numeric"}
              iconName={"ruler"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M7LongitudDelRostroAAletaDorsalEnParteAnteriorC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la aleta dorsal en parte anterior en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M8LongitudDelRostroAPartePosteriorDeLaAletaDorsalLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M8LongitudDelRostroAPartePosteriorDeLaAletaDorsalLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte posterior de la aleta dorsal en línea recta."
              }
            />

            <InputField
              nameInput={"M8LongitudDelRostroAPartePosteriorDeLaAletaDorsalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M8LongitudDelRostroAPartePosteriorDeLaAletaDorsalC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte posterior de la aleta dorsal en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M9LongitudDelRostroAParteSuperiorDeLaAletaDorsalLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M9LongitudDelRostroAParteSuperiorDeLaAletaDorsalLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta dorsal en línea recta."
              }
            />

            <InputField
              nameInput={"M9LongitudDelRostroAParteSuperiorDeLaAletaDorsalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M9LongitudDelRostroAParteSuperiorDeLaAletaDorsalC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta dorsal en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M10LongitudDelRostroAParteInferiorDeLaAletaDorsalLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M10LongitudDelRostroAParteInferiorDeLaAletaDorsalLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta dorsal en línea recta."
              }
            />

            <InputField
              nameInput={"M10LongitudDelRostroAParteInferiorDeLaAletaDorsalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M10LongitudDelRostroAParteInferiorDeLaAletaDorsalC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta dorsal en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M11LongitudDelRostroAParteDistalDeLaAletaDorsalLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M11LongitudDelRostroAParteDistalDeLaAletaDorsalLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta dorsal en línea recta."
              }
            />

            <InputField
              nameInput={"M11LongitudDelRostroAParteDistalDeLaAletaDorsalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M11LongitudDelRostroAParteDistalDeLaAletaDorsalC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta dorsal en línea curvilínea."
              }
            />
            <InputField
              nameInput={"M12LongitudDelRostroAParteSuperiorDeLaAletaAnalesLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M12LongitudDelRostroAParteSuperiorDeLaAletaAnalesLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta anales en línea recta."
              }
            />

            <InputField
              nameInput={"M12LongitudDelRostroAParteSuperiorDeLaAletaAnalesC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M12LongitudDelRostroAParteSuperiorDeLaAletaAnalesC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta anales en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M13LongitudDelRostroAParteInferiorDeLaAletaAnalesLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M13LongitudDelRostroAParteInferiorDeLaAletaAnalesLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta anales en línea recta."
              }
            />

            <InputField
              nameInput={"M13LongitudDelRostroAParteInferiorDeLaAletaAnalesC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M13LongitudDelRostroAParteInferiorDeLaAletaAnalesC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta anales en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M14LongitudDelRostroAParteDistalDeLaAletaAnalesLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M14LongitudDelRostroAParteDistalDeLaAletaAnalesLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta anales en línea recta."
              }
            />

            <InputField
              nameInput={"M14LongitudDelRostroAParteDistalDeLaAletaAnalesC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M14LongitudDelRostroAParteDistalDeLaAletaAnalesC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta anales en línea curvilínea."
              }
            />

            <InputField
              nameInput={
                "M15LongitudDelRostroAParteSuperiorDeLaAletaPectoralLR"
              }
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M15LongitudDelRostroAParteSuperiorDeLaAletaPectoralLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta pectoral en línea recta."
              }
            />

            <InputField
              nameInput={"M15LongitudDelRostroAParteSuperiorDeLaAletaPectoralC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M15LongitudDelRostroAParteSuperiorDeLaAletaPectoralC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta pectoral en línea curvilínea."
              }
            />

            <InputField
              nameInput={
                "M16LongitudDelRostroAParteInferiorDeLaAletaPectoralLR"
              }
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M16LongitudDelRostroAParteInferiorDeLaAletaPectoralLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta pectoral en línea recta."
              }
            />

            <InputField
              nameInput={"M16LongitudDelRostroAParteInferiorDeLaAletaPectoralC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M16LongitudDelRostroAParteInferiorDeLaAletaPectoralC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta pectoral en línea curvilínea."
              }
            />
            <InputField
              nameInput={"M17LongitudDelRostroAParteDistalDeLaAletaPectoralLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M17LongitudDelRostroAParteDistalDeLaAletaPectoralLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta pectoral en línea recta."
              }
            />

            <InputField
              nameInput={"M17LongitudDelRostroAParteDistalDeLaAletaPectoralC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M17LongitudDelRostroAParteDistalDeLaAletaPectoralC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta pectoral en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M18LongitudDelRostroAParteSuperiorDeLaAletaPelvicaLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M18LongitudDelRostroAParteSuperiorDeLaAletaPelvicaLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta pélvica en línea recta."
              }
            />

            <InputField
              nameInput={"M18LongitudDelRostroAParteSuperiorDeLaAletaPelvicaC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M18LongitudDelRostroAParteSuperiorDeLaAletaPelvicaC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta pélvica en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M19LongitudDelRostroAParteInferiorDeLaAletaPelvicaLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M19LongitudDelRostroAParteInferiorDeLaAletaPelvicaLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta pélvica en línea recta."
              }
            />

            <InputField
              nameInput={"M19LongitudDelRostroAParteInferiorDeLaAletaPelvicaC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M19LongitudDelRostroAParteInferiorDeLaAletaPelvicaC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta pélvica en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M20LongitudDelRostroAParteDistalDeLaAletaPelvicaLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M20LongitudDelRostroAParteDistalDeLaAletaPelvicaLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta pélvica en línea recta."
              }
            />

            <InputField
              nameInput={"M20LongitudDelRostroAParteDistalDeLaAletaPelvicaC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M20LongitudDelRostroAParteDistalDeLaAletaPelvicaC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta pélvica en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M21LongitudDelRostroAParteSuperiorDeLaAletaDorsalLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M21LongitudDelRostroAParteSuperiorDeLaAletaDorsalLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta dorsal en línea recta."
              }
            />

            <InputField
              nameInput={"M21LongitudDelRostroAParteSuperiorDeLaAletaDorsalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M21LongitudDelRostroAParteSuperiorDeLaAletaDorsalC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta dorsal en línea curvilínea."
              }
            />
            <InputField
              nameInput={"M22LongitudDelRostroAParteInferiorDeLaAletaDorsalLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M22LongitudDelRostroAParteInferiorDeLaAletaDorsalLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta dorsal en línea recta."
              }
            />

            <InputField
              nameInput={"M22LongitudDelRostroAParteInferiorDeLaAletaDorsalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M22LongitudDelRostroAParteInferiorDeLaAletaDorsalC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta dorsal en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M23LongitudDelRostroAParteDistalDeLaAletaDorsalLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M23LongitudDelRostroAParteDistalDeLaAletaDorsalLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta dorsal en línea recta."
              }
            />

            <InputField
              nameInput={"M23LongitudDelRostroAParteDistalDeLaAletaDorsalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M23LongitudDelRostroAParteDistalDeLaAletaDorsalC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta dorsal en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M24LongitudDelRostroAParteSuperiorDeLaAletaAnalLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M24LongitudDelRostroAParteSuperiorDeLaAletaAnalLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta anal en línea recta."
              }
            />

            <InputField
              nameInput={"M24LongitudDelRostroAParteSuperiorDeLaAletaAnalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M24LongitudDelRostroAParteSuperiorDeLaAletaAnalC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta anal en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M25LongitudDelRostroAParteInferiorDeLaAletaAnalLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M25LongitudDelRostroAParteInferiorDeLaAletaAnalLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta anal en línea recta."
              }
            />

            <InputField
              nameInput={"M25LongitudDelRostroAParteInferiorDeLaAletaAnalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M25LongitudDelRostroAParteInferiorDeLaAletaAnalC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta anal en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M26LongitudDelRostroAParteDistalDeLaAletaAnalLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M26LongitudDelRostroAParteDistalDeLaAletaAnalLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta anal en línea recta."
              }
            />

            <InputField
              nameInput={"M26LongitudDelRostroAParteDistalDeLaAletaAnalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M26LongitudDelRostroAParteDistalDeLaAletaAnalC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta anal en línea curvilínea."
              }
            />
            <InputField
              nameInput={"M27LongitudDelRostroAParteSuperiorDeLaAletaCaudalLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M27LongitudDelRostroAParteSuperiorDeLaAletaCaudalLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta caudal en línea recta."
              }
            />

            <InputField
              nameInput={"M27LongitudDelRostroAParteSuperiorDeLaAletaCaudalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M27LongitudDelRostroAParteSuperiorDeLaAletaCaudalC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta caudal en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M28LongitudDelRostroAParteInferiorDeLaAletaCaudalLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M28LongitudDelRostroAParteInferiorDeLaAletaCaudalLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta caudal en línea recta."
              }
            />

            <InputField
              nameInput={"M28LongitudDelRostroAParteInferiorDeLaAletaCaudalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M28LongitudDelRostroAParteInferiorDeLaAletaCaudalC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta caudal en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M29LongitudDelRostroAParteDistalDeLaAletaCaudalLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M29LongitudDelRostroAParteDistalDeLaAletaCaudalLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta caudal en línea recta."
              }
            />

            <InputField
              nameInput={"M29LongitudDelRostroAParteDistalDeLaAletaCaudalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M29LongitudDelRostroAParteDistalDeLaAletaCaudalC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta caudal en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M30LongitudDelRostroAParteSuperiorDeLaAletaPelvicaLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M30LongitudDelRostroAParteSuperiorDeLaAletaPelvicaLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta pélvica en línea recta."
              }
            />

            <InputField
              nameInput={"M30LongitudDelRostroAParteSuperiorDeLaAletaPelvicaC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M30LongitudDelRostroAParteSuperiorDeLaAletaPelvicaC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta pélvica en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M31LongitudDelRostroAParteInferiorDeLaAletaPelvicaLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M31LongitudDelRostroAParteInferiorDeLaAletaPelvicaLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta pélvica en línea recta."
              }
            />

            <InputField
              nameInput={"M31LongitudDelRostroAParteInferiorDeLaAletaPelvicaC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M31LongitudDelRostroAParteInferiorDeLaAletaPelvicaC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta pélvica en línea curvilínea."
              }
            />
            <InputField
              nameInput={"M32LongitudDelRostroAParteDistalDeLaAletaPelvicaLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M32LongitudDelRostroAParteDistalDeLaAletaPelvicaLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta pélvica en línea recta."
              }
            />

            <InputField
              nameInput={"M32LongitudDelRostroAParteDistalDeLaAletaPelvicaC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M32LongitudDelRostroAParteDistalDeLaAletaPelvicaC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta pélvica en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M33LongitudDelRostroAParteSuperiorDeLaAletaAnalLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M33LongitudDelRostroAParteSuperiorDeLaAletaAnalLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta anal en línea recta."
              }
            />

            <InputField
              nameInput={"M33LongitudDelRostroAParteSuperiorDeLaAletaAnalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M33LongitudDelRostroAParteSuperiorDeLaAletaAnalC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta anal en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M34LongitudDelRostroAParteInferiorDeLaAletaAnalLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M34LongitudDelRostroAParteInferiorDeLaAletaAnalLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta anal en línea recta."
              }
            />

            <InputField
              nameInput={"M34LongitudDelRostroAParteInferiorDeLaAletaAnalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M34LongitudDelRostroAParteInferiorDeLaAletaAnalC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta anal en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M35LongitudDelRostroAParteDistalDeLaAletaAnalLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M35LongitudDelRostroAParteDistalDeLaAletaAnalLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta anal en línea recta."
              }
            />

            <InputField
              nameInput={"M35LongitudDelRostroAParteDistalDeLaAletaAnalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M35LongitudDelRostroAParteDistalDeLaAletaAnalC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta anal en línea curvilínea."
              }
            />
            <InputField
              nameInput={
                "M36LongitudDelRostroAParteSuperiorDeLaAletaPectoralLR"
              }
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M36LongitudDelRostroAParteSuperiorDeLaAletaPectoralLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta pectoral en línea recta."
              }
            />

            <InputField
              nameInput={"M36LongitudDelRostroAParteSuperiorDeLaAletaPectoralC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M36LongitudDelRostroAParteSuperiorDeLaAletaPectoralC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte superior de la aleta pectoral en línea curvilínea."
              }
            />

            <InputField
              nameInput={
                "M37LongitudDelRostroAParteInferiorDeLaAletaPectoralLR"
              }
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M37LongitudDelRostroAParteInferiorDeLaAletaPectoralLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta pectoral en línea recta."
              }
            />

            <InputField
              nameInput={"M37LongitudDelRostroAParteInferiorDeLaAletaPectoralC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M37LongitudDelRostroAParteInferiorDeLaAletaPectoralC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta pectoral en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M38LongitudDelRostroAParteDistalDeLaAletaPectoralLR"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M38LongitudDelRostroAParteDistalDeLaAletaPectoralLR",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta pectoral en línea recta."
              }
            />

            <InputField
              nameInput={"M36CircunferenciaDelCuerpoDetrásDeLasPectoralesC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M36CircunferenciaDelCuerpoDetrásDeLasPectoralesC",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte distal de la aleta pectoral en línea curvilínea."
              }
            />

            <InputField
              nameInput={"M37CircunferenciaDelCuerpoANivelDelOmbligoC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M37CircunferenciaDelCuerpoANivelDelOmbligoC",
                  text,
                  setValue
                )
              }
              label={
                "Circunferencia del Cuerpo a Nivel del Ombligo (curvilínea, cm)"
              }
            />

            <InputField
              nameInput={"M38CircunferenciaDelCuerpoANivelDeLaAberturaGenitalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M38CircunferenciaDelCuerpoANivelDeLaAberturaGenitalC",
                  text,
                  setValue
                )
              }
              label={
                "Circunferencia del Cuerpo a Nivel de la Abertura Genital (curvilínea, cm)"
              }
            />

            <InputField
              nameInput={"M39CircunferenciaDelCuerpoEnElPedunculoCaudalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "Circunferencia del Cuerpo en el Pedúnculo Caudal (curvilínea, cm)",
                  text,
                  setValue
                )
              }
              label={
                "Longitud del rostro a la parte inferior de la aleta dorsal en línea recta."
              }
            />

            <InputField
              nameInput={"M40LongitudDeLaAberturaMamariaC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M40LongitudDeLaAberturaMamariaC",
                  text,
                  setValue
                )
              }
              label={"Longitud de la Abertura Mamaria (curvilínea, cm)"}
            />
            <InputField
              nameInput={"M41LongitudDeLaAberturaGenitalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M41LongitudDeLaAberturaGenitalC",
                  text,
                  setValue
                )
              }
              label={"Longitud de la Abertura Genital (curvilínea, cm)"}
            />

            <InputField
              nameInput={"M42LongitudDeLaAberturaAnalC"}
              placeholder={"Ejemplo: 11225 cm"}
              iconFamily={"Entypo"}
              iconName={"ruler"}
              keyboardType={"numeric"}
              isRequired={false}
              control={control}
              onChangeText={(text) =>
                handleNumericInput(
                  "M42LongitudDeLaAberturaAnalC",
                  text,
                  setValue
                )
              }
              label={"Longitud de la Abertura Anal (curvilínea, cm)"}
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};
export default MorfometriaMisticeto;
