import { FormValuesFormatoIndividual } from "./FormValuesEspecimen";

export interface FormatoIndividualProps {
  initialValues: FormValuesFormatoIndividual;

  onValuesChange: (values: Partial<FormValuesFormatoIndividual>) => void;
  isDisabled?: boolean;
  /**
   * Función que se ejecuta al enviar los datos del formulario.
   *
   * @param {FormValuesFormatoIndividual} data - Datos del formulario de especimen.
   */
  onSubmitData: (data: FormValuesFormatoIndividual) => void;
  hasMorfometria: boolean;
}
