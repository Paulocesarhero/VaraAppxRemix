import { FormValuesCaracteristicasFisicasYAmbientales } from "./FormValuesCaracteristicasFisicasYAmbientales";

interface CaracteristicasFisicasYAmbientalesProps {
  /**
   * Función que se ejecuta al enviar el formulario, recibiendo los valores del formulario como argumento.
   * @param data - Los datos del formulario enviados.
   */
  onSubmitData: (data: FormValuesCaracteristicasFisicasYAmbientales) => void;

  initalValues?: FormValuesCaracteristicasFisicasYAmbientales;
}

export default CaracteristicasFisicasYAmbientalesProps;
