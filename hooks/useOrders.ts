import { supabase } from "~/utils/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import useResturant from "./useResturant";
import useCurrentUser from "./useCurrentUser";

interface Order {
    id: number;
    total_amount: number;
    order_date: string;
    status: number;
    notes: string;
    order_items: number[];
    user_paid: boolean;
    customer_name: string;
    start_time: number
    preparation_time: number
}

export default function useOrders() {
    const queryClient = useQueryClient();
    const { resturant } = useResturant();
    const { currentUser } = useCurrentUser();

   
    async function getOrders() {
        if (currentUser?.user_type === "admin") {
            const { data, error } = await supabase
                .from('orders')
                .select(`
                    id,
                    status,
                    total_amount,
                    order_date,
                    customer_name,
                    preparation_time,
                    start_time,
                    items:order_items (
                        id,
                        quantity,
                        addon_name,
                        addon_price,
                        menu_item:menu_item_id (name, price)
                    )
                `)
                .eq('restaurant_id', resturant?.id)
                .order('order_date', { ascending: false });
            if (error) throw new Error(error.message);
            return data;

        }

        const { data, error } = await supabase
            .from('orders')
            .select(`
                id,
                status,
                total_amount,
                order_date,
                customer_name,
                preparation_time,
                start_time,
                items:order_items (
                    id,
                    quantity,
                    addon_name,
                    addon_price,
                    menu_item:menu_item_id (name, price)
                )
            `)
            .eq('restaurant_id', resturant?.id)
            .in('assigned_staff', [currentUser?.id, null])
            .order('order_date', { ascending: false });

        if (error) throw new Error(error.message);
        return data;
    }

    async function updateOrderInSupabase(order: Partial<Order>) {
        const { id, ...updateData } = order;
        const { error } = await supabase
            .from('orders')
            .update(updateData)
            .eq('id', id)
            .select();

        console.log(error)
        if (error) throw new Error(error.message);
    }

    const { isLoading, data: orders, error } = useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
    });

    const { mutateAsync: updateOrder } = useMutation({
        mutationFn: updateOrderInSupabase,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            Toast.show({
                text1: "Order updated successfully",
                type: "success"
            });
        },
        onError: (error) => {
            Toast.show({
                text1: "Order update failed",
                text2: error.message,
                type: "error"
            });
        }
    });

    function getOrderById(id: string) {
        return orders?.find(order => order.id === id);
    }

    return {
        orders,
        isLoading,
        error,
        updateOrder,
        getOrderById
    };
}