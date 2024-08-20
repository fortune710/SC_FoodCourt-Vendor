import Header from "components/header,";
import Page from "components/page";
import ContactOption from "components/support/contact";
import BackArrowButton from "~/components/custom/back-arrow-button";
import BackButton from "~/components/custom/back-button";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import useThemeColor from "hooks/useThemeColor";
import { Edit, Lock, Mail, Phone } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Text } from "@rneui/themed";
import { globalStyles } from "constants/Styles";

export default function ProfilePage() {
    const primary = useThemeColor({}, "primary");
    const router = useRouter()

    return (
        <Page>
            <View style={[globalStyles.flexItemsCenter, globalStyles.justifyBetween]}>
                <BackArrowButton onPress={() => router.back()} color="#fff"/>
                <TouchableOpacity onPress={() => router.push("/settings/profile/edit")}>
                    <Edit stroke="#fff"/>
                </TouchableOpacity>
            </View>

            <View style={styles.banner}/>

            <View>
                <Text>Naomi Andrews</Text>
                <Image 
                    source={{ uri: require("../../../assets/images/food-court-avatar.png") }} 
                    style={{ width: 120, height: 120, zIndex: 20 }}
                />
            </View>
            <ContactOption
                title="Email"
                subtitle="example@email.com"
                onPress={() => {/* Handle email press */}}
                icon={<Mail stroke={primary}/>}
            />

            <ContactOption
                title="Phone Number"
                subtitle="+234 804 225 8973"
                onPress={() => {/* Handle email press */}}
                icon={<Phone stroke={primary}/>}
            />
            <ContactOption
                title="Password"
                subtitle="eample@email.com"
                onPress={() => {/* Handle email press */}}
                icon={<Lock stroke={primary}/>}
            />

        </Page>
    )
}

const styles = StyleSheet.create({
    banner: {
        backgroundColor: "#F72F2F",
        zIndex: -20,
        position: "absolute",
        top: 0,
        width: "100%",
        height: 200,
    }
})