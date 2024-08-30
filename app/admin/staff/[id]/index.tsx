import Header from "~/components/page-header";
import Page from "~/components/page";
import { Text } from "~/components/ui/text";
import React from 'react';
import { View , Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { scale } from 'react-native-size-matters';
import { StatusBar } from 'react-native';
import { useRouter } from 'expo-router';




interface ProfileItemProps {
    icon: React.ComponentProps<typeof Ionicons>['name'];
    label: string;
    value: string;
  }
  
  const ProfileItem: React.FC<ProfileItemProps> = ({ icon, label, value }) => (
    <View style={styles.profileItem}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={20} color="#FF3B30" />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemLabel}>{label}</Text>
        <Text style={styles.itemValue}>{value}</Text>
      </View>
    </View>
  );

export default function StaffPage() {
  const router = useRouter();
    return (
      
        // <Page>

        //     <Header showTitle={false}  backButtonColor="blue" backTextColor="blue" />
        //     <Text>individual staff page</Text>
        // </Page>
        <Page>
        <StatusBar backgroundColor="#F72F2F" barStyle="light-content" />
        <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="white" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
  
        <ScrollView style={styles.content}>
          <View style={styles.profileCard}>
            <Image
              source={require('~/assets/images/food-court-avatar.png')} // Replace with actual image URL
              style={styles.profileImage}
            />
            <View style={styles.profileDetails}>
            <Text style={styles.name}>Naomi Andrews</Text>
            <Text style={styles.subName}>Uvuvwevwevwe</Text>
            <Text style={styles.username}>@nu.Andrews</Text>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="call" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="mail" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-ellipses" size={24} color="white" />
              </TouchableOpacity>
            </View>
            </View>
          </View>
        <View style={styles.greybar}>

        </View>

  
          <View style={styles.detailsSection}>
            <ProfileItem icon="mail" label="Email" value="naomi.andrews@gmail.com" />
            <ProfileItem icon="call" label="Phone Number" value="+234 804 225 8973" />
            <ProfileItem icon="briefcase" label="Position" value="Front Desk" />
            <TouchableOpacity style={styles.permissionsItem}>
              <ProfileItem icon="shield-checkmark" label="Permissions" value="" />
              <Ionicons name="chevron-down" size={24} color="#888" />
            </TouchableOpacity>
          </View>
  
          <TouchableOpacity style={styles.editButton} onPress={() => router.push('/admin/staff/1/edit')}>
            <Text style={styles.editButtonText}>Edit Details</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      </Page>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
      padding: 16,
      backgroundColor: '#FF3B30',
      height: scale(170),
    },
    greybar: {
      height: 10,
      backgroundColor: '#F0F0F0',
    },
    profileDetails: {
      marginLeft: scale(10),
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backText: {
      color: 'white',
      fontSize: 18,
      marginLeft: 5,
    },
    content: {
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginHorizontal: scale(10),
      marginTop: -100,
    },
    profileCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      
      backgroundColor: 'white',
      
      marginTop: 20,
      marginHorizontal: scale(10),

    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      paddingTop: 10,
    },
    subName: {
      fontSize: 18,
      color: '#888',
    },
    username: {
      fontSize: 16,
      color: '#888',
      marginTop: 5,
    },
    actionButtons: {
      flexDirection: 'row',
      marginTop: 20,
    },
    actionButton: {
      backgroundColor: '#FFA500',
      borderRadius: 20,
      padding: 10,
      marginHorizontal: 10,
    },
    detailsSection: {
      padding: 20,
    },
    profileItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#FFEBEE',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    itemContent: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemLabel: {
      fontSize: 14,
      color: '#888',
    },
    itemValue: {
      fontSize: 16,
      color: '#333',
    },
    permissionsItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
     
    },
    editButton: {
      backgroundColor: '#FF3B30',
      padding: 15,
      borderRadius: 30,
      alignItems: 'center',
      marginHorizontal: 20,
      marginTop: 20,
    },
    editButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    deleteButton: {
      padding: 15,
      borderRadius: 30,
      alignItems: 'center',
      marginHorizontal: 20,
      marginTop: 10,
      marginBottom: 30,
      borderWidth: 1,
      borderColor: '#FF3B30',
    },
    deleteButtonText: {
      color: '#FF3B30',
      fontSize: 18,
    },
  });