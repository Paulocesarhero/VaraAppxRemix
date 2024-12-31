import FormValuesAccionesYresultados from "./FormValuesAccionesYresultados";

interface AccionesYResultadosFormProps {
  /**
   * Función que se ejecuta al enviar el formulario, recibiendo los valores del formulario como argumento.
   * @param data - Los datos del formulario enviados.
   */
  onSubmitData: (data: FormValuesAccionesYresultados) => void;

  /**
   * Indica si el formulario está en estado de carga.
   */
  loading: boolean;

  /**
   * Función para actualizar el estado de carga del formulario.
   * @param loading - Un valor booleano que representa el nuevo estado de carga.
   */
  setLoading: (loading: boolean) => void;

  initialValues: FormValuesAccionesYresultados;

  onValuesChange: (values: Partial<FormValuesAccionesYresultados>) => void;
}

export default AccionesYResultadosFormProps;
