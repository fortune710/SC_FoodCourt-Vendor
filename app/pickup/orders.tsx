import OrderCard from "../../components/orders/order-card";
import Page from "../../components/page";
import OrderCardDetails from "../../components/orders/order-card-details";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { Button } from "@rneui/themed";
import Header from "../../components/page-header";
import { useLocalSearchParams } from "expo-router";
import useOrderPickup from "~/hooks/useOrderPickup";
import { Order, OrderStatus } from "~/utils/types";

export default function PickupOrders() {
    const params = useLocalSearchParams();
    const orderIds = String(params.order_nums).split(",").map((id) => Number(id));
    const { orders, isLoading, markOrderAsCollected } = useOrderPickup(orderIds)

    return (
        <Page>
            <Header headerTitle="Pickup" /> 
            {
                isLoading ? <ActivityIndicator/> :
                <ScrollView contentContainerClassName="px-6">
                    {
                        orders?.map((order: any) => {
                            return (
                                <OrderCard key={order.id}>
                                    <OrderCardDetails order={order}/>
                                    <View className="pt-3">
                                        <Button disabled={order.status === OrderStatus.Collected} onPress={() => {
                                            markOrderAsCollected(order?.id)
                                            // Usiere- check out
                                            // router.back()
                                        }}>
                                            {order.status === OrderStatus.Collected ? "Collected" : "Mark as Collected"}
                                        </Button>
                                    </View>
                                </OrderCard>
                            )
                        })
                    }
                </ScrollView>
            }
        </Page>
    )
}