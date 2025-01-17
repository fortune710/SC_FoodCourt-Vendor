import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/utils/supabase";
import { OrderStatus, SupabaseTables } from "~/utils/types";

interface DailyOrderCount {
  label: string;
  value: number;
}

export default function useAnalytics(restaurantId: number) {
  async function getOrderCountsPast30Days(): Promise<DailyOrderCount[]> {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago

    const { data, error } = await supabase
      .from(SupabaseTables.Orders)
      .select('order_date')
      .gte('order_date', startDate.toISOString())
      .lte('order_date', endDate.toISOString())
      .eq('restaurant_id', restaurantId);

    if (error) throw new Error(error.message);

    // Create an array of dates for every 3 days in the past 30 days
    const dates: Date[] = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 3)) {
      dates.push(new Date(d));
    }

    // Count orders for each 3-day period
    const orderCounts = dates.map(date => {
      const nextDate = new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000);
      const count = data.filter(order => 
        new Date(order.order_date) >= date && 
        new Date(order.order_date) < nextDate
      ).length;

      const dateString = `${date.getDate()}/${date.getMonth() + 1}`

      return {
        label: dateString, // Format as YYYY-MM-DD
        value: count
      };
    });

    return orderCounts;
  }

  async function getTodaysOrders() {
    // Get today's date at 00:00:00
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    // Get tomorrow's date at 00:00:00
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
  
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .gte('order_date', today.toISOString())
      .lt('order_date', tomorrow.toISOString())
      .order('order_date', { ascending: false });
  
    if (error) {
      throw new Error(error.message);
    }
  
    return {
      ordersReceivedToday: data.length,
      ordersAcceptedToday: data.filter((order) => order.status >= OrderStatus.Preparing).length,
      ordersReady: data.filter((order) => order.status >= OrderStatus.Completed).length,
      ordersDelivered: data.filter((order) => order.status === OrderStatus.Collected).length,
    };
  }
  
  const { data: orderCounts, isLoading, error } = useQuery({
    queryKey: ["analytics", restaurantId],
    queryFn: getOrderCountsPast30Days,
  });

  const { data: metrics, isLoading: loadingMetrics } = useQuery({
    queryKey: ["metrics", restaurantId],
    queryFn: getTodaysOrders,
  });


  return {
    orderCounts,
    isLoading,
    error,

    metrics,
    loadingMetrics
  };
}