import { Button, Input } from '@rneui/themed';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Link, useRouter } from 'expo-router'
import styleUtility from '../utils/styles';
import { verticalScale } from 'react-native-size-matters';
import useAuth from '../hooks/useAuth';
import { Eye, EyeOff, Lock, Mail, UserRound } from 'lucide-react-native';
import useThemeColor from '~/hooks/useThemeColor';
import { Checkbox } from './ui/checkbox';
import Toast from 'react-native-toast-message';
import useResturant from '~/hooks/useResturant';

interface AuthFormProps {
    type: 'login'|'sign-up'|'forgot-password'
}

const TermsAndConditionsContainer = View;
const RememberMeContainer = View;

export default function AuthForm({ type }: AuthFormProps) {
    const [checkboxClicked, setCheckbox] = useState(false);

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const { signIn, signUpWithEmail } = useAuth();
    const { getResturantByAdminId } = useResturant();
    const router = useRouter();
    const primary = useThemeColor({}, "primary")

    const handleContinue = async () => {
        try {
            switch (type) {
                case "login":
                    const user = await signIn(email, password);
                    if (user?.user_metadata.user_type === "admin") {

                        const resturant = await getResturantByAdminId(user?.id!);
                        if (resturant) return router.push('/admin/dashboard');
                        
                        return router.push({
                            pathname: '/restaurant/create',
                            params: {
                                admin_id: user?.id
                            }
                        });
                    }

                    return router.push('/orders')
                    break;
                case "sign-up":
                    await signUpWithEmail({
                        email: email,
                        password: password,
                        name: name,
                    })
                    .then((user) => {
                        console.log(user)
                        Toast.show({
                            text1: "Sign Up Successful",
                            type: "success"
                        })
                        return router.push({
                            pathname: '/restaurant/create',
                            params: {
                                admin_id: user?.id
                            }
                        });
                    })
                    .catch((error) =>  console.log(error))
                    break;
                case "forgot-password":
                    break;
                default:
                    return;
            }

        } catch (error) {
            Toast.show({
                text1: "Error: " +error,
                type: "error"
            })
        }
    }


    if (type !== 'forgot-password') {
        return (
            <View 
                style={styles.formContainer}
            >
                {
                    type === 'sign-up' && 
                    <>
                        <Input
                            inputContainerStyle={styles.inputContainer}
                            placeholder='Name'
                            leftIcon={
                                <UserRound stroke={primary} />
                            }    
                            value={name}
                            onChangeText={(text) => setName(text)}    
                        />

                        

                    
                    
                    </>
                }

                <Input
                    inputContainerStyle={styles.inputContainer}
                    placeholder='Email'
                    placeholderTextColor='#7e7e7e'
                    leftIcon={<Mail stroke={primary} />}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType='email-address'
                />

                <Input
                    leftIcon={<Lock stroke={primary}/>}
                    rightIcon={
                        <TouchableOpacity 
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            { showPassword ? <Eye stroke={primary} /> : <EyeOff stroke={primary}/> }
                        </TouchableOpacity>
                    }
                    inputContainerStyle={styles.inputContainer}
                    placeholder='Password'
                    placeholderTextColor='#7e7e7e'
                    secureTextEntry={showPassword}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                {
                    type === 'login' ? 
                    <View style={[styleUtility.flexJustifyBetween, { width: '100%', paddingHorizontal: 20 }]}>
                        <RememberMeContainer 
                            style={styles.checkboxContainer}
                            className='gap-2'
                        >
                            <Checkbox checked={checkboxClicked} onCheckedChange={setCheckbox}/>
                            <Text>Remember Me</Text>
                        </RememberMeContainer>

                        <Link href={'/forgot-password'}>
                            Forgot Password?
                        </Link>
                    </View>
                    :
                    <TermsAndConditionsContainer className='flex flex-row gap-2 items-center px-5'>
                        <Checkbox checked={checkboxClicked} onCheckedChange={setCheckbox}/>

                        <Text>
                            I have read and accepted the <Link className='text-primary' href={'/terms'}>Terms and Conditions</Link>
                        </Text>
                    </TermsAndConditionsContainer>
                }

                <View style={styles.actions}>
                    <Button
                        titleStyle={{ textAlign: 'center' }} 
                        buttonStyle={styles.mainAction}
                        onPress={handleContinue}
                    >
                        Continue
                    </Button>

                    <Link 
                        style={styles.moveToOtherPage}
                        href={type === 'login' ? `/sign-up` : '/login'}
                    >
                        { type === 'login' ? 'New User? Create Account' : 'Already Have an Account? Login' }
                    </Link>
                </View>


            </View>
        )
    }

    return (
        <View className='px-3 flex flex-col gap-10'>


            <View>
                <Text className='text-4xl text-primary font-bold'>Forgot Password</Text>
                <Text>
                    Enter the email associated aith this account and we'll send you a link to 
                    reset your password
                </Text>
            </View>

            <Input
                inputContainerStyle={styles.inputContainer}
                placeholder='Email'
                leftIcon={<Mail stroke={primary} />}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />


            <Button>
                Continue
            </Button>

            
        </View>
    )

}


const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1, 
        paddingHorizontal: 20, 
        borderRadius: 32, 
        borderColor: '#f72f2f',
        paddingVertical: 5
    },
    moveToOtherPage: {
        borderWidth: 1, 
        borderRadius: 32, 
        borderColor: '#f72f2f',
        marginTop: 25,
        paddingVertical: 21,
        paddingHorizontal: 15,
        color: '#f72f2f',
        textAlign: 'center',
        width: '80%'
    },
    mainAction: {
        borderRadius: 28,
        paddingHorizontal: 50,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'

    },
    formContainer: {
        marginVertical: 12,
        paddingHorizontal: 8
    },

    actions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: verticalScale(50)
    },
    checkboxContainer: { 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    checkbox: { margin: 0, padding: 0 }
})