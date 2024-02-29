import Page from "../components/page";
import { Text } from "@rneui/themed"; 
import { Image } from "expo-image";
import useThemeColor from "../hooks/useThemeColor";
import { StyleSheet, View } from "react-native";
import AuthForm from "../components/auth-form";
import Button from "../components/ui/button";
import { useRouter } from "expo-router";

export default function SignUpPage() {
    const primary = useThemeColor({}, "primary");
    const router = useRouter();
    

    return (
        <Page>
            <View style={{ display:'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Image
                    source={require("../assets/images/login-illustration.svg")}
                    style={{ height: 233, width: 286, }}
                />
            </View>

            <Text style={styles.loginText}>
                Sign Up
            </Text>

            <AuthForm type="sign-up"/>
            
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