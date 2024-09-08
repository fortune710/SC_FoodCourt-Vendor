import { useState } from 'react';
import { supabase } from "~/utils/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

interface Order {
  id: string;
  status: number;
  total_amount: number;
  order_date: string;
  customer_name: string;
  // Add any other relevant fields from your orders table
}

interface UpdateStatusData {
  id: string;
  status: number;
}

export default function useOrderStatus(status: number) {
  const queryClient = useQueryClient();

  async function getOrdersByStatus() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', status)
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