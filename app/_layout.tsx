import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { createTheme, ThemeProvider } from "@rneui/themed";
import { verticalScale } from "react-native-size-matters";

import { StatusBar } from "expo-status-bar";
import '../global.css'

import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { Theme } from "@react-navigation/native";
import { PortalHost } from '@rn-primitives/portal';
import { AppState } from "react-native";
import { supabase } from "~/utils/supabase";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { VendorViewProvider } from "~/providers/vendor-view";

const LIGHT_THEME: Theme = {
    dark: false,
    colors: NAV_THEME.light,
};
  const DARK_THEME: Theme = {
    dark: true,
    colors: NAV_THEME.dark,
};

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
        },
        Text: {
            style: {
                fontSize: 16
            }
        },
        ListItem: {
            containerStyle: {
                paddingHorizontal: 0
            }
        },
        Input: {
            labelStyle: {
                fontWeight: "400",
                color: "#000"
            },
            inputStyle: {
                paddingHorizontal: 8,
                fontSize: 16
            },
            placeholderTextColor: "#000",
            
            
        }
    }

})

SplashScreen.preventAutoHideAsync()

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
})

export default function RootLayout() {
    const [fontsLoaded, error] = useFonts({
        "Inter-Regular": require('../assets/fonts/Inter-Regular.ttf'),
        "Montserrat": require('../assets/fonts/Montserrat-Regular.ttf'),
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

const queryClient = new QueryClient();


function RootLayoutNav() {

    
    return (
        <VendorViewProvider>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <StatusBar 
                        backgroundColor="#fff" 
                        style="dark"
                    />
                    <Stack screenOptions={{ headerShown: false }}/>
                    <Toast position="top" />
                    <PortalHost/>
                </QueryClientProvider>
            </ThemeProvider>
        </VendorViewProvider>
    )
}

