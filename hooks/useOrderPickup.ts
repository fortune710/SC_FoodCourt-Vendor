import { useState } from 'react';
import { supabase } from "~/utils/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { OrderStatus } from '~/utils/types';
import useCurrentUser from './useCurrentUser';

interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: number;
  quantity: number;
  menu_item: {
    name: string;
    price: number;
  };
}

interface Order {
  id: string;
  status: number;
  total_amount: number;
  order_date: string;
  customer_name: string;
  order_items: OrderItem[];
}

export default function useOrderPickup(orderIds: number[]) {
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();
  const [updateError, setUpdateError] = useState<string | null>(null);

  async function getOrdersForPickup() {
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
      .in('id', orderIds)
      .neq('status', OrderStatus.Collected)
      .order('order_date', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  async function markAsCollected(orderId: string) {
    const { error } = await supabase
        .from('orders')
        .update({ 
            status: OrderStatus.Collected,
            collected_by: currentUser?.full_name 
        })
        .eq('id', orderId).select();

    if (error) throw new Error(error.message);
  }

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["order-pickup", ...orderIds],
    queryFn: getOrdersForPickup,
    enabled: orderIds.length > 0,
  });

  const { mutateAsync: markOrderAsCollected } = useMutation({
    mutationFn: markAsCollected,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-pickup", orderIds] });
      // Also invalidate the order status queries if you're using useOrderStatus hook
      queryClient.invalidateQueries({ queryKey: ["order-status"] });
      Toast.show({
        text1: "Order marked as collected",
        type: "success"
      });
    },
    onError: (error: Error) => {
      setUpdateError(error.message);
      Toast.show({
        text1: "Failed to mark order as collected",
        text2: error.message,
        type: "error"
      });
    }
  });

  return {
    orders,
    isLoading,
    error,
    markOrderAsCollected,
    updateError,
  };
}