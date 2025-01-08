interface CaracteristicasFisicasYAmbientalesProps {
  /**
   * Función que se ejecuta al enviar el formulario, recibiendo los valores del formulario como argumento.
   * @param data - Los datos del formulario enviados.
   */
  onSubmitData: (data: FormValuesCaracteristicasFisicasYAmbientales) => void;

  /**
   * Indica si el formulario está en estado de carga.
   */
  loading: boolean;

  /**
   * Función para actualizar el estado de carga del formulario.
   * @param loading - Un valor booleano que representa el nuevo estado de carga.
   */
  setLoading: (loading: boolean) => void;

  initalValues?: FormValuesCaracteristicasFisicasYAmbientales;
}

export default CaracteristicasFisicasYAmbientalesProps;
