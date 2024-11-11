import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import OrderCardCompleted from "./orders/order-card-completed";
import {scale} from "react-native-size-matters"
import { Text } from "~/components/ui/text";
import { Order } from "~/utils/types";

export default function CompletedOrders({ orders }: { orders: Order[] }) {

    return (
        <ScrollView 
            contentContainerStyle = {styles.container}
            showsVerticalScrollIndicator={false}
        >
            {
                orders?.length === 0 ? 
                <View className="py-16 px-4">
                   <Text>There are no completed orders at the moment.</Text> 
                </View>
                :
                orders?.map((order) => (
                    <OrderCardCompleted key={order.id} order={order} />
                ))
            }  
        </ScrollView>
    )


}
const styles = StyleSheet.create({
    container:{
        
        paddingBottom:scale(300)

    }

})