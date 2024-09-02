import React, { useState } from "react";
import Page from "../../components/page";
import { View , StyleSheet} from "react-native";
import Input from "../../components/custom/input";
import { Button } from "@rneui/themed";
import { Image } from "expo-image";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useRouter } from "expo-router";
import Header from "../../components/page-header";


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
        <Page >
            <Header headerTitle="Pickup" /> 
            {/*  */}
            <Image
                source={{ uri: require('~/assets/pickup-design.png') }}
                style={{ width: 185, height: 200, }}
            />
            <View
                style={styles.inputcontainer}
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

const styles = StyleSheet.create({
   
    inputcontainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        width: '100%',
        height: verticalScale(550),
    }
})