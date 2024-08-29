import React from "react";
import { Dimensions, ScrollView, StyleProp, StyleSheet, ViewStyle,View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Interface for PageProps
 * @interface
 * @property {React.ReactNode} children - The children nodes of the Page component.
 * @property {string} safeAreaBgColor - The background color for the safe area. This is only neccesary on iOS.
 */
interface PageProps {
    children: React.ReactNode;
    safeAreaBgColor?: string;
    style?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
}

export default function Page({ children, style, safeAreaBgColor }: PageProps) {
    const safeArea = {
        backgroundColor: safeAreaBgColor || "#fff"
    }
    
    return (
        <SafeAreaView style={safeArea}>
            <View style={[styles.pageStyle, style ?? {}]}>
                { children }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pageStyle: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        position: 'relative',
        backgroundColor: "white"
    },
})