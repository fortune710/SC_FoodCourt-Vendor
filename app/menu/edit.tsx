import { Input } from "@rneui/themed";
import { useState } from "react";
import { Pressable, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Page from "~/components/page";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Text } from "~/components/ui/text";
import { Addon, MenuItem } from "~/utils/types";
import { Button as ShadcnButton } from "~/components/ui/button";
import { ChevronLeft, Minus, Plus, Trash, X } from "lucide-react-native";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import Toast from "react-native-toast-message";
import useMenuItems from "~/hooks/useMenuItems";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CATEGORIES, PREPARATION_TIMES } from "~/utils/constants";
import useThemeColor from "~/hooks/useThemeColor";

export default function CreateMenuItemPage() {
    const searchParams = useLocalSearchParams();
    const menuItemId = Number(searchParams.id as string);
    const { updateMenuItem, getSingleMenuItem } = useMenuItems();
    const menuItem = getSingleMenuItem(menuItemId, searchParams.category as string);
    const primary = useThemeColor({}, "primary");

    const [categorySearchQuery, setCategorySearchQuery] = useState('');
    const categorySearchResults = !categorySearchQuery ? CATEGORIES: CATEGORIES?.filter((CATEGORIES) => CATEGORIES?.toLowerCase().includes(categorySearchQuery.toLowerCase())).slice(0, 5);



    const [newMenuItem, setNewMenuItem] = useState<MenuItem>({
        id: menuItemId,
        name: menuItem.name,
        price: menuItem.price,
        preparation_time: menuItem.preparation_time,
        category: menuItem.category,
        add_ons: menuItem.add_ons,
        quantity: menuItem.quantity,
        warning_stock_value: menuItem.warning_stock_value,
        opening_stock_value: menuItem.opening_stock_value,
        restocking_value: menuItem.restocking_value,
        is_disabled: menuItem.is_disabled,
        is_deleted: menuItem.is_deleted,
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

    const removeAddon = (foodName: string) => {
        const addonsLeft = newMenuItem.add_ons?.filter((addon) => addon.foodName !== foodName)
        setNewMenuItem({ ...newMenuItem, add_ons: addonsLeft });

        return Toast.show({
            text1: "Add on Removed Successfully",
            type: "success"
        })
    }

    const editAddon = (foodName: string) => {
        const addonsLeft = newMenuItem.add_ons?.filter((addon) => addon.foodName !== foodName)
        setNewMenuItem({ ...newMenuItem, add_ons: [...addonsLeft!, newAddon] });
        setNewAddon({ foodName: "", price: 0 });

        return Toast.show({
            text1: "Item Edited Successfully",
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

    const editItem = async () => {
        await updateMenuItem(newMenuItem)
        return router.replace('/menu')
    }

    //Usiere- I've set the buttons. Work your magic on the logic
    const disableItem = () => {
        const newData = {
            ...newMenuItem,
            is_disabled: true
        }
        return updateMenuItem(newData)
    } //disable removes the item from the customers view

    const removeItem = () => {
        const newData = {
            ...newMenuItem,
            is_deleted: true
        }
        return updateMenuItem(newData)
    }


    return (
        <Page>
            <ScrollView contentContainerClassName="pb-32">
                <View className="flex flex-row items-center mb-8 justify-between px-3">
                    <TouchableOpacity onPress={() => router.replace('/menu')}>
                        <ChevronLeft stroke={"#FF3551"} size={30}/>
                    </TouchableOpacity>

                    <Text className="text-3xl font-medium">Edit Item</Text>

                    <TouchableOpacity onPress={editItem}>
                        <Text style= {{fontSize: 18, fontWeight: 500, color: '#f72f2f'}}>Save</Text>
                    </TouchableOpacity>

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
                        className="w-full border-b"
                        defaultValue={{ label: newMenuItem.category, value: newMenuItem.category }}
                        onValueChange={(option) => setNewMenuItem({ ...newMenuItem, category: option?.value! })}
                    >
                        <SelectTrigger className='w-full'>
                            <SelectValue
                                className='text-foreground text-sm native:text-lg'
                                placeholder='Select a category'
                            />
                        </SelectTrigger>
                        <SelectContent insets={contentInsets} className='w-full overflow-scroll'>
                            <ScrollView stickyHeaderIndices={[0]}>
                                <Input value={categorySearchQuery} onChangeText={setCategorySearchQuery} style={{backgroundColor: 'white'}} />

                                {
                                    categorySearchResults.sort((a, b) => a.localeCompare(b)).map((category) => (
                                        <SelectItem key={category} label={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))
                                }
                            </ScrollView>
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
                        className="w-full border-b"
                        defaultValue={{ label: newMenuItem.preparation_time, value: newMenuItem.preparation_time }}
                        onValueChange={(option) => setNewMenuItem({ ...newMenuItem, preparation_time: option?.value! })}
                    >
                        <SelectTrigger className='w-full'>
                            <SelectValue
                                className='text-foreground text-sm native:text-lg'
                                placeholder='Select a preparation time'
                            />
                        </SelectTrigger>
                        <SelectContent insets={contentInsets} className='w-full overflow-scroll'>
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
                                <ShadcnButton className="rounded-full h-7 w-7 p-2" size="icon">
                                    <Plus className="w-2 h-2" stroke="white"/>
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
                            newMenuItem.add_ons?.sort((a, b) => a.foodName.localeCompare(b.foodName)).map((addon) => (
                                <AlertDialog key={addon.foodName}>
                                    <AlertDialogTrigger asChild>
                                        <TouchableOpacity className="w-full flex flex-row items-center justify-between py-3">
                                            <Text>{addon.foodName}</Text>
                                            <View className="flex flex-row gap-3">
                                                <Text>NGN {addon.price}</Text>
                                                <TouchableOpacity onPress={(e) => {
                                                    e.stopPropagation();
                                                    removeAddon(addon.foodName)
                                                }}>
                                                    <Trash stroke={primary} className="h-3 w-3"/>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    </AlertDialogTrigger>

                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Edit Add on</AlertDialogTitle>
                                        </AlertDialogHeader>

                                        <View>
                                            <Input
                                                label="Add on Name"
                                                placeholder="Enter Add on Name"
                                                onChangeText={(text) => setNewAddon({ ...addon, foodName: text })}
                                                defaultValue={addon.foodName}
                                            />

                                            <Input
                                                label="Add on Price"
                                                placeholder="Enter Add on Price"
                                                onChangeText={text => setNewAddon({ ...addon, price: Number(text) })}
                                                defaultValue={String(addon.price)}
                                                keyboardType="numeric"
                                            />
                                        </View>

                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                <Text>Cancel</Text>
                                            </AlertDialogCancel>

                                            <AlertDialogAction onPress={() => editAddon(addon.foodName)}>
                                                <Text>Save</Text>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>

                                
                                
                                </AlertDialog>
                            ))
                        }

                    </View>
                </View>
                
                <View className="w-full px-4 mt-4">
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


                <View className="flex flex-col items-center gap-5 px-3 w-full mt-20">
                    <ShadcnButton onPress={disableItem} className="w-full rounded-[50px]">
                        <Text>Disable Item</Text>
                    </ShadcnButton>

                    <ShadcnButton onPress={removeItem} variant="outline" className="w-full rounded-[50px]">
                        <Text>Delete Item</Text>
                    </ShadcnButton>
                </View>
            </ScrollView>

        </Page>
    )
}