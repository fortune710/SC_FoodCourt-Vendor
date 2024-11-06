import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import OrderCard from "./order-card";
import OrderCardName from "./order-card-name";
import { Order, OrderStatus } from "~/utils/types";

export default function OrderCardCompleted({ order }: { order: Order }) {
  return (
    <OrderCard>
      <OrderCardName order={order}/>
      <View style={styles.status}>
        <View style={styles.statusLabel}>
          <Text>
            Status:{" "}
            <Text style={styles.statusValue}>{OrderStatus[order?.status]}</Text>
          </Text>
        </View>
        <View style={styles.accepted}>
          <Text>
            Accepted by: <Text style={styles.acceptedBy}>You</Text>
          </Text>
        </View>
      </View>
    </OrderCard>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#7E7E7E",
    backgroundColor: "#FFF5F5",
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
  row: {
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    marginBottom: 10
  },
  orderNo: {
    justifyContent: "space-between",
    alignItems: "stretch",
    display: "flex",
  },
  orderNoValue: {
    flexGrow: 1,
  },
  date: {
    fontFamily: "Montserrat",
    fontSize: 16,
    fontWeight: "600",
    color: '#000'
  },
  customer: {
    justifyContent: "space-between",
    alignItems: "stretch",
    display: "flex",
    marginTop: 5,
    marginBottom: 20,
  },
  customerLabel: {
    display: "flex",
  },
  customerValue: {
    flexGrow: 1,
  },
  time: {
    textAlign: "right",
    fontFamily: "Montserrat",
  },
  status: {
    justifyContent: "center",
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 10
  },
  statusLabel: {
    fontFamily: "Inter",
    marginBottom: 5,
  },
  statusValue: {
    fontWeight: "600",
  },
  accepted: {
    fontFamily: "Inter",
    marginTop: 5,
  },
  acceptedBy: {
    fontWeight: "700",
  },
});

