import FormValuesMorfometriaMisticeto from "./FormValuesMorfometriaMisticeto";

interface MorfometriaMisticetoProps {
  onSubmitData: (data: FormValuesMorfometriaMisticeto) => void;
  data?: FormValuesMorfometriaMisticeto;
  isDisabled?: boolean;
  onValuesChange: (values: Partial<FormValuesMorfometriaMisticeto>) => void;
}

export default MorfometriaMisticetoProps;
