import { Input, Text } from "@rneui/themed";
import { Image } from "expo-image";
import Page from "components/page";
import useThemeColor from "hooks/useThemeColor";
import { View } from "react-native";
import BackArrowButton from "~/components/custom/back-arrow-button";
import { useRouter } from "expo-router";
import { globalStyles } from "constants/Styles";
import Button from "~/components/custom/button";

export default function EditProfile() {
    const primary = useThemeColor({}, "primary");
    const router = useRouter()

    return (
        <Page>
            <View style={globalStyles.flexItemsCenter}>
                <BackArrowButton onPress={() => router.back()} />
                <Text>Edit Profile</Text>
            </View>

            <Image 
                source={{ uri: require("../../../assets/images/food-court-avatar.png") }} 
                style={{ width: 120, height: 120, zIndex: 20 }}
            />

            <Text>Naomi Andrews</Text>

            <Input
                label="Phone Number"
                labelStyle={{ color: primary }}
                placeholder="example@email.com"
            />
            <Input
                label="Password"
                labelStyle={{ color: primary }}
                placeholder="example@email.com"
                secureTextEntry={true}
            />
            <Input
                label="Confirm Password"
                labelStyle={{ color: primary }}
                placeholder="example@email.com"
                secureTextEntry={true}
            />
            
            <Button>
                <Text style={{ color: "#fff", fontWeight: "600" }}>Update Profile</Text>
            </Button>
        </Page>
    )
}