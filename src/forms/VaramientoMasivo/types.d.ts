import { FormValuesVaramientoMasivo } from "./FormValuesVaramientoMasivo";

export interface VaramientoMasivoProps {
  initialValues: FormValuesVaramientoMasivo;

  onValuesChange: (values: Partial<FormValuesVaramientoMasivo>) => void;
  isDisabled?: boolean;
}
