import { Input } from "@rneui/themed";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Banknote, UserRound } from "lucide-react-native";
import { useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Page from "~/components/page";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Text } from "~/components/ui/text";
import useBanks from "~/hooks/useBanks";
import useResturant from "~/hooks/useResturant";
import useThemeColor from "~/hooks/useThemeColor";
import { Button } from "@rneui/themed";
import useCreatePaymentProfile from "~/hooks/useCreatePaymentProfile";
import Header from "~/components/header";

export default function CreatePaymentProfile() {
    //const { getCurrentUser } = useAuth();
    const { createResturant } = useResturant();
    const primary = useThemeColor({}, "primary");
    const router = useRouter();
    const params = useLocalSearchParams();

    const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [bankCode, setBankCode] = useState("");

    const insets = useSafeAreaInsets();
    const { isLoading, data: banks } = useBanks();
    const { createPaymentProfile, loading } = useCreatePaymentProfile();



    const contentInsets = {
      top: insets.top,
      bottom: insets.bottom,
      left: 12,
      right: 12,
    };
  


    const handleCreatePaymentProfile = async () => {
        try {
            await createPaymentProfile({
                business_name: accountName,
                bank_code: bankCode,
                percentage_charge: 5,
                account_number:  accountNumber
            })
            return router.back()
        } catch {

        }
    }


    return (
        <Page>
            <View className="justify-center flex-row py-7">
                <Text className="text-2xl">Add Payment Details</Text>
            </View>

            <View style={[styles.inputContainer, {marginHorizontal: 10, marginBottom: 24}]}>
                <Select 
                    className="w-6/6"
                    disabled={isLoading}
                    onValueChange={(option) => setBankCode(option?.value!)}
                >
                    <SelectTrigger className='w-full'>
                        <SelectValue
                            className='text-foreground text-sm native:text-lg'
                            placeholder='Select a Bank'
                        />
                    </SelectTrigger>

                    <SelectContent insets={contentInsets} className='w-full'>
                        <ScrollView>
                            {
                                banks?.map((bank) => (
                                <SelectItem 
                                key={bank.name + bank.code} 
                                    label={bank.name} 
                                    value={bank.code}
                                    >
                                    {bank.name}
                                </SelectItem>
                                ))
                            }
                        </ScrollView>
                    </SelectContent>

                </Select>     

            </View>
            
            <Input
                inputContainerStyle={styles.inputContainer}
                placeholder='Account Number'
                value={accountNumber}
                onChangeText={(text) => setAccountNumber(text)}    
            />

            <Input
                inputContainerStyle={styles.inputContainer}
                placeholder='Account Name'
                value={accountName}
                // readOnly
                onChangeText={(text) => setAccountName(text)}  
            />

            <Button 
                disabled={loading} 
                onPress={handleCreatePaymentProfile}
                buttonStyle={{ marginHorizontal: 12, borderRadius: 32, marginTop: 50 }}
            >
                <Text className="text-white text-xl">Confirm Payment Details</Text>
            </Button>

            <Button 
                disabled={loading} 
                onPress={()=> console.log('ok')} //it should send back to transaction page
                buttonStyle={{ marginHorizontal: 12, borderRadius: 32, marginTop: 20, borderWidth: 1, backgroundColor: '#fff' }}
            >
                <Text className="text-primary text-xl">Cancel</Text>
            </Button>

        </Page>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1, 
        paddingHorizontal: 20, 
        borderRadius: 32, 
        borderColor: '#f72f2f',
        paddingVertical: 8
    },
})