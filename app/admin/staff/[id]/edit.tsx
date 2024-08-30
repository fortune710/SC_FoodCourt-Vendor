import Header from "~/components/header";
import Page from "~/components/page";
import { Text } from "~/components/ui/text";
import React, { useState } from 'react';
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { scale } from "react-native-size-matters";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar, Modal} from "react-native";
import useStaffProfile from "~/hooks/useStaffProfile";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { STAFF_POSITIONS } from "~/utils/constants";
import useRestaurantStaff from "~/hooks/useRestaurantStaff";





interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  isEditable?: boolean;
}
  
  const InputField: React.FC<InputFieldProps> = ({ label, value, onChangeText, isEditable = true }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        editable={isEditable}
      />
    </View>
  );

export default function editStaffPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { profile, isLoading } = useStaffProfile(id as string);
  const { updateStaff } = useRestaurantStaff();

  const [email, setEmail] = useState(profile?.email);
  const [phoneNumber, setPhoneNumber] = useState(profile?.phone_number);
  const [position, setPosition] = useState(profile?.position);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSave = () => {
    setShowConfirmation(true);
  };

  const confirmSave = async () => {
    // Implement save logic here
    await updateStaff({
      email: email!,
      phone_number: phoneNumber!,
      position: position!,
      id: id as string
    })
    setShowConfirmation(false);
    //return router.push(`/admin/staff/${id}`)
  };

  if (isLoading) {
    return (
      <Page>
        <ActivityIndicator/>
      </Page>
    )
  }


  return (
        <Page>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
             <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#FF3B30" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: profile?.image_url }} // Replace with actual image URL
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>{profile?.full_name}</Text>
        <Text style={styles.subName}>@{profile?.username}</Text>

        <InputField label="Email" value={email!} onChangeText={setEmail} />
        <InputField label="Phone Number" value={phoneNumber!} onChangeText={setPhoneNumber} />
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Position</Text>
          <Select 
            className="w-full"
            onValueChange={(option) => setPosition(option?.value!)}
            defaultValue={{ label: position!, value: position! }}
          >
              <SelectTrigger className='w-full'>
                <SelectValue
                  className='text-foreground text-sm native:text-lg'
                  placeholder='Select a position'
                />
              </SelectTrigger>
              <SelectContent className='w-full'>
                {
                  STAFF_POSITIONS.map((time) => (
                    <SelectItem key={time} label={time} value={time}>
                      {time}
                    </SelectItem>
                  ))
                }
              </SelectContent>
          </Select>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        transparent={true}
        visible={showConfirmation}
        onRequestClose={() => setShowConfirmation(false)}
      >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirm Save</Text>
              <Text style={styles.modalText}>Are you sure you want to save these changes?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={() => setShowConfirmation(false)}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.modalButton, styles.modalButtonConfirm]} onPress={confirmSave}>
                  <Text style={[styles.modalButtonText, styles.modalButtonTextConfirm]}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    </SafeAreaView>
    </Page>
  )
}



const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // This creates a semi-transparent overlay
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%', // Adjust as needed
      },

      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      modalButton: {
        flex: 1,
        padding: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#FF3B30',
        marginHorizontal: 5,
      },
      modalButtonConfirm: {
        backgroundColor: '#FF3B30',
      },
      modalButtonText: {
        color: '#FF3B30',
        textAlign: 'center',
        fontWeight: 'bold',
      },
      modalButtonTextConfirm: {
        color: 'white',
      },
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
      padding: 16,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backText: {
      color: '#FF3B30',
      fontSize: 18,
      marginLeft: 5,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    profileImageContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    cameraButton: {
      position: 'absolute',
      right: '35%',
      bottom: 0,
      backgroundColor: '#FF3B30',
      borderRadius: 15,
      padding: 8,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subName: {
      fontSize: 18,
      color: '#FF3B30',
      textAlign: 'center',
      marginBottom: 20,
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputLabel: {
      fontSize: 14,
      color: '#FF3B30',
      marginBottom: 5,
    },
    input: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      paddingVertical: 5,
      fontSize: 16,
    },
    positionInput: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#ccc',
      paddingVertical: 5,
    },
    positionText: {
      fontSize: 16,
    },
    saveButton: {
      backgroundColor: '#FF3B30',
      padding: 15,
      borderRadius: 30,
      alignItems: 'center',
      marginTop: scale(80),
    },
    saveButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    cancelButton: {
      padding: 15,
      borderRadius: 30,
      alignItems: 'center',
      marginTop: 10,
      borderWidth: 1,
      borderColor: '#FF3B30',
    },
    cancelButtonText: {
      color: '#FF3B30',
      fontSize: 18,
    },
  });