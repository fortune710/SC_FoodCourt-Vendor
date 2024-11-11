import { useState } from 'react';
import { supabase } from "~/utils/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import useResturant from './useResturant';

interface StockItem {
  id: number;
  name: string;
  quantity: number;
  updated_at: string;
}

interface UpdateStockData {
  id: number;
  quantity: number;
}

export default function useStock() {
  const queryClient = useQueryClient();
  const [updateError, setUpdateError] = useState<string | null>(null);
  const { resturant } = useResturant();

  async function getLowStockItems() {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .lt('quantity', 15)
      .eq('resturant_id', resturant?.id!)
      .order('quantity', { ascending: true });

    console.log(data, error, "stock")

    if (error) throw new Error(error.message);
    return data as StockItem[];
  }

  async function updateStockQuantity({ id, quantity }: UpdateStockData) {
    const { error } = await supabase
      .from('menu_items')
      .update({ 
        quantity, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  const { data: lowStockItems, isLoading, error } = useQuery({
    queryKey: ["low-stock-items"],
    queryFn: getLowStockItems,
  });

  const { mutateAsync: updateStock } = useMutation({
    mutationFn: updateStockQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["low-stock-items"] });
      Toast.show({
        text1: "Stock quantity updated successfully",
        type: "success"
      });
    },
    onError: (error: Error) => {
      setUpdateError(error.message);
      Toast.show({
        text1: "Failed to update stock quantity",
        text2: error.message,
        type: "error"
      });
    }
  });

  return {
    lowStockItems,
    isLoading,
    error,
    updateStock,
    updateError,
  };
}