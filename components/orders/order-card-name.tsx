import { View, StyleSheet, Text, Image } from "react-native";


export default function OrderCardName() {
    return(
        <>
            <View style={styles.row}>
                <Text style={styles.orderNo}>
                    Order No: 12345
                </Text>
                <Text style={styles.date}>13-11-2023</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.customerLabel}>
                    Customer: Susan Sharon
                </Text>
                <Text style={styles.time}>13:25</Text>
            </View>
            {/* <Text style={styles.dateTime}>Wed, November 13, 2023 13:25</Text> */}
        </>
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
      marginBottom: 10
    },
    orderNo: {
      justifyContent: "space-between",
      alignItems: "stretch",
      display: "flex",
      fontWeight: 'bold'
    
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
      fontWeight: "bold"
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
  
  