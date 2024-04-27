import React, { useEffect, useRef } from "react";
import { Link, SplashScreen, Stack, useRootNavigation } from "expo-router";
import { useFonts, loadAsync } from "expo-font";
import { createTheme, Text, ThemeProvider } from "@rneui/themed";
import { verticalScale } from "react-native-size-matters";
import { Pressable } from "react-native";

import { FontAwesome, MaterialIcons } from "@expo/vector-icons"


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

    const route = useRootNavigation();
    

    const [fontsLoaded, error] = useFonts({
        "Inter": require('../assets/fonts/Inter-Regular.ttf'),
        "Montserrat": require('../assets/fonts/Montserrat-Regular.ttf'),
        ...MaterialIcons.font,
        ...FontAwesome.font
    });

    
    useEffect(() => {
        if (error) throw error;
    }, [error]);
    
    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
        loadAsync({
            ...MaterialIcons.font
        })
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ThemeProvider theme={theme}>
            <Stack screenOptions={{
                headerTitleAlign: 'left',
                headerLeft: () => (
                    <Pressable onPress={() => console.log(route?.getCurrentRoute())}>
                        <MaterialIcons name="menu" size={24} color="black" />
                    </Pressable>
                ),
                headerRight: () => (
                    <Link href="/pickup">
                        <MaterialIcons name="shopping-bag" size={24} color="black" />
                    </Link>
                )
            }}>
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