import { View, StyleSheet, Pressable } from "react-native";
import OrderCard from "./order-card";
import OrderCardDetails from "./order-card-details";
import { Switch, Text } from "@rneui/themed";
import { FontAwesome } from '@expo/vector-icons';

export default function OrderCardPreparing() {
    return (
        <OrderCard>
            <OrderCardDetails showTime/>
            <View style={[style.status, style.itemsBetween]}>
                <View style={style.status}>
                    <Switch 
                        value={true}
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