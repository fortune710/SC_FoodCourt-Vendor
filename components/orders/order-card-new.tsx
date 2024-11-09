import * as React from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import OrderCardDetails from "./order-card-details";
import { Button } from "@rneui/themed";
import OrderCard from "./order-card";
import { Order, OrderStatus } from "~/utils/types";
import useOrderStatus from "~/hooks/useOrderStatus";
import useOrders from "~/hooks/useOrders";

export default function OrderCardNew({ order }: { order: Order }) {
  const { updateStatus } = useOrderStatus(order.status);
  const { updateOrder } = useOrders();

  return (
    <OrderCard>
      <OrderCardDetails order={order}/>
      <View className="w-full flex flex-col gap-3 py-2 mt-2">
        <Button 
          onPress={() => updateOrder({ id: order.id, status: OrderStatus.Preparing })}
        >
          Accept
        </Button>
        <Button 
          type="outline"
          onPress={() => updateOrder({ id: order.id, status: OrderStatus.Cancelled })}
        >
          Decline
        </Button>
      </View>
    </OrderCard>
  );
}

const styles = StyleSheet.create({
  view21: {
    alignItems: "stretch",
    display: "flex",
    marginTop: 8,
    flexDirection: "column",
    width: '100%'
  },
});


