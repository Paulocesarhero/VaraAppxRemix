import { FormValuesSoloOrganismosVivos } from "./FormValuesSoloOrganismosVivos";

export interface SoloOrganismosVivosProps {
  isDisabled: boolean;

  initialValues: FormValuesSoloOrganismosVivos;

  onValuesChange: (values: Partial<FormValuesSoloOrganismosVivos>) => void;

  onSubmitData: (values: FormValuesSoloOrganismosVivos) => void;
}
