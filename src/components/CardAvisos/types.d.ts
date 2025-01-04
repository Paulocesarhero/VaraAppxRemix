interface CardAvisosProps {
  urlImage: string | null;
  id: number | string;
  isModificable?: boolean;
  fechasDeAvistamiento?: Date | null;
  cantidadDeAnimales?: string;
  onDelete?: (idAviso: number | string) => void;
}
export default CardAvisosProps;
