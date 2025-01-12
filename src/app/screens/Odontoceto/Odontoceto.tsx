import MorfometriaOdontoceto from "../../../forms/MorformetriaOdontoceto/MorfometriaOdontoceto";

const Odontoceto: React.FC = () => {
  return (
    <MorfometriaOdontoceto onValuesChange={(values) => console.log(values)} />
  );
};
export default Odontoceto;
