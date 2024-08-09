import React from "react";
import {Pressable, Text} from "react-native";
import {RoundedButtonProps} from "./types";
import {RoundedButtonStyle} from "./RoundedButton.style";


const RoundedButton: React.FC<RoundedButtonProps> = ({color, text, ...rest}) => {
    return (
        <Pressable
            style={[RoundedButtonStyle.container, { backgroundColor: color }]}
            {...rest}
        >
            <Text style={RoundedButtonStyle.text}>{text}</Text>
        </Pressable>
    );
};

export default RoundedButton;