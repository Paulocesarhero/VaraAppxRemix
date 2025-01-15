import { FormValuesVaramientoMasivo } from "./FormValuesVaramientoMasivo";

export interface VaramientoMasivoProps {
  initialValues?: FormValuesVaramientoMasivo;
  onSubmitData: (data: FormValuesVaramientoMasivo) => void;

  onValuesChange: (values: Partial<FormValuesVaramientoMasivo>) => void;
  isDisabled?: boolean;
}
