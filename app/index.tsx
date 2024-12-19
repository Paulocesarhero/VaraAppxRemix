import MorfometriaMisticeto from "./src/forms/MorfometriaMisticeto/MorfometriaMisticeto";
import React from "react";
import LabelAndImage from "./src/components/InputAndImage/LabelAndImage";
import FormValuesMorfometriaMisticeto from "./src/forms/MorfometriaMisticeto/FormValuesMorfometriaMisticeto";

export default function App() {
  return (
    <MorfometriaMisticeto
      onValuesChange={(data) => console.log(data)}
    ></MorfometriaMisticeto>
  );
}
