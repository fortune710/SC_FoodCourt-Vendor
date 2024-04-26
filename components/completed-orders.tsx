import React from "react";
import { ScrollView, View } from "react-native";
import OrderCardCompleted from "./orders/order-card-completed";

export default function CompletedOrders() {
    return (
        <ScrollView>
            <OrderCardCompleted/>
            <OrderCardCompleted/>
            <OrderCardCompleted/>
            <OrderCardCompleted/>
            <OrderCardCompleted/>
        </ScrollView>
    )
}