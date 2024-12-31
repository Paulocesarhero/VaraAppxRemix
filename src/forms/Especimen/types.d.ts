import { FormValuesFormatoIndividual } from "./FormValuesEspecimen";

export interface FormatoIndividualProps {
  initialValues: FormValuesFormatoIndividual;

  onValuesChange: (values: Partial<FormValuesFormatoIndividual>) => void;
  isDisabled?: boolean;
}
