import { View, StyleSheet, Pressable } from "react-native";
import OrderCard from "./order-card";
import OrderCardDetails from "./order-card-details";
import { Switch, Text } from "@rneui/themed";
import { FontAwesome } from '@expo/vector-icons';
import useThemeColor from "~/hooks/useThemeColor";

export default function OrderCardPreparing() {
    const primary = useThemeColor({}, "primary");
    return (
        <OrderCard>
            <OrderCardDetails showTime/>
            <View style={{ borderTopWidth: 1 }} className="flex flex-row w-full items-center justify-between py-3 px-3">
                <View style={style.status}>
                    <Switch 
                        value={true}
                        style={{ marginRight: 7 }}
                    />
                    <Text>Preparing</Text>
                </View>

                <Pressable>
                    <FontAwesome name="phone" size={24} color={primary} />
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