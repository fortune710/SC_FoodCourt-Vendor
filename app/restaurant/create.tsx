import { Input } from "@rneui/themed";
import Page from "~/components/page";
import useAuth from "~/hooks/useAuth";

import { StyleSheet, View } from "react-native";
import { UserRound } from "lucide-react-native";
import { useState } from "react";
import useThemeColor from "~/hooks/useThemeColor";
import { Text } from "~/components/ui/text";
import useResturant from "~/hooks/useResturant";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button } from "~/components/ui/button";

export default function CreateResturant() {
    //const { getCurrentUser } = useAuth();
    const { createResturant } = useResturant();
    const primary = useThemeColor({}, "primary");
    const router = useRouter();
    const params = useLocalSearchParams();

    const [resturantName, setResturantName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleCreateResturant = async () => {

        //const { data } = await getCurrentUser();

        if(!params.admin_id) return;

        try {
            await createResturant({
                admin_id: params.admin_id as string,
                name: resturantName,
                phone_number: phoneNumber
            })
            return router.push('/orders');
        } catch (error) {
            console.log(error);
        }



    }


    return (
        <Page>
            <View>
                <Text>Create New Resturant</Text>
            </View>

            <Input
                inputContainerStyle={styles.inputContainer}
                placeholder='Resturant Name'
                leftIcon={<UserRound stroke={primary} />}    
                value={resturantName}
                onChangeText={(text) => setResturantName(text)}    
            />

            
            <Input
                inputContainerStyle={styles.inputContainer}
                placeholder='Phone Number'
                leftIcon={<UserRound stroke={primary} />}    
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}  
            />

            <Input
                inputContainerStyle={styles.inputContainer}
                placeholder='Website Link'
                leftIcon={<UserRound stroke={primary} />}    
                value={resturantName}
                onChangeText={(text) => setResturantName(text)}    
            />

            <Button onPress={handleCreateResturant}>
                <Text>Create Resturant</Text>
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