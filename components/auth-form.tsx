import { Button, Input } from '@rneui/themed';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Pressable, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { Link, useRouter } from 'expo-router'
import styleUtility from '../utils/styles';
import { verticalScale } from 'react-native-size-matters';
import useAuth from '../hooks/useAuth';
import { Eye, Lock, Mail, UserRound } from 'lucide-react-native';
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


    const { signIn, signUpWithEmail } = useAuth();
    const { getResturantByAdminId } = useResturant();
    const router = useRouter();
    const primary = useThemeColor({}, "primary")

    const handleContinue = async () => {
        try {
            switch (type) {
                case "login":
                    const user = await signIn(email, password);
                    const resturant = await getResturantByAdminId(user?.id!);
                    if (resturant) return router.push('/orders');
                    
                    return router.push({
                        pathname: '/restaurant/create',
                        params: {
                            admin_id: user?.id
                        }
                    });
                case "sign-up":
                    await signUpWithEmail({
                        email: email,
                        password: password,
                        name: name,
                    })
                    .then((user) => {
                        Toast.show({
                            text1: "Sign Up Successful",
                            type: "success"
                        })
                        return router.push({
                            pathname: '/create-resturant',
                            params: {
                                admin_id: user?.id
                            }
                        });
                    })
                    .catch((error) =>  console.log(error))
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
            <KeyboardAvoidingView behavior='padding' style={styles.formContainer}>
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
                    leftIcon={<Mail stroke={primary} />}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <Input
                    leftIcon={<Lock stroke={primary}/>}
                    rightIcon={
                        <Pressable>
                            <Eye stroke={primary}/>
                        </Pressable>
                    }
                    inputContainerStyle={styles.inputContainer}
                    placeholder='Password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                {
                    type === 'login' ? 
                    <View style={[styleUtility.flexJustifyBetween, { width: '100%', paddingHorizontal: 20 }]}>
                        <RememberMeContainer 
                            style={styles.checkboxContainer}
                        >
                            <Checkbox checked={checkboxClicked} onCheckedChange={setCheckbox}/>
                            <Text>Remember Me</Text>
                        </RememberMeContainer>

                        <Link href={'/forgot-password'}>
                            Forgot Password
                        </Link>
                    </View>
                    :
                    <TermsAndConditionsContainer className='flex flex-row gap-2 items-center px-5'>
                        <Checkbox checked={checkboxClicked} onCheckedChange={setCheckbox}/>

                        <Text>
                            I have read and accepted the <Link href={'/terms'}>Terms and Conditions</Link>
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


            </KeyboardAvoidingView>
        )
    }

    return (
        <View>
            {
                /*
                
                <Image
                    source={{ uri: require('../assets/forgot-password.svg') }}
                    style={{ height: 220, width: '100%' }}
                />
                
                */
            }

            <View>
                <Text>Forgot Password</Text>
                <Text>
                    Enter the email associated aith this account and we'll send you a link to 
                    reset your password
                </Text>
            </View>

            <Input
                /*
                leftIcon={
                    <Icon iconFile={require('../assets/icons/mail.svg')}/>
                }*/
                inputContainerStyle={styles.inputContainer}
                placeholder='Email'
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
        marginTop: verticalScale(25)
    },
    checkboxContainer: { 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    checkbox: { margin: 0, padding: 0 }
})