import { Image } from "expo-image";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { scale } from "react-native-size-matters";
import { CategoryListItemProps } from "../utils/types";
import { ChevronDown } from "lucide-react-native";
import useThemeColor from "~/hooks/useThemeColor";
import { Text } from "~/components/ui/text"
import { useRouter } from "expo-router";


export default function CategoryListItem({ foodName, addons, price, id, category }: CategoryListItemProps) {
    const [showAddons, setShowAddons] = useState(false);
    const primary = useThemeColor({}, "primary");
    const router = useRouter();
    
    return (
        <Pressable 
            onPress={() => router.push({ pathname: "/menu/edit", params: { id, category } })} 
            className="py-4" 
            style={styles.listItem}
        >
            <View style={styles.header}>
                <Text className="text-xl font-medium">{foodName}</Text>
                <Text className="text-xl font-medium">N{price}</Text>
            </View>
            <Pressable  
                onPress={() => setShowAddons(!showAddons)}
                style={[styles.header, { width: scale(75) }]}
            >
                <Text className="text-lg">Add ons</Text>
                <ChevronDown stroke={primary}/>
            </Pressable>

            {
                !showAddons ? null :
                <View className="py-2 space-y-1" style={{ width: '100%' }}>
                    {
                        addons.map((addon) => (
                            <View style={styles.header}>
                                <Text className="font-medium">{addon.foodName}</Text>
                                <Text className="font-medium">{addon.price}</Text>
                            </View>
                        ))
                    }
                </View>
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#7E7E7E',
        paddingVertical: 5
    }
})