interface FormValuesAccionesYresultados {
  Autoridades?: string;
  TelefonoAutoridades?: string;
  Morfometria: boolean;
  Necropsia: boolean;
  DisposicionDelCadaver?: number;
  DisposicionOtro?: string;
  PosibleCausaDelVaramiento?: string;
  PosibleCausaDeMuerte?: string;
  Participantes?: string;
  Observaciones?: string;
  TipoDeMuestras?: TipoMuestra[];
}
type TipoMuestra = {
  TipoMuestra: number;
};
export default FormValuesAccionesYresultados;
