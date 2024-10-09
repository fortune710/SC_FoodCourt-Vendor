import Toast from "react-native-toast-message"
import { supabase } from "~/utils/supabase"
import useCurrentUser from "./useCurrentUser"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ResturantData, SupabaseTables } from "~/utils/types";



export default function useResturant() {
    const { currentUser } = useCurrentUser();
    const queryClient = useQueryClient();

    const getResturantByAdminId = async (admin_id: string) => {
        const { data, error } = await supabase.from('restaurants').select('*').eq('admin_id', admin_id).single()
        
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
        const existingRestaurant = await getResturantByAdminId(data.admin_id)
        if(existingRestaurant.length > 0) {
            return existingRestaurant[0]
        }

        await supabase.from('restaurants').insert([data])
    }

    const updateResturantInSupabase = async (data: Partial<ResturantData>) => {
        const { error } = await supabase.from(SupabaseTables.Restaurants).update(data).eq('admin_id', currentUser?.id!);
        if (error) throw new Error(error.message)
    }

    const { isLoading, data: resturant, error } = useQuery({
        queryKey: ["resturant"],
        queryFn: getResturantByAdmin,
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
