interface CardAvisosProps {
  urlImage: string | null;
  id: number | string;
  isModificable?: boolean;
  fechasDeAvistamiento?: string;
  cantidadDeAnimales?: string;
  onDelete?: (idAviso: number | string) => void;
}
export default CardAvisosProps;
