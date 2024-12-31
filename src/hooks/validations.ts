const handleNumericInput = (key: string, value: string, setValue: any) => {
  const filteredValue = value.replace(/[^0-9]/g, "");
  setValue(key, filteredValue, {
    shouldValidate: true,
    shouldDirty: true,
  });
};

const handleNumericInputWithOnepoint = (
  key: string,
  value: string,
  setValue: any
) => {
  // Permitir solo números y un punto decimal
  const filteredValue = value.replace(/[^0-9.]/g, ""); // Filtrar caracteres no numéricos o punto
  const pointCount = filteredValue.split(".").length - 1; // Contar los puntos en el string

  // Si hay más de un punto, eliminar el último
  if (pointCount > 1) {
    // Eliminar all después del primer punto
    const [integerPart, decimalPart] = filteredValue.split(".");
    setValue(key, `${integerPart}.${decimalPart.slice(0, 1)}`, {
      shouldValidate: true,
      shouldDirty: true,
    });
  } else {
    setValue(key, filteredValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }
};

export { handleNumericInput, handleNumericInputWithOnepoint };
