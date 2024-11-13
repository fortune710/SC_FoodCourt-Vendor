import { Image } from "expo-image";
import React, { useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { scale } from "react-native-size-matters";
import { CategoryListItemProps } from "../utils/types";
import { ChevronDown } from "lucide-react-native";
import useThemeColor from "~/hooks/useThemeColor";
import { Text } from "~/components/ui/text"
import { useRouter } from "expo-router";
import useCurrentUser from "~/hooks/useCurrentUser";


export default function CategoryListItem({ foodName, addons, price, id, category, quantity }: CategoryListItemProps) {
    const [showAddons, setShowAddons] = useState(false);
    const primary = useThemeColor({}, "primary");
    const router = useRouter();
    const { currentUser } = useCurrentUser();

    const moveToEditPage = () => {
        if (currentUser?.user_type !== "admin") return;
        return router.push({ pathname: "/menu/edit", params: { id, category } })
    }
    
    return (
        <Pressable 
            onPress={moveToEditPage} 
            className="py-4" 
            style={styles.listItem}
        >
            <View style={[styles.header, {alignItems: 'flex-start'}]}>
                <Text className="text-lg font-medium" style={{width: '70%'}}>{foodName}</Text>
                <Text className="text-lg font-medium">NGN {price}</Text>
            </View>

            <View className="flex flex-row gap-2 items-center">
                <Text className="text-base font-light">Stock {quantity};</Text>

                <TouchableOpacity  
                    onPress={() => setShowAddons(!showAddons)}
                    style={[styles.header, { width: scale(70) }]}
                >
                    <Text className="text-base font-light">Add ons</Text>

                    <ChevronDown stroke={primary}/> 
                </TouchableOpacity>
            </View>

            {
                !showAddons ? null :
                <View className="py-2 space-y-1" style={{ width: '100%' }}>
                    {
                        addons.sort((a, b) => a.foodName.localeCompare(b.foodName)).map((addon) => (
                            <View key={addon.foodName} className="py-0.5 flex flex-row items-center justify-between">
                                <Text className="font-medium">{addon.foodName}</Text>
                                <Text className="font-medium">+ NGN {addon.price}</Text>
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