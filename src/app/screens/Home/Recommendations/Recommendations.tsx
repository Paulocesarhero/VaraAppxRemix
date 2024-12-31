import React from "react";
import { View } from "react-native";
import RecommendationsPage from "varaapplib/components/Recommendations/RecommendationsPage";

import { ColorsPalete } from "../../../../constants/COLORS";

const Recommendations: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: ColorsPalete.light }}>
      <RecommendationsPage />
    </View>
  );
};
export default Recommendations;
