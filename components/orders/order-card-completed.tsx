import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import OrderCard from "./order-card";

export default function OrderCardCompleted() {
  return (
    <OrderCard>
      <View style={styles.header}>
        <View style={styles.orderNo}>
          <Text>Order No.:</Text>
        </View>
        <View style={styles.orderNoValue}>
          <Text>12345</Text>
        </View>
      </View>
      <View>
        <Text style={styles.date}>13-11-2023</Text>
      </View>
      <View style={styles.customer}>
        <View style={styles.customerLabel}>
          <Text>Customer:</Text>
        </View>
        <View style={styles.customerValue}>
          <Text>Susan Sharon</Text>
        </View>
        <View>
          <Text style={styles.time}>13:25</Text>
        </View>
      </View>
      <View style={styles.status}>
        <View style={styles.statusLabel}>
          <Text>
            Status:{" "}
            <Text style={styles.statusValue}>Collected</Text>
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
  header: {
    alignItems: "stretch",
    display: "flex",
    flexDirection: "column",
    padding: 16,
  },
  orderNo: {
    justifyContent: "space-between",
    alignItems: "stretch",
    display: "flex",
    marginBottom: 20,
  },
  orderNoValue: {
    flexGrow: 1,
  },
  date: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 16,
    fontWeight: "600",
  },
  customer: {
    justifyContent: "space-between",
    alignItems: "stretch",
    display: "flex",
    marginTop: 5,
    marginBottom: 20,
  },
  customerLabel: {
    justifyContent: "space-between",
    alignItems: "stretch",
    display: "flex",
    marginBottom: 5,
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
    marginTop: 15,
    flexDirection: "column",
    fontSize: 14,
    fontWeight: "400",
    paddingLeft: 16,
    paddingRight: 80,
  },
  statusLabel: {
    fontFamily: "Inter, sans-serif",
    marginBottom: 5,
  },
  statusValue: {
    fontWeight: "600",
  },
  accepted: {
    fontFamily: "Inter, sans-serif",
    marginTop: 5,
  },
  acceptedBy: {
    fontWeight: "700",
  },
});

