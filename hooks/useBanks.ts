import { useQuery } from "@tanstack/react-query";
import Paystack from "~/services/paystack";

export default function useBanks() {
    return useQuery({
        queryKey: ["banks"],
        queryFn: async () => await Paystack.listBanks()
    })
}