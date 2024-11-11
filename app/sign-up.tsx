import Page from "../components/page";
import { Text } from "@rneui/themed"; 
import { Image } from "expo-image";
import useThemeColor from "../hooks/useThemeColor";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import AuthForm from "../components/auth-form";
import { useRouter } from "expo-router";
import { globalStyles } from "../constants/Styles";
import { scale, verticalScale } from "react-native-size-matters";

export default function SignUpPage() {
    

    return (
            <KeyboardAvoidingView behavior="position" style={{marginTop: 50}}>
                <View style={[globalStyles.flexItemsCenter, { width: "100%", marginVertical: 20, justifyContent: "center" }]}>
                    <Image
                        source={require('../assets/images/login-image.png')}
                        style={{ height: scale(200), width: verticalScale(210) }}
                    />
                </View>

                <Text style={styles.loginText}>
                    Sign Up
                </Text>

                <AuthForm type="sign-up"/>
            </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    loginText: {
        color: "#FF3551", 
        textAlign: "center", 
        fontSize: 30, 
        fontWeight: "700" 
    }
})