import Page from "../components/page";
import { Text } from "@rneui/themed"; 
import { Image } from "expo-image";
import useThemeColor from "../hooks/useThemeColor";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import AuthForm from "../components/auth-form";
import Button from "../components/custom/button";
import { useRouter } from "expo-router";
import { globalStyles } from "../constants/Styles";
import useAuth from "~/hooks/useAuth";

export default function LoginPage() {
    const primary = useThemeColor({}, "primary");
    const router = useRouter();
    

    return (
        <Page>
            <KeyboardAvoidingView behavior="position">
                <View style={[globalStyles.flexItemsCenter, { width: "100%", marginVertical: 20, justifyContent: "center" }]}>
                    <Image
                        source={{ uri: require('../assets/images/forgot-password.png') }}
                        style={{ height: 220, width: 250 }}
                    />
                </View>


                <AuthForm type="forgot-password"/>
            </KeyboardAvoidingView>
        </Page>
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