import axios from "axios";
import { ResturantData } from "~/utils/types";
import { Buffer } from 'buffer'

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
const apiKey = "MK_TEST_VEKXX9ZTCZ"
const secretKey = "CUQVUYUPD03UD8D0URT3SZGXM4SA8YPL"

const Monnify = {
    accessToken: "",
    api: axios.create({
        baseURL: "https://sandbox.monnify.com",
        headers: {
            "Authorization": `Basic ${btoa(`${apiKey}:${secretKey}`)}`
        }
    }),
    createWallet: async function (restaurant: ResturantData, bvn: string) {
        try {
            const response = await this.api.post('/api/v1/disbursements/wallet', {
                walletReference: "Wallet-"+restaurant.name.replaceAll(" ", "-"),
                walletName: `${restaurant.name} Wallet`,
                customerName: restaurant.name,
                customerEmail: "fotunealebiosu710@gmail.com",
                bvnDetails: {
                    bvn,
                    bvnDateOfBirth: "2003-08-05"
                }
            })
    
            console.log(response.data)
            const walletDetails = response.data.responseBody as {
                accountNumber: string,
                accountName: string,
                walletReference: string,
                topUpAccountDetails: {
                    accountNumber: string,
                    bankCode: string,
                    bankName: string
                },
            }
            //"3169983391"
            const subAccountResponse = await this.api.post('/api/v1/sub-accounts', {
                currencyCode: 'NGN',
                accountNumber: "5612618441",
                bankCode: "001",
                customerEmail: "fortunealebiosu710@gmail.com",
                defaultSplitPercentage: 95.00
            })

            return subAccountResponse.data.responseBody as {
                subAccountCode: string
            }

        }
        catch (e: any) {
            console.log(e.message)
        }
    },
    getWalletBalance: async function (accountNumber: string, walletReference: string) {
        const response = await this.api.get('/api/v1/disbursements/wallet/balance', {
            params: {
                accountNumber,
                walletReference
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