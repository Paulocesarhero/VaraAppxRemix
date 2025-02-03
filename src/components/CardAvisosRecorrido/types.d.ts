interface CardAvisosProps {
  urlImage: string | null;
  idAviso: number | string;
  isModificable?: boolean;
  fechasDeAvistamiento?: string | null;
  cantidadDeAnimales?: string | number | null;
  status?: string;
}
export default CardAvisosProps;
