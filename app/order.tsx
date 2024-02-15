import React, { useState } from "react";
import Page from "../components/page";
import { View } from "react-native";
import CompletedOrders from "../components/completed-orders";
import { Tab, TabView } from "@rneui/themed";

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Page>
            <Tab value={activeTab} onChange={setActiveTab} dense>
                <Tab.Item>New</Tab.Item>
                <Tab.Item>Preparing</Tab.Item>
                <Tab.Item>Completed</Tab.Item>
            </Tab>
            
            <TabView>
                <TabView.Item>
                    <CompletedOrders/>
                </TabView.Item>
                <TabView.Item>
                    <CompletedOrders/>
                </TabView.Item>
                <TabView.Item>
                    <CompletedOrders/>
                </TabView.Item>
            </TabView>

        </Page>
    )
}