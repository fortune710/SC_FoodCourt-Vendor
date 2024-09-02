import OrderCard from "../../components/orders/order-card";
import Page from "../../components/page";
import OrderCardDetails from "../../components/orders/order-card-details";
import { ActivityIndicator, View } from "react-native";
import { Button } from "@rneui/themed";
import Header from "../../components/page-header";
import { useLocalSearchParams } from "expo-router";
import useOrderPickup from "~/hooks/useOrderPickup";

export default function PickupOrders() {
    const { order_nums } = useLocalSearchParams();
    const orderIds = (order_nums as string[]).map((order_num) => parseInt(order_num));

    const { orders, isLoading, markOrderAsCollected } = useOrderPickup(orderIds)

    return (
        <Page>
            <Header headerTitle="Pickup" /> 
            {
                isLoading ? <ActivityIndicator/> :
                orders?.map((order) => {
                    return (
                        <OrderCard>
                            <OrderCardDetails/>
                            <View>
                                <Button onPress={() => markOrderAsCollected(order?.id)}>
                                    Mark as Collected
                                </Button>
                            </View>
                        </OrderCard>
                    )
                })
            }
        </Page>
    )
}