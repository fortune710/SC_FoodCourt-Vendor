import React from "react";
import { Stack } from "expo-router";

export const unstable_settings = {
    initialRouteName: 'login'
}


export default function RootLayout() {
    return (
        <Stack initialRouteName="login">
            <Stack.Screen name="menu"/>
            <Stack.Screen name="order"/>
            <Stack.Screen name="pickup"/>
            <Stack.Screen name="login"/>
            <Stack.Screen name="sign-up"/>
            <Stack.Screen name="home"/>
        </Stack>
    )
}