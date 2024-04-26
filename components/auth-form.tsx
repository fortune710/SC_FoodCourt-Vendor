import { Button, CheckBox, Input } from '@rneui/themed';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import Icon from './ui/icon';

import { Link } from 'expo-router'
import styleUtility from '../utils/styles';
//import useAuth from '../hooks/useAuth';

interface AuthFormProps {
    type: 'login'|'sign-up'|'forgot-password'
}

const TermsAndConditionsContainer = View;
const RememberMeContainer = View;

export default function AuthForm({ type }: AuthFormProps) {
    const [checkboxClicked, setCheckbox] = useState(false);

    //const { signIn } = useAuth();


    if (type !== 'forgot-password') {
        return (
            <View style={styles.formContainer}>
                {
                    type === 'sign-up' && 
                    <Input
                        inputContainerStyle={styles.inputContainer}
                        placeholder='Name'
                    />
                }

                <Input
                    inputContainerStyle={styles.inputContainer}
                    placeholder='Email'
                />

                <Input
                    leftIcon={
                        <Icon iconFile={require('../assets/icons/padlock.svg')}/>
                    }
                    rightIcon={
                        <Pressable>
                            <Icon iconFile={require('../assets/icons/eye.svg')}/>
                        </Pressable>
                    }
                    inputContainerStyle={styles.inputContainer}
                    placeholder='Password'
                />

                {
                    type === 'login' ? 
                    <View style={[styleUtility.flexJustifyBetween, { width: '100%' }]}>
                        <RememberMeContainer style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <CheckBox
                                checked={checkboxClicked}
                                onPress={() => setCheckbox(!checkboxClicked)}
                                iconType='material-community'
                                checkedIcon={'checkbox-marked'}
                                uncheckedIcon={'checkbox-blank-outline'}
                                checkedColor='#f72f2f'
                                //style={{ marginRight: 7 }}
                            />
                            <Text>Remember Me</Text>
                        </RememberMeContainer>

                        <Link href={'/forgot-password'}>
                            Forgot Password
                        </Link>
                    </View>
                    :
                    <TermsAndConditionsContainer>
                        <CheckBox
                            checked={checkboxClicked}
                            onPress={() => setCheckbox(!checkboxClicked)}
                            iconType='material-community'
                            checkedIcon={'checkbox-marked'}
                            uncheckedIcon={'checkbox-blank-outline'}
                            checkedColor='#f72f2f'
                        />

                        <Text>
                            I have read and accepted the <Link href={'/terms'}>Terms and Conditions</Link>
                        </Text>
                    </TermsAndConditionsContainer>
                }

                <View style={styles.actions}>
                    <Button
                        titleStyle={{ textAlign: 'center' }} 
                        buttonStyle={styles.mainAction}
                    >
                        Continue
                    </Button>

                    <Link 
                        style={styles.moveToOtherPage}
                        href={ type === 'login' ? `/sign-up` : '/login'}
                    >
                        { type === 'login' ? 'New User? Create Account' : 'Already Have an Account? Login' }
                    </Link>
                </View>


            </View>
        )
    }

    return (
        <View>
            <Image
                source={{ uri: require('../assets/forgot-password.svg') }}
                style={{ height: 220, width: '100%' }}
            />

            <View>
                <Text>Forgot Password</Text>
                <Text>
                    Enter the email associated aith this account and we'll send you a link to 
                    reset your password
                </Text>
            </View>

            <Input
                    leftIcon={
                        <Icon iconFile={require('../assets/icons/mail.svg')}/>
                    }
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
        borderWidth: 1, paddingHorizontal: 10, borderRadius: 32, borderColor: '#f72f2f'
    },
    moveToOtherPage: {
        borderWidth: 1, 
        borderRadius: 32, borderColor: '#f72f2f',
        paddingVertical: 10,
        paddingHorizontal: 15,
        color: '#f72f2f',
        textAlign: 'center',
        width: '80%'
    },
    mainAction: {
        width: '90%',
        backgroundColor: '#f72f2f',
        borderRadius: 32,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'

    },
    formContainer: {
        marginVertical: 12
    },

    actions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    }
})