import React, { useState } from "react"
import { View, StyleSheet, Text, Pressable } from "react-native" 
import { Image } from "expo-image"
import { Switch } from "@rneui/themed"
import Icon from '../components/ui/icon';
import { Alert } from "react-native";
import OrderCardDetails from "./orders/order-card-details";

export default function OrderCardPreparing(){
    
    const [preparing, setPreparing] = useState(true);


    const changePreparingStatus = () => {
        if(!preparing) return

        return Alert.alert(
            'Change Status',
            "Are you sure you want to change the status to 'Prepared'? This cannot be undone.",
            [
                { text: 'Cancel', onPress: () => {} },
                { 
                    text: 'Confirm', 
                    onPress: () => {
                        setPreparing(!preparing)
                    } 
                }
            ]
        )
    }
    
    return (
        <View style={styles.container}>
            <OrderCardDetails/>

            <View style={[styles.actions, { width: '100%', paddingVertical: 7 }]}>
                <View style={[styles.actions, { width: 200 }]}>
                    <Switch value={preparing} onValueChange={changePreparingStatus}/>
                    <Text>{preparing ? 'Preparing' : 'Prepared'}</Text>
                </View>

                <Pressable>
                    <Icon
                        iconFile={require('../assets/icons/phone.svg')}
                    />
                </Pressable>
            </View>
        </View>
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
        fontFamily: "Montserrat",
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