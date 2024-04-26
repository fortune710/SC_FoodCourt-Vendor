import React from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PageProps {
    children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
    return (
        <SafeAreaView>
            <ScrollView style={styles.pageStyle}>
                { children }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pageStyle: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        position: 'relative'
    }
})