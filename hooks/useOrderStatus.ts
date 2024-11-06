import { useState } from 'react';
import { supabase } from "~/utils/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import useResturant from './useResturant';
import useCurrentUser from './useCurrentUser';
import { Order, OrderStatus } from '~/utils/types';


interface UpdateStatusData {
  id: number;
  status: number;
}

export default function useOrderStatus(status: number) {
  const queryClient = useQueryClient();
  const { resturant } = useResturant();
  const { currentUser } = useCurrentUser();

  let statusIds = [0];

  switch (status) {
    case OrderStatus.New:
      statusIds = [OrderStatus.New];
      break;
    case OrderStatus.Accepted:
      statusIds = [OrderStatus.Accepted, OrderStatus.Preparing];
      break;
    case OrderStatus.Completed:
      statusIds = [OrderStatus.Completed, OrderStatus.Collected];
      break;
    default:
      statusIds = [OrderStatus.New];
      break;
  }

  async function getOrdersByStatus() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .in('status', statusIds)
      .eq('restaurant_id', resturant?.id)
      //.in('assigned_staff', [currentUser?.id, null])
      .order('order_date', { ascending: true });


    if (error) throw new Error(error.message);
    return data as Order[];
  }

  async function updateOrderStatus({ id, status }: UpdateStatusData) {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["order-status", status],
    queryFn: getOrdersByStatus,
  });

  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-status", status] });
      //queryClient.invalidateQueries({ queryKey: ["order-status", variables.status] });
      Toast.show({
        text1: "Order status updated successfully",
        type: "success"
      });
    },
    onError: (error: Error) => {
      Toast.show({
        text1: "Failed to update order status",
        text2: error.message,
        type: "error"
      });
    }
  });

  return {
    orders,
    isLoading,
    error,
    updateStatus,
  };
}