import { useLocalSearchParams, useRouter } from "expo-router";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import Page from "~/components/page";
import useResturant from "~/hooks/useResturant";
import { Button, Input } from '@rneui/themed';
import { Link, Phone, UserRound } from "lucide-react-native";
import { useState } from "react";
import useThemeColor from "~/hooks/useThemeColor";
import { verticalScale } from "react-native-size-matters";

export default function CreateRestaurant() {
    const { createResturant: create } = useResturant();
    const { admin_id } = useLocalSearchParams();
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [website, setWebsite] = useState("");
    const primary = useThemeColor({}, "primary")
    const router = useRouter();


    const createResturant = async () => {
        await create({
            admin_id: admin_id as string,
            name,
            phone_number: phoneNumber,
            website_link: website,
        })
        return router.push('/admin')
    }

    return (
        <Page>
            <KeyboardAvoidingView>
                <Input
                    inputContainerStyle={styles.inputContainer}
                    placeholder='Name'
                    leftIcon={
                        <UserRound stroke={primary} />
                    }    
                    value={name}
                    onChangeText={(text) => setName(text)}    
                />

                <Input
                    inputContainerStyle={styles.inputContainer}
                    placeholder='Phone Number'
                    leftIcon={
                        <Phone stroke={primary} />
                    }    
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}    
                />

                <Input
                    inputContainerStyle={styles.inputContainer}
                    placeholder='Phone Number'
                    leftIcon={
                        <Link stroke={primary} />
                    }    
                    value={website}
                    onChangeText={(text) => setWebsite(text)}    
                />


            </KeyboardAvoidingView>
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
    moveToOtherPage: {
        borderWidth: 1, 
        borderRadius: 32, 
        borderColor: '#f72f2f',
        marginTop: 25,
        paddingVertical: 21,
        paddingHorizontal: 15,
        color: '#f72f2f',
        textAlign: 'center',
        width: '80%'
    },
    mainAction: {
        borderRadius: 28,
        paddingHorizontal: 50,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'

    },
    formContainer: {
        marginVertical: 12,
        paddingHorizontal: 8
    },

    actions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: verticalScale(25)
    },
    checkboxContainer: { 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    checkbox: { margin: 0, padding: 0 }
})