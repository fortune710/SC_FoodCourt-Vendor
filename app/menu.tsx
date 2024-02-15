import React from "react";
import Page from '../components/page'
import { Text, View } from "react-native";
import CategoryListItem from '../components/category-list-item';
import { CategoryListItemProps } from "../utils/types";


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
    return (
        <Page>
            <View>
                <Text>Category</Text>
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