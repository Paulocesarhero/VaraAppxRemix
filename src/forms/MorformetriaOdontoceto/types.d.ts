import RegistroMorfometricoOdontoceto from "./RegistroMorfometricoOdontoceto";

interface MorformetriaOdontocetoProps {
  onSubmitData: (data: RegistroMorfometricoOdontoceto) => void;
  data?: RegistroMorfometricoOdontoceto;
  isDisabled?: boolean;
  onValuesChange: (values: Partial<RegistroMorfometricoOdontoceto>) => void;
}
