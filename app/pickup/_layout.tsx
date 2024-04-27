import { Stack } from "expo-router";

export default function PickupLayout() {
    return(
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="orders"/>
        </Stack>
    )
}