import { RegistroMorfometricoPinnipedo } from "./RegistroMorfometricoPinnipedo";

interface MorfometriaPinnipedoProps {
  onSubmitData: (data: RegistroMorfometricoPinnipedo) => void;
  data?: RegistroMorfometricoPinnipedo;
  isDisabled?: boolean;
  onValuesChange: (values: Partial<RegistroMorfometricoPinnipedo>) => void;
}

export default MorfometriaPinnipedoProps;
