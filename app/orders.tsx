import React, { useState } from "react";
import Page from "../components/page";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import CompletedOrders from "../components/completed-orders";
import { Tab, TabView } from "@rneui/themed";
import { scale } from "react-native-size-matters";
import useThemeColor from "../hooks/useThemeColor";
import NewOrders from "../components/order-lists/new";
import PreparingOrders from "../components/order-lists/preparing";
import Header from "../components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Text } from "~/components/ui/text";

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState<"new"|"preparing"|"completed">("new");
    const theme = useThemeColor({}, "primary")

    return (
        <Page>
            <Header style="dark"/>
            <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as any)}
                className='w-full mx-auto flex-col gap-1.5'
            >
                <TabsList className='flex-row w-full'>
                    <TabsTrigger value='new' className='flex-1'>
                        <Text>New</Text>
                    </TabsTrigger>
                    <TabsTrigger value='preparing' className='flex-1'>
                        <Text>Preparing</Text>
                    </TabsTrigger>
                    <TabsTrigger value='completed' className='flex-1'>
                        <Text>Completed</Text>
                    </TabsTrigger>
                </TabsList>

                <TabsContent className="px-5" value="new">
                    <NewOrders/>
                </TabsContent>
                <TabsContent className="px-5" value="preparing">
                    <PreparingOrders/>
                </TabsContent>
                <TabsContent className="px-5" value="completed">
                    <CompletedOrders/>
                </TabsContent>


            </Tabs>


            {
                /*
                
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
                        </TabView.Item>
                        <TabView.Item style={styles.tabItem}>
                            <PreparingOrders/>
                        </TabView.Item>
                        <TabView.Item style={styles.tabItem}>
                            <CompletedOrders/>
                        </TabView.Item>
                    </TabView>
                </ScrollView>
                
                */
            }
            

        </Page>
    )
}

const styles = StyleSheet.create({
    tabItem: {
        width: '100%',
        paddingHorizontal: scale(12)
    }
})