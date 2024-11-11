import { Input, Text } from "@rneui/themed";
import { Image } from "expo-image";
import Page from "components/page";
import { View, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import useThemeColor from "hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";

import BackArrowButton from "~/components/custom/back-arrow-button";
import { useRouter } from "expo-router";
import { globalStyles } from "constants/Styles";
import Button from "~/components/custom/button";
import { StatusBar } from "react-native";
import { useState } from "react";
import { scale } from "react-native-size-matters";
import useCurrentUser from "~/hooks/useCurrentUser";
import useAuth from "~/hooks/useAuth";

export default function EditProfile() {
    const primary = useThemeColor({}, "primary");
    const router = useRouter();
    const  { currentUser } = useCurrentUser();
    const { updateUser } = useAuth();
    const [phoneNumber, setPhoneNumber] = useState(currentUser?.phone_number);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <Page>
          <StatusBar backgroundColor="white" barStyle="dark-content" />

            
          <KeyboardAvoidingView behavior="position" style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Edit Profile</Text>
              <View style={styles.placeholder} />
            </View>

            <View style={styles.profileSection}>
              <Image
                source={{ uri: currentUser?.image_url }} // Replace with actual image URL
                style={styles.profileImage}
              />
              <View style={styles.cameraIconContainer}>
                <Ionicons name="camera" size={20} color="white" />
              </View>
              <Text style={styles.name}>{currentUser?.full_name}</Text>
              <Text style={styles.subName}>@{currentUser?.username}</Text>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="default"
              />

              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.updateButtonContainer}>
            <TouchableOpacity style={styles.updateButton} onPress={() => updateUser({ phone_number: phoneNumber })}>
              <Text style={styles.updateButtonText}>Update Profile</Text>
            </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>


        </Page>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    placeholder: {
      width: 24,
    },
    profileSection: {
      alignItems: 'center',
      marginTop: scale(30),
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    cameraIconContainer: {
      position: 'absolute',
      right: '40%',
      bottom: 45,
      backgroundColor: '#ffc7c7',
      borderRadius: 15,
      padding: 5,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
    },
    subName: {
      fontSize: 16,
      color: '#7e7e7e',
    },
    inputSection: {
      paddingHorizontal: 16,
      marginTop: 20,
    },
    label: {
      fontSize: 14,
      color: '#7e7e7e',
      marginTop: 16,
    },
    input: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      paddingVertical: 8,
      fontSize: 16,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    passwordInput: {
      flex: 1,
      paddingVertical: 8,
      fontSize: 16,
    },
    updateButtonContainer: {
        alignItems: 'center',
      marginTop: scale(120),
      marginBottom: scale(20),
    },
    updateButton: {
      backgroundColor: '#FF3B30',
    
      width: scale(200),
      padding: 16,
      borderRadius: 30,
      alignItems: 'center',
   
      marginBottom: scale(20),
    },
    updateButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });