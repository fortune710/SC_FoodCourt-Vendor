import { ScrollView ,StyleSheet} from "react-native";
import OrderCardPreparing from "../orders/order-card-preparing";
import {scale} from "react-native-size-matters"

export default function PreparingOrders(){
    return (
        <ScrollView contentContainerStyle = {styles.container}
        showsVerticalScrollIndicator={false}
        >
            <OrderCardPreparing/>
            <OrderCardPreparing/>
            <OrderCardPreparing/>
            <OrderCardPreparing/>
            <OrderCardPreparing/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        
        paddingBottom:scale(300)

    }

})