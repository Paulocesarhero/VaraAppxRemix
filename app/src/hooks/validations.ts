const handleNumericInput = (key: string, value: string, setValue: any) => {
  const filteredValue = value.replace(/[^0-9]/g, "");
  setValue(key, filteredValue, {
    shouldValidate: true,
    shouldDirty: true,
  });
};

export default handleNumericInput;
