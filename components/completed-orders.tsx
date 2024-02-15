import React from "react";
import { View } from "react-native";
import OrderCardCompleted from "./orders/order-card-completed";

export default function CompletedOrders() {
    return (
        <View>
            <OrderCardCompleted/>
            <OrderCardCompleted/>
            <OrderCardCompleted/>
            <OrderCardCompleted/>
            <OrderCardCompleted/>
        </View>
    )
}