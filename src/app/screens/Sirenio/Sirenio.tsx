import React from "react";

import MorfometriaSirenio from "../../../forms/MorfometriaSirenio/MorfometriaSirenio";
import RegistroMorfometricoSirenio from "../../../forms/MorfometriaSirenio/RegistroMorfometricoSirenio";

const Sirenio: React.FC = () => {
  return (
    <MorfometriaSirenio onValuesChange={(values) => console.log(values)} />
  );
};
export default Sirenio;
