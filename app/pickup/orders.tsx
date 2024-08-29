import OrderCard from "../../components/orders/order-card";
import Page from "../../components/page";
import OrderCardDetails from "../../components/orders/order-card-details";
import { View } from "react-native";
import { Button } from "@rneui/themed";
import Header from "../../components/page-header";

export default function PickupOrders() {
    return (
        <Page>
            <Header headerTitle="Pickup" /> 
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