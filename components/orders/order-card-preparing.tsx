import { View, StyleSheet, Pressable } from "react-native";
import OrderCard from "./order-card";
import OrderCardDetails from "./order-card-details";
import { Switch, Text } from "@rneui/themed";
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import useOrders from "~/hooks/useOrders";
import useThemeColor from "~/hooks/useThemeColor";
import { Order, OrderStatus } from "~/utils/types";
import { cn } from "~/lib/utils";


export default function OrderCardPreparing({ order }: { order: Order }) {
    const [isPreparing, setIsPreparing] = useState(order?.status === OrderStatus.Completed);
    const { updateOrder } = useOrders();
    const primary = useThemeColor({}, "primary");

    const [timeout, setNodeTimeout] = useState<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        if (!order) return;

        if (!order.start_time) updateOrder({ id: order.id, start_time: Date.now() });
    }, [])
    

    const togglePreparing = async (checked: boolean) => {
        const startTime = Date.now();
        const ONE_MINUTE = 60 * 1000;

        try {
            if (checked) {
                setIsPreparing(true);

                const timeout = setTimeout(async () => {
                    await updateOrder({ id: order?.id!, status: OrderStatus.Completed }) 
                }, ONE_MINUTE)
                setNodeTimeout(timeout);
                // in minutes
              
            } else {
                setIsPreparing(false);
                clearTimeout(timeout);
                //await updateOrder({ id: order?.id!, start_time: startTime, status: OrderStatus.Preparing }) 
            }
        } catch {
            if (!checked) {
                setIsPreparing(false);
            } else {
                setIsPreparing(true);
            }
        }
        
    };

    return (
        <OrderCard>
            <OrderCardDetails 
                order={order} 
                showTime={true} 
                isPreparing={isPreparing} 
            />
            <View style={[style.status, style.itemsBetween]} className= 'pt-2 border-t'>
                <View style={style.status} >
                    <Switch 
                        value={isPreparing}
                        onValueChange={togglePreparing}
                        style={{ marginRight: 7 }}
                        //onValueChange={(value) => updateStatus({ id: order?.id, status: value ? OrderStatus.Preparing : OrderStatus.Accepted })}
                    />
                    <Text>{isPreparing ? "Completed" : "Preparing"}</Text>
                </View>

                {
                    !isPreparing ?
                    <Pressable>
                        <FontAwesome name="phone" size={24} color={primary} />
                    </Pressable>
                    :
                    <Countdown/>
                }
            </View>
        </OrderCard>
    )
}

function Countdown() {
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);  // Use functional update to get latest state
        }, 1000);

        return () => clearInterval(interval);  // Cleanup interval on unmount
    }, []);  

    return (
        <Text className={cn("text-lg font-medium", timeLeft <= 10 && "text-red-500")}>{timeLeft}</Text>
    )
}

const style = StyleSheet.create({
    status: {
        display: 'flex',
        alignItems: "center",
        flexDirection: "row",
    },
    itemsBetween: {
        justifyContent: "space-between"
    }
})