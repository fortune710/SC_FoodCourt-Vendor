import React, { useState } from "react";
import Page from '../../components/page'
import { ActivityIndicator, Pressable, Text, TouchableOpacity, View } from "react-native";
import CategoryListItem from '../../components/category-list-item';
import { CategoryListItemProps, MenuItem } from "../../utils/types";
import Header from "~/components/header";
import { Plus, Search } from "lucide-react-native";
import useThemeColor from "~/hooks/useThemeColor";
import { Link } from "expo-router";
import useMenuItems from "~/hooks/useMenuItems";
import { Input } from "@rneui/themed";

export default function MenuPage(){
    const primary = useThemeColor({}, "primary");
    const { menuItems, isLoading, menuItemsRaw } = useMenuItems();
    const [mode, setMode] = useState<"search"|"list">("list");
    const availableCategories = Object.keys(menuItems ?? {});

    if (mode === "search") {
        return (
            <Page>
                <View className="flex flex-row items-center justify-between px-3">
                    <Input/>

                    <TouchableOpacity onPress={() => setMode("list")}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {
                        menuItemsRaw?.map((menuItem: MenuItem) => (
                            <CategoryListItem
                                foodName={menuItem.name}
                                price={menuItem.price}
                                addons={menuItem?.add_ons!}
                                id={menuItem.id}
                                category={menuItem.category}
                                key={menuItem.id}
                            />
                        ))
                    }
                </View>

            </Page>
        )
    }


    return (
        <Page>
            <Header 
                rightIcon={
                    <View className="flex flex-row gap-4 items-center">
                        <TouchableOpacity onPress={() => setMode("search")}>
                            <Search size={30} stroke={primary}/>
                        </TouchableOpacity>

                        <Link href="/menu/create">
                            <Plus size={30} stroke={primary}/>
                        </Link>
                    </View>
                }
                headerTitle="Menu" style="dark"/>
            <View className="px-4">
                {
                    isLoading ? <ActivityIndicator/> :
                    availableCategories.map((category) => (
                        <View className="mb-6" key={category}>
                            <Text className="text-2xl font-semibold">{category}</Text>
                            {
                                menuItems![category]?.map((menuItem: MenuItem) => (
                                    <CategoryListItem
                                        foodName={menuItem.name}
                                        price={menuItem.price}
                                        addons={menuItem?.add_ons!}
                                        id={menuItem.id}
                                        category={category}
                                        key={menuItem.id}
                                    />
                                ))
                            }

                        </View>
                    ))
                }
            </View>
        </Page>
    )
}