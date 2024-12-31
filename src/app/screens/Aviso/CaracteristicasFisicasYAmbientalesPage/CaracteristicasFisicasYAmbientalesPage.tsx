import { View } from "react-native";

import CaracteristicasFisicasYAmbientales from "../../../../forms/CaracteristicasFisicasYAmbientales/CaracteristicasFisicasYAmbientales";
import { FormValuesCaracteristicasFisicasYAmbientales } from "../../../../forms/CaracteristicasFisicasYAmbientales/FormValuesCaracteristicasFisicasYAmbientales";

const CaracteristicasFisicasYAmbientalesPage: React.FC = () => {
  return (
    <View>
      <CaracteristicasFisicasYAmbientales
        onSubmitData={function (
          data: FormValuesCaracteristicasFisicasYAmbientales
        ): void {
          throw new Error("Function not implemented.");
        }}
        loading={false}
        setLoading={function (loading: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />
    </View>
  );
};
export default CaracteristicasFisicasYAmbientalesPage;
