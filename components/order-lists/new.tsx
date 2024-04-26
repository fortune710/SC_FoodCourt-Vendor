import { ScrollView } from "react-native";
import OrderCardNew from "../orders/order-card-new";

export default function NewOrders() {
    return(
        <ScrollView>
            <OrderCardNew/>
            <OrderCardNew/>
            <OrderCardNew/>
            <OrderCardNew/>
            <OrderCardNew/>
            <OrderCardNew/>
        </ScrollView>
    )
}