import Toast from "react-native-toast-message"
import { supabase } from "~/utils/supabase"
import useCurrentUser from "./useCurrentUser"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ResturantData, SupabaseTables } from "~/utils/types";

export default function useResturant() {
    const { currentUser } = useCurrentUser();
    const queryClient = useQueryClient();

    
  async function getRestaurantIdWithStaff(staffId: string) {
    const { data, error } = await supabase.from(SupabaseTables.RestaurantStaff)
      .select("restaurant_id")
      .eq("staff_id", staffId)
      .single();
    
    if (error) return null;

    return data.restaurant_id;
  }

    const getRestaurantByStaffId = async () => {
        const restaurantId = await getRestaurantIdWithStaff(currentUser?.id!);
        console.log(restaurantId, "in staff")
        const { data, error } = await supabase.from(SupabaseTables.Restaurants)
            .select("*")
            .eq("id", restaurantId)
            .single()

        if (error) throw new Error(error.message)
        console.log(data, "in staff")
        return data as ResturantData
    }

    const getResturantByAdminId = async (admin_id: string) => {
        const { data, error } = await supabase.from('restaurants').select('*').eq('admin_id', admin_id).single()
        
        if(error) throw new Error(error.message)
        return data
    }

    const getExistingResturantByAdminId = async (admin_id: string) => {
        const { data, error } = await supabase.from('restaurants').select('*').eq('admin_id', admin_id).limit(1)
        
        if(error) {
            console.log(error.message)
            throw new Error(error.message)
        }

        return data
    }

    const getResturantByAdmin = async () => {
        const { data, error } = await supabase.
        from('restaurants').select('*').eq('admin_id', currentUser?.id).single()
        
        if(error) throw new Error(error.message)

        return data as ResturantData
    }



    const createResturantInSupabase = async (data: ResturantData) => {
        const existingRestaurant = await getExistingResturantByAdminId(data.admin_id)
        if(existingRestaurant.length > 0) {
            return existingRestaurant[0]
        }

        const { data: restaurant, error } = await supabase.from(SupabaseTables.Restaurants).insert([data]).select('*')
        return restaurant
    }

    const updateResturantInSupabase = async (data: Partial<ResturantData>) => {
        const { error } = await supabase.from(SupabaseTables.Restaurants).update(data).eq('admin_id', currentUser?.id!);
        if (error) throw new Error(error.message)
    }

    const { isLoading, data: resturant, error } = useQuery({
        queryKey: ["resturant"],
        queryFn: async () => {
            if (currentUser?.user_type === "vendor") {
                return await getRestaurantByStaffId()
            }
            return await getResturantByAdmin()
        },
        enabled: !!currentUser?.id
    })

    const { mutateAsync: createResturant } = useMutation({
        mutationFn: createResturantInSupabase,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resturant"] })
            return Toast.show({
                text1: "Resturant created successfully",
                type: "success"
            })
        },
        onError: () => {
            return Toast.show({
                text1: "Resturant creation failed",
                type: "error"
            })
        }
    })

    const { mutateAsync: updateResturant } = useMutation({
        mutationFn: updateResturantInSupabase,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resturant"] })
            return Toast.show({
                text1: "Resturant updated successfully",
                type: "success"
            })
        },
        onError: () => {
            return Toast.show({
                text1: "Resturant update failed",
                type: "error"
            })
        }
    })





    return {
        updateResturant,

        createResturant,
        getResturantByAdminId,

        isLoading,
        resturant,
        error
    }
}
