import React from "react";
import Page from "../components/page";
import { View } from "react-native";
import Input from "../components/ui/input";
import { Button } from "@rneui/themed";
import { Image } from "expo-image";
import { scale, verticalScale } from "react-native-size-matters";

export default function PickupPage() {
    return (
        <Page>
            <Image
                source={{ uri: require('../assets/pickup-design.svg') }}
                style={{ width: scale(185), height: verticalScale(200), position: 'absolute', top: 0, right: 0 }}
            />
            <View
                style={{ width: '80%' }}
            >
                <Input
                    placeholder="Enter Order Numbers"
                />
                <Button>
                    Find
                </Button>
            </View>
        </Page>
    )
}