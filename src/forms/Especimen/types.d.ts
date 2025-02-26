import { FormValuesEspecimen } from "./FormValuesEspecimen";

export interface FormatoIndividualProps {
  initialValues: FormValuesEspecimen;

  onValuesChange: (values: Partial<FormValuesEspecimen>) => void;
  isDisabled?: boolean;
  /**
   * Función que se ejecuta al enviar los datos del formulario.
   *
   * @param {FormValuesFormatoIndividual} data - Datos del formulario de especimen.
   */
  onSubmitData: (data: FormValuesEspecimen) => void;
  hasMorfometria: boolean;
}
