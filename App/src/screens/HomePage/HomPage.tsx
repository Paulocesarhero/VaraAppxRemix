import React from 'react';
import {View} from 'react-native';
import {HomePageStyle} from "./HomePage.style";
import {LinearGradient} from "expo-linear-gradient";
import {COLORS} from "../../Constants/Colors";
import {Image} from 'expo-image';
import LoginForm from "../../components/LoginForm/LoginForm";


const HomPage: React.FC = () => {
    return (
        <View style={HomePageStyle.container}>


            <LinearGradient
                colors={[COLORS.gradientStart, COLORS.gradientMiddle, COLORS.gradientEnd]}
                style={HomePageStyle.background}

            >
                <Image source={require('../../assets/logo.imageset/logo.png')} style={HomePageStyle.image}/>
                <LoginForm />


            </LinearGradient>
        </View>);
};


export default HomPage;
