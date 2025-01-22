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
            <KeyboardAvoidingView behavior="position" style={{marginTop: 24}}>
                <View style={[globalStyles.flexItemsCenter, { width: "100%", justifyContent: "center", marginBottom: 40 }]}>
                    <Image
                        source={require('../assets/images/login-image.png')}
                        style={{ height: 233, width: 286 }}
                    />
                </View>

                <Text style={styles.loginText}>
                    Login
                </Text>

                <AuthForm type="login"/>
            </KeyboardAvoidingView>
        </Page>
    )
}

const styles = StyleSheet.create({
    loginText: {
        color: "#FF3551", 
        textAlign: "center", 
        fontSize: 30, 
        fontWeight: "700",
        marginBottom: 24
    }
})