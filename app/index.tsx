import React, { useState } from "react";
import Page from "../components/page";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import CompletedOrders from "../components/completed-orders";
import { Tab, TabView } from "@rneui/themed";
import { scale } from "react-native-size-matters";
import useThemeColor from "../hooks/useThemeColor";
import NewOrders from "../components/order-lists/new";
import PreparingOrders from "../components/order-lists/preparing";

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState(0);
    const theme = useThemeColor({}, "primary")

    return (
        <Page>
            <Tab 
                value={activeTab} 
                onChange={setActiveTab} 
                dense
                indicatorStyle={{ backgroundColor: theme }}
                titleStyle={{ color: theme }}
            >
                <Tab.Item>New</Tab.Item>
                <Tab.Item>Preparing</Tab.Item>
                <Tab.Item>Completed</Tab.Item>
            </Tab>
            <ScrollView contentContainerStyle={{ height: Dimensions.get('window').height }}>
                <TabView value={activeTab} onChange={setActiveTab}>
                    <TabView.Item style={styles.tabItem}>
                        <NewOrders/>
                    </TabView.Item>
                    <TabView.Item style={styles.tabItem}>
                        <PreparingOrders/>
                    </TabView.Item>
                    <TabView.Item style={styles.tabItem}>
                        <CompletedOrders/>
                    </TabView.Item>
                </TabView>
            </ScrollView>
            

        </Page>
    )
}

const styles = StyleSheet.create({
    tabItem: {
        width: '100%',
        paddingHorizontal: scale(12)
    }
})