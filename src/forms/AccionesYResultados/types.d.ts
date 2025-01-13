import FormValuesAccionesYresultados from "./FormValuesAccionesYresultados";

interface AccionesYResultadosFormProps {
  /**
   * Función que se ejecuta al enviar el formulario, recibiendo los valores del formulario como argumento.
   * @param data - Los datos del formulario enviados.
   */
  onSubmitData: (data: FormValuesAccionesYresultados) => void;

  initialValues?: FormValuesAccionesYresultados;

  onValuesChange: (values: Partial<FormValuesAccionesYresultados>) => void;
}

export default AccionesYResultadosFormProps;
