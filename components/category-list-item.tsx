import { Image } from "expo-image";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";
import { CategoryListItemProps } from "../utils/types";


export default function CategoryListItem({ foodName, addons, price }: CategoryListItemProps) {
    const [showAddons, setShowAddons] = useState(false);
    
    return (
        <View style={styles.listItem}>
            <View style={styles.header}>
                <Text>{foodName}</Text>
                <Text>N{price}</Text>
            </View>
            <Pressable  
                onPress={() => setShowAddons(!showAddons)}
                style={[styles.header, { width: scale(150) }]}
            >
                <Text>Addons</Text>
                <Image
                    source={{ uri: require('../assets/icons/caret-down.svg') }}
                    style={{ width: scale(20), height: scale(20) }}
                />
            </Pressable>

            {
                !showAddons ? null :
                <View style={{ width: '100%' }}>
                    {
                        addons.map((addon) => (
                        <View style={styles.header}>
                            <Text>{addon.foodName}</Text>
                            <Text>{addon.price}</Text>
                        </View>
                        ))
                    }
                </View>
            }
        </View>
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