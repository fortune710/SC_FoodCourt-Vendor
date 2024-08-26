import React from "react";
import Page from '../../components/page'
import { ActivityIndicator, Pressable, Text, TouchableOpacity, View } from "react-native";
import CategoryListItem from '../../components/category-list-item';
import { CategoryListItemProps, MenuItem } from "../../utils/types";
import Header from "~/components/header";
import { Plus } from "lucide-react-native";
import useThemeColor from "~/hooks/useThemeColor";
import { Link } from "expo-router";
import useMenuItems from "~/hooks/useMenuItems";

export default function MenuPage(){
    const primary = useThemeColor({}, "primary");
    const { menuItems, isLoading } = useMenuItems();
    const availableCategories = Object.keys(menuItems ?? {});


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
                {
                    isLoading ? <ActivityIndicator/> :
                    availableCategories.map((category) => (
                        <View className="mb-6">
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