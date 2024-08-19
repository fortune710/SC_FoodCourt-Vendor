import React, { useState } from "react";
import Page from "../../components/page";
import { View } from "react-native";
import Input from "../../components/ui/input";
import { Button } from "@rneui/themed";
import { Image } from "expo-image";
import { scale, verticalScale } from "react-native-size-matters";
import { useRouter } from "expo-router";

export default function PickupPage() {
    const router = useRouter();

    const [orderNumbers, setOrderNumbers] = useState<string>("")

    const moveToPickups = () => {
        router.push({
            pathname: "/pickup/orders",
            params: {
                order_nums: orderNumbers.split(","),
            }
        })
    }
    return (
        <Page>
            <Image
                source={{ uri: require('../../assets/pickup-design.png') }}
                style={{ width: 185, height: 200, zIndex: 20 }}
            />
            <View
                style={{ width: '100%', paddingHorizontal: 30 }}
            >
                <Input
                    placeholder="Enter Order Numbers"
                    style={{ height: 60, marginBottom: 18 }}
                    onChangeText={(text) => setOrderNumbers(text)}
                    
                />
                <Button onPress={moveToPickups} titleStyle={{ fontWeight: "600" }}>
                    Find
                </Button>
            </View>
        </Page>
    )
}