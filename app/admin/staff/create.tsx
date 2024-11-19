import { Text } from "~/components/ui/text";
import Page from "~/components/page";
import React from 'react';
import { View ,  TextInput, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { scale } from 'react-native-size-matters';
import { StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { STAFF_POSITIONS } from "~/utils/constants";
import useRestaurantStaff from "~/hooks/useRestaurantStaff";





export default function CreateStaffPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');

  const insets = useSafeAreaInsets();

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };


  const router = useRouter();

  const { addStaffMember } = useRestaurantStaff();

  const submitForm = async () => {
    await addStaffMember({
      full_name: `${firstName} ${lastName}`,
      phone_number: phoneNumber,
      email: email,
      position: position,
      password: "Password"
    })

    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setEmail('');
    setPosition('');

    router.back();

  }

  return (
    <Page>
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#FF3B30" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={60} color="#CCCCCC" />
          </View>
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Select 
          className="w-full"
          onValueChange={(option) => setPosition(option?.value!)}
        >
            <SelectTrigger className='w-full border-b'>
                <SelectValue
                  className='text-foreground text-sm native:text-lg'
                  placeholder='Select a position'
                />
            </SelectTrigger>
            <SelectContent insets={contentInsets} className='w-full overflow-scroll'>
                {
                  STAFF_POSITIONS.map((time) => (
                    <SelectItem key={time} label={time} value={time}>
                        {time}
                    </SelectItem>
                  ))
                }
            </SelectContent>
        </Select>     


        <TouchableOpacity onPress={submitForm} style={styles.createButton}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </Page>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backText: {
    fontSize: 18,
    color: '#FF3B30',
    marginLeft: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#FF3B30',
    borderRadius: 15,
    padding: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: scale(100),
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#FF3B30',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#FF3B30',
    fontSize: 18,
  },
});
