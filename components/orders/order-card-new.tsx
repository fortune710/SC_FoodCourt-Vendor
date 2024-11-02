import * as React from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import OrderCardDetails from "./order-card-details";
import { Button } from "@rneui/themed";
import OrderCard from "./order-card";

export default function OrderCardNew() {
  return (
    <OrderCard>
      <OrderCardDetails/>
      <View className="w-full flex flex-col gap-3">
        <Button>
          Accept
        </Button>
        <Button type="outline">
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


