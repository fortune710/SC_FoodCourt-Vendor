import { useQuery } from "@tanstack/react-query";
import Paystack from "~/services/paystack";

export default function useAccountNumber(accountNumber: string, bankCode: string) {
    return useQuery({
        queryKey: ["account", accountNumber, bankCode],
        queryFn: async () => {
            return await Paystack.verifyAccountNumber(accountNumber, bankCode);
        },
        enabled: !!bankCode && accountNumber.length === 10
    })
}