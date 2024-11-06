import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { supabase } from "~/utils/supabase";

export default function useCurrentUser() {
    const { getCurrentUser: currentUserFunction } = useAuth();

    const updateUser = async() => {
        await supabase.auth.updateUser({})
    }

    const getCurrentUser = async () => {
        const { data } = await currentUserFunction();
        return {
            id: data.user?.id,
            user_type: data.user?.user_metadata.user_type,
            full_name: data.user?.user_metadata.full_name,
            image_url: data.user?.user_metadata.image_url,
            username: data.user?.user_metadata.username,
            email: data.user?.email,
            phone_number: data.user?.user_metadata.phone_number
        };
    }

    const { data: currentUser, isLoading, error } = useQuery({
        queryKey: ["current-user"],
        queryFn: getCurrentUser
    })

    return {
        getCurrentUser,

        currentUser,
        isLoading,
        error
    }
}