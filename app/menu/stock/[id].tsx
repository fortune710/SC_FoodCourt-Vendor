import { Input, Text } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router"
import { useState } from "react";
import { View } from "react-native";
import Page from "~/components/page";
import { Button } from "~/components/ui/button";
import useStock from "~/hooks/useStock";

export default function MenuItemStock() {
    const { id } = useLocalSearchParams();
    const { updateStock } = useStock();

    const [currentStock, setCurrentStock] = useState(0);

    return (
        <Page>

            <View className="flex flex-row items-center gap-3">
                <Text>Add to existing stock</Text>
                <Input 
                    value={String(currentStock)} 
                    onChangeText={(text) => setCurrentStock(+text)}
                />
            </View>

            <Button onPress={() => updateStock({ id: Number(id), quantity: currentStock })}>
                <Text>Save</Text>
            </Button>

        </Page>
    )
}
