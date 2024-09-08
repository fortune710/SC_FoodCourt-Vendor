import { supabase } from "~/utils/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import useResturant from "./useResturant";

interface Order {
    id: string;
    total_amount: number;
    order_date: string;
    status: number;
    notes: string;
    order_items: number[];
    user_paid: boolean;
    customer_name: string;
}

export default function useOrders() {
    const queryClient = useQueryClient();
    const { resturant } = useResturant();



    async function getOrders() {
        const { data, error } = await supabase
            .from('orders')
            .select(`
                id,
                status,
                total_amount,
                order_date,
                customer_name,
                items:order_items (
                    id,
                    quantity,
                    menu_item:menu_item_id (name, price)
                )
            `)
            .eq('resturant_id', resturant?.id)
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