import Header from "~/components/header";
import Page from "~/components/page";
import { Text } from "~/components/ui/text";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function StaffPage() {
    const router = useRouter();	
    return (
        <Page>
            <Header headerTitle="Staff"/>
            <TouchableOpacity onPress={() => router.push('/admin/staff/1')}>
                <Text>Staff</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/admin/staff/create')}>
                <Text>create staff</Text>
            </TouchableOpacity>
            
        </Page>
    )
}