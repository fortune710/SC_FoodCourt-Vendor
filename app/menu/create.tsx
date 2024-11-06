import { Input } from "@rneui/themed";
import { useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Page from "~/components/page";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Text } from "~/components/ui/text";
import { Addon, CreateMenuItemData } from "~/utils/types";
import { Button as ShadcnButton } from "~/components/ui/button";
import { ChevronLeft, Minus, Plus } from "lucide-react-native";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import Toast from "react-native-toast-message";
import useMenuItems from "~/hooks/useMenuItems";
import { useRouter } from "expo-router";

const CATEGORIES = [
    "Rice",
    "Pasta",
    "Sharwama",
    "Drinks",
    "Desserts",
    "Grills",
    "Sandwiches",
    "Burgers",
]

const PREPARATION_TIMES = [
    "5 mins",
    "10 mins",
    "15 mins",
    "20 mins",
    "25 mins",
    "30 mins",
]

const defaultMenuItemState: CreateMenuItemData = {
    name: "",
    price: 0,
    preparation_time: "",
    category: "",
    add_ons: [],
    quantity: 0,
    warning_stock_value: 12,
    restocking_value: 50,
    opening_stock_value: 50
}

export default function CreateMenuItemPage() {
    const [newMenuItem, setNewMenuItem] = useState<CreateMenuItemData>(defaultMenuItemState);

    const [newAddon, setNewAddon] = useState<Addon>({
        foodName: "",
        price: 0
    });

    const insets = useSafeAreaInsets();
    const contentInsets = {
      top: insets.top,
      bottom: insets.bottom,
      left: 12,
      right: 12,
    };

    const createNewAddon = () => {
        setNewMenuItem({ ...newMenuItem, add_ons: [...newMenuItem?.add_ons!, newAddon] })
        setNewAddon({ foodName: "", price: 0 });
        return Toast.show({
            text1: "Add on Added Successfully",
            type: "success"
        })
    }

    const { createMenuItem } = useMenuItems();
    const router = useRouter();

    const createItem = async (data: CreateMenuItemData) => {
        await createMenuItem(data);
        setNewMenuItem(defaultMenuItemState);
        return router.replace("/menu");
    }


    return (
        <Page>
            <ScrollView contentContainerClassName="pb-32">
                <View className="flex flex-row items-center mb-8 justify-between px-3">
                    <TouchableOpacity onPress={() => router.replace('/menu')}>
                        <ChevronLeft stroke={"#FF3551"} size={30}/>
                    </TouchableOpacity>

                    <Text className="text-3xl font-medium">New Item</Text>

                    <View className="mr-8"/>
                </View>

                <Input
                    label="Item Name"
                    placeholder="Enter Item Name"
                    onChangeText={(text) => setNewMenuItem({ ...newMenuItem, name: text })}
                    value={newMenuItem.name}
                />

                <View className="mb-7 px-3">
                    <Text>Category</Text>
                    <Select 
                        className="w-full"
                        onValueChange={(option) => setNewMenuItem({ ...newMenuItem, category: option?.value! })}
                    >
                        <SelectTrigger className='w-full'>
                            <SelectValue
                                className='text-foreground text-sm native:text-lg'
                                placeholder='Select a category'
                            />
                        </SelectTrigger>
                        <SelectContent insets={contentInsets} className='w-full'>
                            {
                                CATEGORIES.map((category) => (
                                    <SelectItem key={category} label={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>     
                </View>

                <Input
                    label="Base Price"
                    placeholder="Enter Base Price"
                    onChangeText={(text) => setNewMenuItem({ ...newMenuItem, price: Number(text) })}
                    value={!newMenuItem.price ? undefined : String(newMenuItem.price)}
                    keyboardType="numeric"
                />

                <View className="mb-7 px-3">
                    <Text>Preparation Time</Text>
                    <Select 
                        className="w-full"
                        onValueChange={(option) => setNewMenuItem({ ...newMenuItem, preparation_time: option?.value! })}
                    >
                        <SelectTrigger className='w-full'>
                            <SelectValue
                                className='text-foreground text-sm native:text-lg'
                                placeholder='Select a preparation time'
                            />
                        </SelectTrigger>
                        <SelectContent insets={contentInsets} className='w-full'>
                            {
                                PREPARATION_TIMES.map((time) => (
                                    <SelectItem key={time} label={time} value={time}>
                                        {time}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>     
                </View>

                <View className="w-full px-4 mb-5">
                    <View className="flex flex-row items-center gap-4 w-full">
                        <Text className="text-lg font-semibold">Add Ons / Customization</Text>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <ShadcnButton className="rounded-full h-7 w-7 p-2" size="icon">
                                    <Plus className="w-2 h-2" stroke="white"/>
                                </ShadcnButton>
                            </AlertDialogTrigger>

                            <AlertDialogContent className="w-5/6">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Include Add on</AlertDialogTitle>
                                </AlertDialogHeader>

                                <View>
                                    <Input
                                        label="Add on Name"
                                        placeholder="eg. Sausage"
                                        onChangeText={(text) => setNewAddon({ ...newAddon, foodName: text })}
                                        value={newAddon.foodName}
                                    />

                                    <Input
                                        label="Add on Price"
                                        placeholder="eg. 2500"
                                        onChangeText={text => setNewAddon({ ...newAddon, price: Number(text) })}
                                        value={!newAddon.price ? undefined : String(newAddon.price)}
                                        keyboardType="numeric"
                                    />
                                </View>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        <Text>Cancel</Text>
                                    </AlertDialogCancel>

                                    <AlertDialogAction onPress={createNewAddon}>
                                        <Text>Save</Text>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </View>          
                    
                    <View className="w-full">
                        {
                            newMenuItem.add_ons?.map((addon) => (
                                <View className="w-full flex flex-row items-center justify-between py-2" key={addon.foodName}>
                                    <Text>{addon.foodName}</Text>
                                    <Text>NGN {addon.price}</Text>
                                </View>
                            ))
                        }

                    </View>
                </View>

                
                <View className="w-full px-4">
                    <Text className="text-lg font-semibold">Stock</Text>

                    <View className="flex flex-row items-center mb-5 justify-between w-full">
                        <Text className="text-base font-light">Default Opening Stock Value</Text>
                        <View className="flex flex-row items-center gap-3">
                            <TouchableOpacity 
                                disabled={newMenuItem.opening_stock_value === 0}
                                onPress={() => setNewMenuItem({ ...newMenuItem, opening_stock_value: newMenuItem.opening_stock_value - 1 })}
                            >
                                <Minus stroke="#000"/>
                            </TouchableOpacity>
                            <TextInput
                                onChangeText={(text) => setNewMenuItem({ ...newMenuItem, opening_stock_value: Number(text) })}
                                value={String(newMenuItem.opening_stock_value || 0)}
                                className="border rounded-md h-12 w-12 text-center"
                            />
                            <TouchableOpacity 
                                onPress={() => setNewMenuItem({ ...newMenuItem, opening_stock_value: newMenuItem.opening_stock_value + 1 })}
                            >
                                <Plus stroke="#000"/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="flex flex-row items-center mb-5 justify-between w-full">
                        <Text className="text-base font-light">Warning Stock Value</Text>
                        <View className="flex flex-row items-center gap-3">
                            <TouchableOpacity 
                                disabled={newMenuItem.warning_stock_value === 0}
                                onPress={() => setNewMenuItem({ ...newMenuItem, warning_stock_value: newMenuItem.warning_stock_value - 1 })}
                            >
                                <Minus stroke="#000"/>
                            </TouchableOpacity>
                            <TextInput
                                onChangeText={(text) => setNewMenuItem({ ...newMenuItem, warning_stock_value: Number(text) })}
                                value={String(newMenuItem.warning_stock_value || 0)}
                                className="border rounded-md h-12 w-12 text-center"
                            />
                            <TouchableOpacity 
                                onPress={() => setNewMenuItem({ ...newMenuItem, warning_stock_value: newMenuItem.warning_stock_value + 1 })}
                            >
                                <Plus stroke="#000"/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="flex flex-row items-center justify-between w-full">
                        <Text className="text-base font-light">Default Restocking Value</Text>
                        <View className="flex flex-row items-center gap-3">
                            <TouchableOpacity 
                                disabled={newMenuItem.restocking_value === 0}
                                onPress={() => setNewMenuItem({ ...newMenuItem, restocking_value: newMenuItem.restocking_value - 1 })}
                            >
                                <Minus stroke="#000"/>
                            </TouchableOpacity>
                            <TextInput
                                onChangeText={(text) => setNewMenuItem({ ...newMenuItem, restocking_value: Number(text) })}
                                value={String(newMenuItem.restocking_value || 0)}
                                className="border rounded-md h-12 w-12 text-center"
                            />
                            <TouchableOpacity 
                                onPress={() => setNewMenuItem({ ...newMenuItem, restocking_value: newMenuItem.restocking_value + 1 })}
                            >
                                <Plus stroke="#000"/>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                


                <View className="flex flex-col items-center gap-5 px-3 w-full mt-16">
                    <ShadcnButton onPress={() => createItem(newMenuItem)} className="w-full rounded-[50px]">
                        <Text>Save</Text>
                    </ShadcnButton>

                    <ShadcnButton variant="outline" className="w-full rounded-[50px]">
                        <Text>Cancel</Text>
                    </ShadcnButton>
                </View>
                
            </ScrollView>

        </Page>
    )
}