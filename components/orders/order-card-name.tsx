import { View, StyleSheet, Text, Image } from "react-native";
import { scale } from "react-native-size-matters";
import { Order } from "~/utils/types";

interface Props {
  orderNumber: number | string;
  customerName: string;
  orderDate: Date;
}

function formatDateTime(dateInput: Date | string) {
  const date = dateInput ? new Date(dateInput) : new Date();
  
  // Format date as DD-MM-YYYY
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  // Format time as HH:MM
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return {
      date: `${day}-${month}-${year}`,
      time: `${hours}:${minutes}`
  };
}

export default function OrderCardName({ order }: { order: Order }) {
  const { date, time } = formatDateTime(order.order_date);

  return(
    <View className="border-b px-1 py-1">
      <View style={styles.row}>
          <Text style={styles.orderNo}>
            Order No: {order?.id!}
          </Text>
          <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.row}>
          <Text style={styles.customerLabel}>
              Customer: {order?.customer_name}
          </Text>
          <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  dateTime: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
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
      marginBottom: 5
    },
    orderNo: {
      justifyContent: "space-between",
      alignItems: "stretch",
      display: "flex",
      fontWeight: 'semibold',
      fontSize: scale(16)
    
    },
    orderNoValue: {
      flexGrow: 1,
      
    },
    date: {
      fontFamily: "Montserrat",
      fontSize: 16,
      fontWeight: "bold",
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
      fontWeight: 'regular',
      fontSize: scale(12)
    },
    customerValue: {
      flexGrow: 1,
    },
    time: {
      textAlign: "right",
      fontFamily: "Montserrat",
      fontWeight: "bold"
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
  
  