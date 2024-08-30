import Header from "~/components/header";
import Page from "~/components/page";
import { Text } from "~/components/ui/text";
import { ActivityIndicator, FlatList, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import useRestaurantStaff from "~/hooks/useRestaurantStaff";
import { Image } from "react-native";
import { Plus } from "lucide-react-native";
import useThemeColor from "~/hooks/useThemeColor";

export default function StaffPage() {
    const router = useRouter();	
    const primary = useThemeColor({}, "primary");

    const { staff, isLoading } = useRestaurantStaff();

    return (
        <Page>
            <Header 
                headerTitle="Staff"
                rightIcon={
                    <TouchableOpacity onPress={() => router.push('/admin/staff/create')}>
                        <Plus size={30} stroke={primary}/>
                    </TouchableOpacity>
                }
            />

            {
                isLoading ? <ActivityIndicator/> :
                <FlatList
                    data={staff}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            onPress={() => router.push(`/admin/staff/${item.id}`)} 
                            className="flex flex-row items-center gap-4"
                        >
                            <Image source={{ uri: item.image_url }} style={{ width: 100, height: 100, borderRadius: 999 }} />
                            <View>
                                <Text>{item.full_name}</Text>
                                <Text>{item.position}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
                
            }
            
        </Page>
    )
}