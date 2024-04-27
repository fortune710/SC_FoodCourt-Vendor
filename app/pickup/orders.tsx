import OrderCard from "../../components/orders/order-card";
import Page from "../../components/page";
import OrderCardDetails from "../../components/orders/order-card-details";
import { View } from "react-native";
import { Button } from "@rneui/themed";

export default function PickupOrders() {
    return (
        <Page>
            <OrderCard>
                <OrderCardDetails/>
                <View>
                    <Button>
                        Mark as Collected
                    </Button>
                </View>
            </OrderCard>
        </Page>
    )
}