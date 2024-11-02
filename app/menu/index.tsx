import React, { useRef, useState } from "react";
import Page from '../../components/page'
import { ActivityIndicator, TextInput, Text, TouchableOpacity, View } from "react-native";
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
    const [searchQuery, setSearchQuery] = useState('');

    const searchRef = useRef<TextInput>(null);

    if (mode === "search") {
        return (
            <Page>
                <View className="px-4">
                    <View className="flex flex-row items-center justify-between w-full py-3">
                        <TouchableOpacity onPressIn={() => searchRef?.current?.focus()} className="border flex gap-2 flex-row items-center border-primary w-4/5 py-2 h-14 rounded-[24px] bg-[#FC5757]/10 to-transparent px-5">
                            <Search stroke={primary} />
                            <TextInput 
                                value={searchQuery} 
                                onChangeText={(text) => setSearchQuery(text)}
                                placeholder="Search"
                                placeholderTextColor="#000"
                                ref={searchRef}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setMode("list")}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                    {
                        !searchQuery ?
                        menuItemsRaw?.map((menuItem: MenuItem) => (
                            <CategoryListItem
                                foodName={menuItem.name}
                                price={menuItem.price}
                                addons={menuItem?.add_ons!}
                                id={menuItem.id}
                                category={menuItem.category}
                                key={menuItem.id}
                                quantity={menuItem.quantity}
                            />
                        ))
                        :
                        menuItemsRaw?.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((menuItem: MenuItem) => (
                            <CategoryListItem
                                foodName={menuItem.name}
                                price={menuItem.price}
                                addons={menuItem?.add_ons!}
                                id={menuItem.id}
                                category={menuItem.category}
                                key={menuItem.id}
                                quantity={menuItem.quantity}
                            />
                        ))
                    }
                    </View>
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

                        <Link className="active:bg-accent rounded-full" href="/menu/create">
                            <Plus size={30} stroke={primary}/>
                        </Link>
                    </View>
                }
                headerTitle="Menu" 
                style="dark"
            />
            <View className="px-4">
                {
                    isLoading ? <ActivityIndicator/> :
                    menuItemsRaw?.length === 0 ? <NoMenuItems/> :
                    availableCategories.map((category) => (
                        <View className="mt-4" key={category}>
                            <Text className="text-2xl font-medium">{category}</Text>
                            {
                                menuItems![category]?.map((menuItem: MenuItem) => (
                                    <CategoryListItem
                                        foodName={menuItem.name}
                                        price={menuItem.price}
                                        addons={menuItem?.add_ons!}
                                        id={menuItem.id}
                                        category={category}
                                        key={menuItem.id}
                                        quantity={menuItem.quantity}
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

function NoMenuItems() {
    return (
        <View className="flex items-center justify-center mt-[50%] space-y2">
            <Text className="text-sm">You have not added any items to your menu.</Text>
            <Text className="text-sm text-primary">Click the "+" icon to Get Started</Text>
        </View>
    )
}