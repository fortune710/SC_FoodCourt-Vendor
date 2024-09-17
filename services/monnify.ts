import axios from "axios";
import { ResturantData } from "~/utils/types";

interface TransferData {
    walletAccountNumber: string,
    receiverAccountNumber: string,
    receiverBankCode: string,
    reference: string,
    customerName: string,
    customerEmail: string,
    amount: number
}

interface MonnifyTransfer extends Pick<TransferData, 'amount'|'reference'>{
    narration: string,
    sourceAccountNumber: string,
    destinationAccoutnNumber: string,
    destinationBankCode: string
}

const Monnify = {
    apiKey: "",
    api: axios.create({
        baseURL: "",
        headers: {
            "Authorization": `Basic ${Buffer.from('ApiKey:'+"")}`
        }
    }),
    createWallet: async function (restaurant: ResturantData, bvn: string) {
        const response = await this.api.post('/api/v1/disbursements/wallet', {
            walletReference: "Wallet-"+restaurant.name.replaceAll(" ", "-"),
            walletName: `${restaurant.name} Wallet`,
            customerName: restaurant.name,
            //customerEmail: "",
            bvn,
        })
        return response.data.responseBody as {
            accountNumber: string,
            accountName: string,
            walletReference: string
        }
    },
    getWalletBalance: async function (accountNumber: string, walletReference: string) {
        const response = await this.api.get('/api/v1/disbursements/wallet/balance', {
            params: {
                accountNumber
            }
        })

        return response.data.responseBody.availableBalance
    },
    login: async function () {
        const response = await this.api.post('/api/v1/auth/login');
        return response.data.responseBody.accessToken as string;
    },
    initiateTransfer: async function (data: MonnifyTransfer) {
        const response = await this.api.post('/api/v2/disbursements/single', {
            ...data,
            currency: "NGN"
        });
        return response.data.responseBody
    },
    refundCustomer: async function (data: TransferData) {
        const transferData: MonnifyTransfer = {
            amount: data.amount,
            sourceAccountNumber: data.walletAccountNumber,
            destinationAccoutnNumber: data.receiverAccountNumber,
            destinationBankCode: data.receiverBankCode,
            narration: "Refund for " + data.customerName,
            reference: "Transfer_" + new Date().toISOString()
        }
        return this.initiateTransfer(transferData)
    },
    withdrawFromWallet: async function (data: Omit<TransferData, 'customerEmail'>) {
        const transferData: MonnifyTransfer = {
            amount: data.amount,
            sourceAccountNumber: data.walletAccountNumber,
            destinationAccoutnNumber: data.receiverAccountNumber,
            destinationBankCode: data.receiverBankCode,
            narration: "Withdrawal to " + data.customerName + " bank account",
            reference: "Transfer_" + new Date().toISOString()
        }
        return this.initiateTransfer(transferData)
    }
}

export default Monnify;