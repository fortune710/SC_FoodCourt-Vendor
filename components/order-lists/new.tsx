import { ScrollView, StyleSheet, View } from "react-native";
import OrderCardNew from "../orders/order-card-new";
import {scale } from "react-native-size-matters"
import { Order } from "~/utils/types";
import { Text } from "../ui/text";

export default function NewOrders({ orders }: { orders: Order[] }) {
    return(
        <ScrollView 
            contentContainerStyle = {styles.container}
            showsVerticalScrollIndicator={false}
        >
            {
                orders?.length === 0 ? 
                <View className="py-16 px-4">
                   <Text>There are no new orders at the moment.</Text> 
                </View>
                :
                orders?.map((order: Order) => (
                    <OrderCardNew key={order?.id} order={order}/>
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