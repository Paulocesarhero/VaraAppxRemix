import { TextInput, View } from "react-native";
import React from "react";
import { emailInputStyle } from "./EmailInput.style";
import { EmailInputProps } from "./EmailInputProps";

const EmailInput: React.FC<EmailInputProps> = ({
  onEmailTextChange,
  emailCustomStyle,
}) => {
  return (
    <View>
      <TextInput
        onChangeText={onEmailTextChange}
        style={[emailInputStyle.input, emailCustomStyle]}
        placeholder={"correo electrónico"}
        autoComplete={"email"}
        keyboardType={"email-address"}
        textContentType={"emailAddress"}
      ></TextInput>
    </View>
  );
};

export default EmailInput;
