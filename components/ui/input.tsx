import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface InputProps extends React.ComponentProps<typeof TextInput> {}

export default function Input(props: InputProps) {
    const { style, ...rest } = props;

    return (
        <TextInput
            {...rest}
            style={[styles.textInput, style ?? {}]}
        />    
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: '#5C5C5C',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8
    }
})