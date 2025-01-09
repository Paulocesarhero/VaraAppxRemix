import { Especie } from "../../services/Especie/GetEspecie";

interface EspecieSelectorProps {
  selectedEspecie: Especie | null;
  onSelectEspecie: (especie: Especie) => void;
}

export default EspecieSelectorProps;
