import { Text } from "@rneui/themed"; 
import { Image } from "expo-image";
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import AuthForm from "../components/auth-form";
import { globalStyles } from "../constants/Styles";

export default function LoginPage() {

    
    return (
        // <Page>
        <ScrollView style={{flex: 1}}>
            <KeyboardAvoidingView behavior="position" style={{marginTop: 50}}>
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
            </KeyboardAvoidingView>
        </ScrollView>
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