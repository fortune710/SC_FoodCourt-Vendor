import Page from "../components/page";
import { Text } from "@rneui/themed"; 
import { Image } from "expo-image";
import useThemeColor from "../hooks/useThemeColor";
import { StyleSheet, View } from "react-native";
import AuthForm from "../components/auth-form";
import Button from "../components/ui/button";
import { useRouter } from "expo-router";
import { globalStyles } from "../constants/Styles";

export default function LoginPage() {
    const primary = useThemeColor({}, "primary");
    const router = useRouter();

    const moveToCreateAccount = () => {
        return router.push("/create-account")
    }
    

    return (
        <Page>
            <View style={[globalStyles.flexItemsCenter, { width: "100%", marginVertical: 20, justifyContent: "center" }]}>
                <Image
                    source={require('../assets/images/login-image.png')}
                    style={{ height: 233, width: 286 }}
                />
            </View>

            <Text style={styles.loginText}>
                Login
            </Text>

            <AuthForm type="login"/>
            
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