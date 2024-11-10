import { ScrollView ,StyleSheet, View} from "react-native";
import OrderCardPreparing from "../orders/order-card-preparing";
import {scale} from "react-native-size-matters"
import { Order } from "~/utils/types";
import { Text } from "../ui/text";

export default function PreparingOrders({ orders }: { orders: Order[] }) {
    return (
        <ScrollView 
            contentContainerStyle = {styles.container}
            showsVerticalScrollIndicator={false}
        >
            {
                orders?.length === 0 ? 
                <View className="py-16 px-4">
                   <Text>There are no orders being prepared for you to look at.</Text> 
                </View>
                :
                orders?.map((order) => (
                    <OrderCardPreparing key={order.id} order={order}/>
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