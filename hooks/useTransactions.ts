import { supabase } from "~/utils/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

interface Transaction {
  id: string;
  restaurant_id: string;
  user_id: string;
  amount: number;
  created_at: string;
}

interface ProcessPayoutData {
  restaurant_id: string;
  user_id: string;
  amount: number;
}

export default function useTransactions(restaurantId: string) {
  const queryClient = useQueryClient();

  async function getTransactions() {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data as Transaction[];
  }

  async function processPayout({ restaurant_id, user_id, amount }: ProcessPayoutData) {
    // TODO: Implement API call to process the payout
    // This is where you'll add the code to call your payment processing API
    // For now, we'll just log a message
    console.log(`Processing payout of ${amount} for restaurant ${restaurant_id}`);

    // After successful API call, record the transaction in the database
    const { error } = await supabase
      .from('transactions')
      .insert({
        restaurant_id,
        user_id,
        amount: -amount, // Negative amount for payout
        created_at: new Date().toISOString(),
      });

    if (error) throw new Error(error.message);
  }

  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ["transactions", restaurantId],
    queryFn: getTransactions,
  });

  const { mutateAsync: payout } = useMutation({
    mutationFn: processPayout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions", restaurantId] });
      Toast.show({
        text1: "Payout processed successfully",
        type: "success"
      });
    },
    onError: (error: Error) => {
      Toast.show({
        text1: "Failed to process payout",
        text2: error.message,
        type: "error"
      });
    }
  });

  return {
    transactions,
    isLoading,
    error,
    payout,
  };
}