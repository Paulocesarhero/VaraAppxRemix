import RegistroMorfometricoSirenio from "./RegistroMorfometricoSirenio";

interface MorfometriaSirenioProps {
  onSubmitData?: (data: RegistroMorfometricoSirenio) => void;
  data?: RegistroMorfometricoSirenio;
  isDisabled?: boolean;
  onValuesChange: (values: Partial<RegistroMorfometricoSirenio>) => void;
}

export default MorfometriaSirenioProps;
