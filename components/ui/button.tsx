import { Button as RNEButton, ButtonProps as RNEButtonProps } from "@rneui/themed";
import { StyleSheet } from "react-native";

interface ButtonProps extends RNEButtonProps {}

const Button: React.FC<ButtonProps> = ({ buttonStyle, titleStyle, ...restProps }) => {
    
    return (
        <RNEButton
            buttonStyle={[styles.defaultButtonStyles, buttonStyle]}
            titleStyle={[styles.defaultButtonTextStyle, titleStyle]}
            {...restProps}
        />
    )
};

const styles = StyleSheet.create({
    defaultButtonStyles: {
        borderRadius: 24,
        width: "70%",
    },
    defaultButtonTextStyle: {
        fontWeight: "500",
        fontSize: 20,
        fontFamily: "Inter"
    }
});

export default Button;