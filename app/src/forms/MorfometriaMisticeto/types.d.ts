import FormValuesMorfometriaMisticeto from "./FormValuesMorfometriaMisticeto";

interface MorfometriaMisticetoProps {
  onSubmitData?: (data: FormValuesMorfometriaMisticeto) => void;
  data?: FormValuesMorfometriaMisticeto;
  onValuesChange: (values: Partial<FormValuesMorfometriaMisticeto>) => void;
}

export default MorfometriaMisticetoProps;
