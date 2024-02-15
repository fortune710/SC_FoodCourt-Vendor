import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface OrderCardProps {
    children: React.ReactNode,
    style?: StyleProp<ViewStyle>
}
export default function OrderCard({ children, style }: OrderCardProps) {
    return (
        <View style={[styles.container, style ?? {}]}>
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "stretch",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#7E7E7E",
        backgroundColor: "#FFF5F5",
        display: "flex",
        flexDirection: "column",
        padding: 10,
    },
    
})