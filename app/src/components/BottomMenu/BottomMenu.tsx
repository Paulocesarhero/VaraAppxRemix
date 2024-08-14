import {View, Text} from "react-native";
import {BottomMenuStyle} from "./BottomMenu.style";
import {Image} from "expo-image";
import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';

const BottomMenu: React.FC = () => {
    return (
            <View style={BottomMenuStyle.container}>
                <View style={BottomMenuStyle.containerImage}>
                    <Image  source={require('../../assets/format.imageset/format.png')} style={BottomMenuStyle.image}/>
                    <Text>Strandings</Text>
                </View>
                <View style={BottomMenuStyle.containerImage}>
                    <Image  source={require('../../assets/recommendation.imageset/recommendation.png')} style={BottomMenuStyle.image}/>
                    <Text>Recomendations</Text>
                </View>
                <View style={BottomMenuStyle.containerImage}>
                    <Image  source={require('../../assets/settings.imageset/settings.png')} style={BottomMenuStyle.image}/>
                    <Text>Settings</Text>
                </View>
            </View>

    );
};


export default BottomMenu;
