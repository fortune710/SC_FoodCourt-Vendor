import React from "react";
import Page from '../../components/page'
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import CategoryListItem from '../../components/category-list-item';
import { CategoryListItemProps } from "../../utils/types";
import Header from "~/components/header";
import { Plus } from "lucide-react-native";
import useThemeColor from "~/hooks/useThemeColor";
import { Link } from "expo-router";


const items: CategoryListItemProps[] = [
    {
        foodName: 'Chicken Sharwama',
        price: 2000,
        addons: [
            { foodName: 'Coca-Cola', price: 300 },
            { foodName: 'Single Sausage', price: 150 },
            { foodName: 'Double Sausage', price: 300 },
        ]
    },
    {
        foodName: 'Chicken Sharwama',
        price: 2000,
        addons: [
            { foodName: 'Coca-Cola', price: 300 },
            { foodName: 'Single Sausage', price: 150 },
            { foodName: 'Double Sausage', price: 300 },
        ]
    },
    {
        foodName: 'Chicken Sharwama',
        price: 2000,
        addons: [
            { foodName: 'Coca-Cola', price: 300 },
            { foodName: 'Single Sausage', price: 150 },
            { foodName: 'Double Sausage', price: 300 },
        ]
    },
]

export default function MenuPage(){
    const primary = useThemeColor({}, "primary");

    return (
        <Page>
            <Header 
                rightIcon={
                    <Link href="/menu/create">
                        <Plus size={30} stroke={primary}/>
                    </Link>
                }
                headerTitle="Menu" style="dark"/>
            <View className="px-4">
                <Text className="text-2xl mb-2 font-semibold">Category Name</Text>
                {
                    items.map((item) => (
                        <CategoryListItem
                            {...item}
                        />
                    ))
                }
            </View>
        </Page>
    )
}