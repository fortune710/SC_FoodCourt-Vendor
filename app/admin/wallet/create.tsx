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

export default function CreatePaymentProfile() {
    //const { getCurrentUser } = useAuth();
    const { createResturant } = useResturant();
    const primary = useThemeColor({}, "primary");
    const router = useRouter();
    const params = useLocalSearchParams();

    const [businessName, setBusinessName] = useState("");
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
                business_name: businessName,
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

            <Input
                inputContainerStyle={styles.inputContainer}
                placeholder='Business Name'
                leftIcon={<UserRound stroke={primary} />}    
                value={businessName}
                onChangeText={(text) => setBusinessName(text)}  
            />

            <Input
                inputContainerStyle={styles.inputContainer}
                placeholder='Account Number'
                leftIcon={<UserRound stroke={primary} />}    
                value={accountNumber}
                onChangeText={(text) => setAccountNumber(text)}    
            />

            <View className="flex flex-row gap-3 mx-3 px-3 py-2.5 items-center rounded-[35px] border border-primary">
                <Banknote stroke={primary}/>
                <Select 
                    className="w-5/6"
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


            <Button 
                disabled={loading} 
                onPress={handleCreatePaymentProfile}
                buttonStyle={{ marginHorizontal: 12, borderRadius: 32, marginTop: 50 }}
            >
                <Text className="text-white">Confirm Payment Details</Text>
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
        paddingVertical: 5
    },
})