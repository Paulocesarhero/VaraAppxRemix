import BottomMenu from "../../components/BottomMenu/BottomMenu";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecommendationsPageStyle } from "./RecommendationsPage.style";
import { View } from "react-native";
import React from "react";
import { Carousel } from "react-native-basic-carousel";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import { COLORS } from "../../Constants/Colors";

const RecommendationsPage: React.FC = () => {
  const items = [
    {
      id: 1,
      labelHeading: "Keep calm",
      labelDescription: "Don't Caos",
      imagePath: require("../../assets/generalTip1.imageset/generalTip1.png"),
    },
    {
      id: 2,
      labelHeading: "Avoid",
      labelDescription: "Work Alone",
      imagePath: require("../../assets/generalTip2.imageset/generalTip2.png"),
    },
    {
      id: 3,
      labelHeading: "Avoid into",
      labelDescription: "To water with animals",
      imagePath: require("../../assets/generalTip3.imageset/generalTip3.png"),
    },
    {
      id: 4,
      labelHeading: "Its wrong",
      labelDescription: "Pulling animal",
      imagePath: require("../../assets/generalTip4.imageset/generalTip4.png"),
    },
    {
      id: 5,
      labelHeading: "Keep free",
      labelDescription: "Obstructions animals orifice",
      imagePath: require("../../assets/generalTip5.imageset/generalTip5.png"),
    },
    {
      id: 6,
      labelHeading: "Forbidden",
      labelDescription: "supply medications",
      imagePath: require("../../assets/generalTip6.imageset/generalTip6.png"),
    },
  ];
  return (
    <SafeAreaView style={RecommendationsPageStyle.container}>
      <View style={RecommendationsPageStyle.containerBody}>
        <Carousel
          data={items}
          renderItem={({ item }) => (
            <CardCarousel
              imagePath={item.imagePath}
              labelDescription={item.labelDescription}
              labelHeading={item.labelHeading}
            />
          )}
          itemWidth={400}
          pagination={true}
          paginationPosition={"top"}
        />
      </View>
      <BottomMenu
        ViewStyleRecommendations={{ backgroundColor: COLORS.background }}
      />
    </SafeAreaView>
  );
};

export default RecommendationsPage;
