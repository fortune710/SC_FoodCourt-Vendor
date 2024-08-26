import Toast from "react-native-toast-message"
import { supabase } from "~/utils/supabase"
import useCurrentUser from "./useCurrentUser"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface ResturantData {
    admin_id: string,
    name: string,
    phone_number?: string,
    website_link?: string
}

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

        return data
    }

    const createResturantInSupabase = async (data: ResturantData) => {
        const existingRestaurant = await getResturantByAdminId(data.admin_id)
        if(existingRestaurant.length > 0) {
            return existingRestaurant[0]
        }

        await supabase.from('restaurants').insert([data])
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




    return {
        createResturant,
        getResturantByAdminId,

        isLoading,
        resturant,
        error
    }
}
