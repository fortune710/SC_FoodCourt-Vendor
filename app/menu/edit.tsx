import { Button, Input } from "@rneui/themed";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Page from "~/components/page";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Text } from "~/components/ui/text";
import { Addon, CreateMenuItemData, MenuItem } from "~/utils/types";
import { Button as ShadcnButton } from "~/components/ui/button";
import { ChevronLeft, Plus } from "lucide-react-native";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import Toast from "react-native-toast-message";
import useMenuItems from "~/hooks/useMenuItems";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CATEGORIES, PREPARATION_TIMES } from "~/utils/constants";



export default function CreateMenuItemPage() {
    const searchParams = useLocalSearchParams();
    const menuItemId = Number(searchParams.id as string);
    const { updateMenuItem, getSingleMenuItem } = useMenuItems();
    const menuItem = getSingleMenuItem(menuItemId, searchParams.category as string);


    const [newMenuItem, setNewMenuItem] = useState<MenuItem>({
        id: menuItemId,
        name: menuItem.name,
        price: menuItem.price,
        preparation_time: menuItem.preparation_time,
        category: menuItem.category,
        add_ons: menuItem.add_ons,
        quantity: menuItem.quantity
    })

    const [newAddon, setNewAddon] = useState<Addon>({
        foodName: "",
        price: 0
    });

    const createNewAddon = () => {
        setNewMenuItem({ ...newMenuItem, add_ons: [...newMenuItem?.add_ons!, newAddon] })
        setNewAddon({ foodName: "", price: 0 });
        return Toast.show({
            text1: "Item Added Successfully",
            type: "success"
        })
    }

    const router = useRouter();

    const insets = useSafeAreaInsets();
    const contentInsets = {
      top: insets.top,
      bottom: insets.bottom,
      left: 12,
      right: 12,
    };

    const editItems = async () => {
        await updateMenuItem(newMenuItem)
        return router.replace('/menu')
    }
    return (
        <Page>
            <View className="flex flex-row items-center mb-8 justify-between px-3">
                <TouchableOpacity onPress={() => router.replace('/menu')}>
                    <ChevronLeft stroke={"#FF3551"} size={30}/>
                </TouchableOpacity>

                <Text className="text-3xl font-bold">New Item</Text>

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
                    defaultValue={{ label: newMenuItem.category, value: newMenuItem.category }}
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
                value={String(newMenuItem.price)}
            />

            <View className="mb-7 px-3">
                <Text>Preparation Time</Text>
                <Select 
                    className="w-full"
                    defaultValue={{ label: newMenuItem.preparation_time, value: newMenuItem.preparation_time }}
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

            <View className="w-full px-4">
                <View className="flex flex-row items-center gap-4 w-full">
                    <Text className="text-lg font-semibold">Add Ons / Customization</Text>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <ShadcnButton className="rounded-full" size="icon">
                                <Plus stroke="white"/>
                            </ShadcnButton>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Include Add on</AlertDialogTitle>
                            </AlertDialogHeader>

                            <View>
                                <Input
                                    label="Add on Name"
                                    placeholder="Enter Add on Name"
                                    onChangeText={(text) => setNewAddon({ ...newAddon, foodName: text })}
                                    value={newAddon.foodName}
                                />

                                <Input
                                    label="Add on Price"
                                    placeholder="Enter Add on Price"
                                    onChangeText={text => setNewAddon({ ...newAddon, price: Number(text) })}
                                    value={String(newAddon.price)}
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
                            <View className="w-full flex flex-row items-center justify-between" key={addon.foodName}>
                                <Text>{addon.foodName}</Text>
                                <Text>{addon.price}</Text>
                            </View>
                        ))
                    }

                </View>
            </View>
            
            <View className="w-full px-4">
                <View className="flex flex-row items-center gap-4 w-full">
                    <Text className="text-lg font-semibold">Stock</Text>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <ShadcnButton className="rounded-full" size="icon">
                                <Plus stroke="white"/>
                            </ShadcnButton>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Stock</AlertDialogTitle>
                                <AlertDialogDescription>
                                    How many of this is avialable?
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <View>
                                <Input
                                    label="Quantity"
                                    placeholder="Enter Quantity"
                                    onChangeText={(text) => setNewMenuItem({ ...newMenuItem, quantity: Number(text) })}
                                    value={String(newMenuItem.quantity)}
                                />
                            </View>

                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    <Text>Cancel</Text>
                                </AlertDialogCancel>

                                <AlertDialogAction>
                                    <Text>Save</Text>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </View>
                <Text className="text-lg font-medium">{newMenuItem.quantity}</Text>
            </View>


            <View className="flex flex-col items-center gap-5 px-3 w-full mt-20">
                <ShadcnButton onPress={editItems} className="w-full rounded-[50px]">
                    <Text>Save</Text>
                </ShadcnButton>

                <ShadcnButton variant="outline" className="w-full rounded-[50px]">
                    <Text>Cancel</Text>
                </ShadcnButton>
            </View>

        </Page>
    )
}