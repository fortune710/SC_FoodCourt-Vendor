import Toast from "react-native-toast-message"
import { supabase } from "~/utils/supabase"

interface ResturantData {
    admin_id: string,
    name: string,
    phone_number?: string,
    website_link?: string
}

export default function useResturant() {
    const getResturantByAdminId = async (admin_id: string) => {
        const { data, error } = await supabase.from('restaurants').select('*').eq('admin_id', admin_id)
        
        if(error) {
            console.log(error.message)
            throw new Error(error.message)
        }

        return data
    }

    const createResturant = async (data: ResturantData) => {
        try {
            const existingRestaurant = await getResturantByAdminId(data.admin_id)
            if(existingRestaurant.length > 0) {
                Toast.show({
                    text1: "Resturant already exists",
                    type: "error"
                })
                return existingRestaurant[0]
            }

            const { data: res } = await supabase.from('restaurants').insert([data])
            return Toast.show({
                text1: "Resturant created successfully",
                type: "success"
            })
        } catch (e) {
            return Toast.show({
                text1: "Resturant creation failed",
                type: "error"
            })
        }
    }


    return {
        createResturant,
        getResturantByAdminId
    }
}
