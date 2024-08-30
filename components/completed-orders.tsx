import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import OrderCardCompleted from "./orders/order-card-completed";
import {scale} from "react-native-size-matters"

export default function CompletedOrders() {
    return (
        <ScrollView contentContainerStyle = {styles.container}
        showsVerticalScrollIndicator={false}>
            <OrderCardCompleted/>
            <OrderCardCompleted/>
            <OrderCardCompleted/>
            <OrderCardCompleted/>
            <OrderCardCompleted/>
        </ScrollView>
    )


}
const styles = StyleSheet.create({
    container:{
        
        paddingBottom:scale(300)

    }

})