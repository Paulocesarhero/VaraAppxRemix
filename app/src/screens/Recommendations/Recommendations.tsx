import BottomMenu from "../../components/BottomMenu/BottomMenu";
import {SafeAreaView} from "react-native-safe-area-context";
import {RecommendationsStyle} from "./Recommendations.style";
import {View, Text} from "react-native";
import React from "react";
import { Carousel } from 'react-native-basic-carousel'


const Recommendations: React.FC = () => {
    const items = [
        { id: 1, text: 'Item 1' },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' },
    ];
    return (
        <SafeAreaView style={RecommendationsStyle.container}>
            <View style={RecommendationsStyle.containerBody}>
                <Carousel
                    data={items}
                    renderItem={({ item }) => (
                        <View style={RecommendationsStyle.item}>
                            <Text>{item.text}</Text>
                        </View>
                    )}
                    sliderWidth={300}
                    itemWidth={250}
                />

            </View>
            <BottomMenu/>
        </SafeAreaView>
    );
};


export default Recommendations;
