import { View, StyleSheet, Pressable } from "react-native";
import OrderCard from "./order-card";
import OrderCardDetails from "./order-card-details";
import { Switch, Text } from "@rneui/themed";
import { FontAwesome } from '@expo/vector-icons';
import { useState } from "react";
import useOrders from "~/hooks/useOrders";
import { NfcIcon } from "lucide-react-native";


export default function OrderCardPreparing() {
    const [isPreparing, setIsPreparing] = useState(false);
    const {updateOrder} = useOrders()
    

    const togglePreparing = async () => {
        if (!isPreparing) {
          const startTime = Date.now();
          await updateOrder({ id: orderId, start_time: startTime,}) 
            // in minutes
          
        }
        
        setIsPreparing(!isPreparing);
      };

    return (
        <OrderCard>
            <OrderCardDetails showTime = {true} isPreparing = {isPreparing} />
            <View style={[style.status, style.itemsBetween]}>
                <View style={style.status}>
                    <Switch 
                        value={isPreparing}
                        onValueChange={togglePreparing}
                        style={{ marginRight: 7 }}
                    />
                    <Text>Preparing</Text>
                </View>

                <Pressable>
                    <FontAwesome name="phone" size={24} color="black" />
                </Pressable>
            </View>
        </OrderCard>
    )
}

const style = StyleSheet.create({
    status: {
        display: 'flex',
        alignItems: "center",
        flexDirection: "row"
    },
    itemsBetween: {
        justifyContent: "space-between"
    }
})