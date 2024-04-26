import { ScrollView } from "react-native";
import OrderCardPreparing from "../orders/order-card-preparing";

export default function PreparingOrders(){
    return (
        <ScrollView>
            <OrderCardPreparing/>
            <OrderCardPreparing/>
            <OrderCardPreparing/>
            <OrderCardPreparing/>
            <OrderCardPreparing/>
        </ScrollView>
    )
}