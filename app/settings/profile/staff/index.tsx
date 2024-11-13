import Header from "~/components/header";
import Page from "components/page";
import ContactOption from "components/support/contact";
import BackArrowButton from "~/components/custom/back-arrow-button";
import BackButton from "~/components/custom/back-button";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import useThemeColor from "hooks/useThemeColor";
import { BrickWall, Edit, Lock, Mail, Phone } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View ,  SafeAreaView} from "react-native";
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { scale } from "react-native-size-matters";

import { Text } from "@rneui/themed";
import { globalStyles } from "constants/Styles";
import useCurrentUser from "~/hooks/useCurrentUser";

interface ProfileItemProps {
    icon: React.ComponentProps<typeof Ionicons>['name'];
    label: string;
    value: string;
  }

const ProfileItem: React.FC<ProfileItemProps> = ({ icon, label, value }) => (
    <View style={styles.profileItem}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color="#FF3B30" />
      </View>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
  


export default function ProfilePage() {
  const primary = useThemeColor({}, "primary");
  const router = useRouter();
  const { currentUser } = useCurrentUser();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F72F2F" barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={() => router.push("/settings/profile/staff/edit")}>
          <Ionicons name="pencil" size={24} color="white" />
        </TouchableOpacity>
      </View>
    
      <View style={styles.profileInfo}>
        <View style={styles.profileInfoText}>
        <Text style={styles.name}>{currentUser?.full_name}</Text>
        <Text style={styles.subName}>@{currentUser?.username}</Text>
        </View>
      
      </View> 
      <Image
          source={{ uri: currentUser?.image_url! }} // Replace with actual image URL
          style={styles.profileImage}
        />
    
      <View style={styles.diagonal} />
      
      <View style={styles.detailsContainer}>
        <ProfileItem icon="mail" label="Email" value={currentUser?.email!} />
        <ProfileItem icon="call" label="Phone Number" value={currentUser?.phone_number! || "N/A"} />
        {/* <ProfileItem icon="lock-closed" label="Password" value="••••••••••" /> */}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FF3B30',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      marginTop: 36
    },
    editButton: {
      padding: 8,
    },
    profileInfo: {
    flexDirection: 'row',
      alignItems: 'center',
      marginTop: scale(2),
    },
    profileInfoText: {
      flex: 1,
      marginLeft: scale(20),
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    subName: {
      fontSize: 18,
      color: 'white',
      marginTop: 4,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginTop : scale(10),
      marginRight: scale(20),
      borderWidth: 3,
      borderColor: 'white',
      position: 'absolute',
      top: scale(110),
      right: scale(20),
      zIndex: 100,
    
    },
    diagonal: {
      height: 150,
      width: '170%',
      backgroundColor: 'white',
      transform: [{ skewY: '-20deg' }],
      
    },
    detailsContainer: {
      flex: 1,
      backgroundColor: 'white',
      marginTop: -22,
      paddingTop: 30,
      paddingHorizontal: 16,
    },
    profileItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 24,
    },
    iconContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      borderWidth: 0.5,
      borderColor: '#FF3B30',
      // shadowOffset: {width: 8, height: 8},
      shadowRadius: 4, 
      shadowColor: '#FE0000',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    label: {
      fontSize: 14,
      color: '#888',
    },
    value: {
      fontSize: 16,
      color: '#333',
    },
  });