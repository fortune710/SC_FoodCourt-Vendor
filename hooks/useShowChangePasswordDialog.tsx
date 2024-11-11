import { useQuery } from "@tanstack/react-query"
import { supabase } from "~/utils/supabase"
import { SupabaseTables } from "~/utils/types"
import useCurrentUser from "./useCurrentUser"
import axios from "axios";


export default function useShowChangePasswordDialog(){
    const { currentUser } = useCurrentUser();
  
    const { data: showDialog, isLoading, error } = useQuery({
        queryKey: ['show-dialog'],
        queryFn: async () => {
            const [{ data }, featureFlagOn] = await Promise.all([
                await supabase.from(SupabaseTables.Profiles)
                .select("change_password")
                .eq('id', currentUser?.id),
                (await axios.get("https://food-court-webhook-server.vercel.app/flag")).data

            ])

            return data![0].change_password && featureFlagOn.data
        }
    })

    return {
        showDialog,
        isLoading,
        error
    }
}