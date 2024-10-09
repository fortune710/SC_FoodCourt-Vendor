import { useMutation } from "@tanstack/react-query";
import Paystack from "~/services/paystack";
import { ICreateSubaccount } from "~/utils/types";
import useResturant from "./useResturant";
import Toast from "react-native-toast-message";

export default function useCreatePaymentProfile() {
    const { updateResturant } = useResturant();

    const { mutateAsync: createPaymentProfile, isPending: loading } = useMutation({
        mutationFn: async (data: ICreateSubaccount) => {
            console.log(data)
            return await Paystack.createSubaccount(data)
        },
        onSuccess: (data) => {
            return updateResturant({
                account_number: data.account_number,
                subaccount_code: data.subaccount_code 
            })
        },
        onError: (error) => {
            
            return Toast.show({
                type: "error",
                text1: error.message.includes("400") ? "Account details are invalid" :
                error.message
            })
        }
    })

    return {
        createPaymentProfile,
        loading
    }
}