import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/utils/supabase";
import useRestaurantStaff from "./useRestaurantStaff";
import { SupabaseTables } from "~/utils/types";

export default function useStaffProfile(profileId: string) {
    const { staff } = useRestaurantStaff();

    async function getStaffProfile() {
        const { data, error } = await supabase.from(SupabaseTables.Profiles).select('*')
            .eq('id', profileId).single()
        
        if (error) throw new Error(error.message)

        const position = staff?.find(staffMember => staffMember.id === profileId)?.position;

        const res = {
            ...data,
            position
        }

        return res as {
            id: string,
            full_name: string,
            image_url: string,
            username: string,
            email: string
            phone_number: string,
            position: string
        }
    }

    const { isLoading, data: profile, error } = useQuery({
        queryKey: ["profile", profileId],
        queryFn: getStaffProfile,
        enabled: !!profileId
    })

    return {
        profile,
        isLoading,
        error
    }
}