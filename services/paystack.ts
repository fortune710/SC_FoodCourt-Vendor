import axios from "axios";
import { ICreateSubaccount } from "~/utils/types";



const Paystack = {
    api: axios.create({
        baseURL: "https://api.paystack.co",
        headers: {
            "Authorization": `Bearer ${process.env.EXPO_PUBLIC_PAYSTACK_KEY!}`,
            "Content-Type": "application/json"
        }
    }),
    createSubaccount: async function (data: ICreateSubaccount) {
        const response = await this.api.post("/subaccount", {
            ...data,
            settlement_bank: data.bank_code
        })

        return response.data.data as {
            subaccount_code: string,
            account_number: string
        }
    },
    listBanks: async function () {
        const response = await this.api.get("/bank", {
            params: { country: "nigeria", perPage: 100 }
        })

        return response.data.data as {
            name: string,
            code: string
        }[]
    },
    verifyAccountNumber: async function (accountNumber: string, bankCode: string) {
        const response = await this.api.get("/bank/resolve", {
            params: { account_number: accountNumber, bank_code: bankCode }
        })

        return response.data.data as {
            account_name: string,
            bank_id: number
        }
    }
}

export default Paystack;