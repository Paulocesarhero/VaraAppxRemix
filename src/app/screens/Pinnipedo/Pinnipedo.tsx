import React from "react";

import MorfometriaPinnipedo from "../../../forms/MorfometriaPinnipedo/MorfometriaPinnipedo";

const Pinnipedo: React.FC = () => {
  return (
    <MorfometriaPinnipedo onValuesChange={(values) => console.log(values)} />
  );
};
export default Pinnipedo;
