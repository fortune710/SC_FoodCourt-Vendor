import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { createTheme, ThemeProvider } from "@rneui/themed";
import { verticalScale } from "react-native-size-matters";

import FontAwesome from "@expo/vector-icons/FontAwesome"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { Ionicons, Octicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";


const theme = createTheme({
    lightColors: {
        primary: '#F72F2F'
    },
    darkColors: {
        primary: '#F72F2F'
    },
    components: {
        Button: {
            buttonStyle: {
                borderRadius: 16,
                height: verticalScale(43)
            }
        }
    }

})

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    

    const [fontsLoaded, error] = useFonts({
        "Inter-Regular": require('../assets/fonts/Inter-Regular.ttf'),
        "Montserrat": require('../assets/fonts/Montserrat-Regular.ttf'),
        ...MaterialIcons.font,
        ...FontAwesome.font,
        ...Ionicons.font,
        ...Octicons.font
    });

    
    useEffect(() => {
        if (error) throw error;
    }, [error]);
    
    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    
    

    if (!fontsLoaded) {
        return null;
    }

    return <RootLayoutNav/>

}


function RootLayoutNav() {

    
    return (
        <ThemeProvider theme={theme}>
            <StatusBar 
                backgroundColor="#fff" 
                style="dark"
            />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="menu"/>
                <Stack.Screen name="login"/>
                <Stack.Screen name="pickup"/>
                <Stack.Screen name="index"/>
                <Stack.Screen name="sign-up"/>
                <Stack.Screen name="home"/>
                <Stack.Screen name="settings"/>
            </Stack>
        </ThemeProvider>
    )
}

