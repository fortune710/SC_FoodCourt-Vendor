import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image"; 
import utilityStyles from '../../utils/styles';

const OrderItemIcon = View

interface OrderCardDetailsProps {
    showTime?: boolean
}

export default function OrderCardDetails({ showTime }: OrderCardDetailsProps) {
    return (
        <>
            <View style={styles.header}>
                <Text>Order No. 12345:</Text>
                <Text style={styles.date}>13-11-2023</Text>
            </View>
            
            <View style={styles.customer}>
                <Text>Customer: Susan Sharon </Text>
                <Text style={styles.time}>13:25</Text>
            </View>

            <View style={styles.orderDescription}>
                <Text>
                    Lorem ipsum dolor sit amet consectetur. Tristique 
                    platea enim maecenas sed volutpat. Interdum 
                    morbi eget bibendum volutpat ipsum amet nunc orci.
                </Text>

                <View>
                    <View>
                        <View style={styles.orderItem}>
                            <OrderItemIcon style={styles.orderItemType}>
                                <Image
                                    source={{
                                        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/6b0be5ea14d58de9c30289921bf630117df978d4109955a6302773e3fb884d32?apiKey=730671e7852c4d91bc984b7d2d07d7fb&",
                                    }}
                                />
                            </OrderItemIcon>
                            <Text>Food</Text>
                        </View>

                        <View style={styles.orderItem}>
                            <OrderItemIcon style={styles.orderItemType}>
                                <Image
                                    source={{
                                        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/6b0be5ea14d58de9c30289921bf630117df978d4109955a6302773e3fb884d32?apiKey=730671e7852c4d91bc984b7d2d07d7fb&",
                                    }}
                                />
                            </OrderItemIcon>
                            <Text>Drink</Text>
                        </View>
                    </View>
                    {
                        !showTime ? null :
                        <Text style={styles.orderCompletedTime}>
                            2:00
                        </Text>
                    }
                </View>
            </View>
        </>
    )
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
    date: {
        fontFamily: "Montserrat, sans-serif",
        fontSize: 16,
        fontWeight: "600",
    },
    customer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        display: "flex",
        marginTop: 5,
        marginBottom: 20,
    },
    time: {
        textAlign: "right",
        fontFamily: "Montserrat",
    },
    orderCompletedTime: {
        //...utilityStyles.flexAllCenter,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 15,
        textAlign: 'center',
        backgroundColor: '#d9d9d9',
        color: 'black'

    },
    orderDescription: {
        borderTopWidth: 1,
        paddingVertical: 5
    },
    orderItem: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",        
    },
    orderItemType: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 999,
        border: "0.5px solid #FE7F7F",
        backgroundColor: "#fff",
        flexDirection: "row",
        display: "flex",
        aspectRatio: "1",
        width: 32,
        height: 32,
        marginRight: 7,
        paddingHorizontal: 4
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    }
    
})  