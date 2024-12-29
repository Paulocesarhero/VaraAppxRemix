import { Especie } from "../../services/Especie/GetEspecie";

interface EspecieSelectorProps {
  selectedEspecie: Especie | null; // Recibimos selectedEspecie como prop
  onSelectEspecie: (especie: Especie) => void; // Para actualizar la especie seleccionada
}

export default EspecieSelectorProps;
