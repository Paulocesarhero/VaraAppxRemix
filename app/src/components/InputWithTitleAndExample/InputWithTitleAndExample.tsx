import React from "react";
import { Text, TextInput, View } from "react-native";
import { InputWithTitleAndExampleProps } from "./InputWithTitleAndExampleProps";
import { inputWithtitleAndExampleStyle } from "./InputWithtitleAndExample.style";

const InputWithTitleAndExample: React.FC<InputWithTitleAndExampleProps> = ({
  title,
  example,
  textInputProps,
  containerStyle,
}) => {
  return (
    <View style={[inputWithtitleAndExampleStyle.container, containerStyle]}>
      <Text style={inputWithtitleAndExampleStyle.title}> {title}</Text>
      <TextInput
        {...textInputProps}
        style={inputWithtitleAndExampleStyle.example}
        placeholder={example}
      ></TextInput>
    </View>
  );
};

export default InputWithTitleAndExample;
