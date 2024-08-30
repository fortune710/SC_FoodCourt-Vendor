import { ScrollView, StyleSheet } from "react-native";
import OrderCardNew from "../orders/order-card-new";
import {scale } from "react-native-size-matters"

export default function NewOrders() {
    return(
        <ScrollView contentContainerStyle = {styles.container}
        showsVerticalScrollIndicator={false}
        >
            <OrderCardNew/>
            <OrderCardNew/>
            <OrderCardNew/>
            <OrderCardNew/>
            <OrderCardNew/>
            <OrderCardNew/>
            <OrderCardNew/>
            <OrderCardNew/>
            <OrderCardNew/>
            <OrderCardNew/>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        
        paddingBottom:scale(300)

    }

})