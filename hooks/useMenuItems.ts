import { supabase } from "~/utils/supabase";
import useResturant from "./useResturant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { CreateMenuItemData, MenuItem } from "~/utils/types";
import { groupArrayBy } from "~/utils/functions";



export default function useMenuItems() {
    const { resturant } = useResturant();
    const queryClient = useQueryClient();


    async function createMenuItemInSupabase(data: CreateMenuItemData) {
        const menuItem = {
            ...data,
            resturant_id: resturant?.id
        }
        const { error } = await supabase.from('menu_items').insert([menuItem]);
        if(error) throw new Error(error.message)
    }

    async function getMenuItemsByResturantId() {
        const { data, error } = await supabase.from('menu_items').select('*').eq('resturant_id', resturant?.id)
        if(error) throw new Error(error.message);

        const menuItems = groupArrayBy(data as MenuItem[], "category") as Record<string, MenuItem[]>
        
        return menuItems;
    }

    async function updateMenuItemInSupabase(data: MenuItem) {
        const { id, ...rest } = data;
        const { error } = await supabase.from('menu_items').update(rest).eq('id', id).select()

        if(error) throw new Error(error.message)

    }

    async function deleteMenuItemInSupabase(id: number) {
        await supabase.from('menu_items').delete().eq('id', id)
    }

    const { isLoading, data: menuItems, error } = useQuery({
        queryKey: ["menu-items"],
        queryFn: getMenuItemsByResturantId,
        enabled: !!resturant?.id
    })

    function getSingleMenuItem(id: number, category: string) {
        const menuItem: MenuItem = menuItems![category].find(item => item.id === id) as MenuItem;
        return menuItem;
    }


    const { mutateAsync: createMenuItem } = useMutation({
        mutationFn: createMenuItemInSupabase,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["menu-items"] })
            return Toast.show({
                text1: "Menu Item created successfully",
                type: "success"
            })
        },
        onError: () => {
            return Toast.show({
                text1: "Menu Item creation failed",
                type: "error"
            })
        }
    })

    const { mutateAsync: updateMenuItem } = useMutation({
        mutationFn: updateMenuItemInSupabase,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["menu-items"] })
            return Toast.show({
                text1: "Menu Item updated successfully",
                type: "success"
            })
        },
        onError: () => {
            return Toast.show({
                text1: "Menu Item update failed",
                type: "error"
            })
        }
    })

    const { mutateAsync: deleteMenuItem } = useMutation({
        mutationFn: deleteMenuItemInSupabase,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["menu-items"] })
            return Toast.show({
                text1: "Menu Item deleted successfully",
                type: "success"
            })
        },
        onError: () => {
            return Toast.show({
                text1: "Menu Item delete failed",
                type: "error"
            })
        }
    })

    return {
        createMenuItem,
        getSingleMenuItem,
        updateMenuItem,
        deleteMenuItem,


        menuItems,
        isLoading,
        error
    }


}