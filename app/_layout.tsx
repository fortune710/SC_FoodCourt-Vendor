import React, { useEffect, useRef, useState } from "react";
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
import { AppState, Platform } from "react-native";
import { supabase } from "~/utils/supabase";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { VendorViewProvider } from "~/providers/vendor-view";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
// import { registerServiceWorker } from '~/utils/registerServiceWorker'
import { getWebToken } from '~/utils/firebase'

const LIGHT_THEME: any = {
    dark: false,
    colors: NAV_THEME.light,
};
  const DARK_THEME: any = {
    dark: true,
    colors: NAV_THEME.dark,
};

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
});

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

AppState?.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
})

const queryClient = new QueryClient();

export default function RootLayout() {
    const [expoPushToken, setExpoPushToken] = useState<any>('');
    const [notification, setNotification] = useState<any>(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        // Request permissions
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // Listener for received notifications
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // Listener for notification taps
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        });

        // Cleanup listeners
        return () => {
            if (Platform.OS !== 'web') {
                Notifications.removeNotificationSubscription(notificationListener.current);
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        };
    }, []);
  
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

    

    return (
        <QueryClientProvider client={queryClient}>
            <RootLayoutNav/>
        </QueryClientProvider>
    )

}



function RootLayoutNav() {

    
    return (
        <VendorViewProvider>
            <ThemeProvider theme={theme}>
                <StatusBar 
                    backgroundColor="#fff" 
                    style="dark"
                />
                <Stack screenOptions={{ headerShown: false }}/>
                <Toast position="top" />
                <PortalHost/>
            </ThemeProvider>
        </VendorViewProvider>
    )
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'web') {
        getWebToken();
        return
    }
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log(finalStatus);
        alert('Failed to get push token for push notification!');
        return;
      }
      
      // Get the token that uniquely identifies this device
      token = await Notifications.getExpoPushTokenAsync({
        projectId: 'df672553-fdea-479a-bd5f-7826fd8c1a9e' // Replace with your Expo project ID
      });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }