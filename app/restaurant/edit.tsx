import { Pressable, View } from "react-native";
import { Text } from "@rneui/themed"; 
import Page from "~/components/page";
import Header from "~/components/page-header";
import { Switch } from "~/components/ui/switch";
import { useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import Input from "~/components/custom/input";
import { Label } from "~/components/ui/label";
import { ChevronRight } from "lucide-react-native"
import useThemeColor from "~/hooks/useThemeColor"
import useResturant from "~/hooks/useResturant";

export default function EditRestaurant() {
    const [restaurantOpen, setRestaurantOpen] = useState(true);
    const primary = useThemeColor({}, "primary");

    const { updateResturant } = useResturant();

    const setRestaurantStatus = async (checked: boolean) => {
        try {
            setRestaurantOpen(checked)
            return await updateResturant({
                is_closed: !checked
            })
        } catch {
            return setRestaurantOpen(!checked)
        }
    }

    return (
        <Page>
            <Header headerTitle="Restaurant"/>

            <View className="flex flex-row items-center justify-between">
                <Text>Restaurant Open</Text>
                <Switch
                    checked={restaurantOpen}
                    onCheckedChange={setRestaurantStatus}
                />
            </View>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Pressable>
                        <View className="flex flex-row items-center justify-between mb-5">
                            <Text>Incoming Orders</Text>
                            <ChevronRight stroke={primary} />
                        </View>

                        <View className="flex flex-row items-center justify-between gap-2">
                            <Text>Max Orders</Text>
                            <Text>50</Text>
                        </View>
                        <View className="flex flex-row items-center gap-2">
                            <Text>Resume Orders at</Text>
                            <Text>50</Text>
                        </View>

                    </Pressable>

                </AlertDialogTrigger>

                <AlertDialogContent>
                    <View className="w-full">
                        <Label nativeID="max-orders">Max Orders</Label>
                        <Input
                            placeholder="Max Number of Orders to Handle"
                        />
                    </View>

                    <View className="w-full">
                        <Label nativeID="resume-orders">Resume Orders At</Label>
                        <Input
                            placeholder="Number of orders left to start receiving again"
                        />
                    </View>
                </AlertDialogContent>
            </AlertDialog>

            
        </Page>
    )
}