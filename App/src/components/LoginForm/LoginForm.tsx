import {View, TextInput, TouchableOpacity, Text} from "react-native";
import React, {useState} from "react";
import {LoginFormStyle} from "./LoginForm.style";
import RoundedButton from "../RoundedButton/RoundedButton";
import {COLORS} from "../../Constants/Colors";
import {LoginFormTypes} from "./LoginFormProps";
import PasswordInput from "../PasswordInput/PasswordInput";


const LoginForm: React.FC<LoginFormTypes> = ({...restButton}) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const handlePasswordChange = (newPassword: string) => {
        setPassword(newPassword);
    };

    return (
        <View style={LoginFormStyle.container}>
            <TextInput
                onChangeText={setEmail}
                style={LoginFormStyle.input}
                placeholder={('email')}
                autoComplete={"email"}
            ></TextInput>

            <PasswordInput onChangeText={setPassword}/>

        </View>
    );
};


export default LoginForm;

