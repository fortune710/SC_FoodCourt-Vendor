import Header from "~/components/header";
import Page from "~/components/page";
import { Text } from "~/components/ui/text";
import { ActivityIndicator, FlatList, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import useRestaurantStaff from "~/hooks/useRestaurantStaff";
import { Image } from "react-native";
import { Plus } from "lucide-react-native";
import useThemeColor from "~/hooks/useThemeColor";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

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
                            style={{marginVertical: 16}}
                        >
                            <Avatar className="w-16 h-16" alt={`${item.full_name}'s Avatar`}>
                                <AvatarFallback>
                                    <Text>{item.full_name.at(0)}</Text>
                                </AvatarFallback>
                                <AvatarImage source={{ uri: item.image_url }} />
                            </Avatar>
                            <View>
                                <Text style={{fontSize: 18, fontWeight: 500}}>{item.full_name}</Text>
                                <Text>{item.position}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    style={{ paddingHorizontal: 24 }}
                />
                
            }
            
        </Page>
    )
}