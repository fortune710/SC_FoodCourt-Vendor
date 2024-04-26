import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts, loadAsync } from "expo-font";
import { createTheme, ThemeProvider } from "@rneui/themed";
import { verticalScale } from "react-native-size-matters";


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

export default function RootLayout() {

    const [fontsLoaded] = useFonts({
        "Inter": require('../assets/fonts/Inter-Regular.ttf'),
        "Montserrat": require('../assets/fonts/Montserrat-Regular.ttf')
    })

    return (
        <ThemeProvider theme={theme}>
            <Stack>
                <Stack.Screen name="menu"/>
                <Stack.Screen name="login"/>
                <Stack.Screen name="pickup"/>
                <Stack.Screen name="index"/>
                <Stack.Screen name="sign-up"/>
                <Stack.Screen name="home"/>
            </Stack>
        </ThemeProvider>
    )
}