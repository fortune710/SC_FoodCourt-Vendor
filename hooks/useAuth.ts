import { useRouter } from 'expo-router';
import { supabase } from '../utils/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { SupabaseTables } from '~/utils/types';

interface SignUpData {
    email: string;
    password: string;
    name: string
}

interface UpdateUserData extends SignUpData {
    phone_number: string;
}

export default function useAuth() {
    const queryClient = useQueryClient();
    const router = useRouter();


    const getCurrentUser = async () => {
        const user = await supabase.auth.getUser();
        return user;
    }
    
    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })     
        if (error) {
            console.log(error);
            throw new Error(error.message)   
        }
        
        return data.user;
    }

    const signUpWithEmail = async (data: SignUpData) => {
        const res = await supabase.auth.signUp({ 
            email: data.email, 
            password: data.password, 
            options: {
                data: {
                    full_name: data.name,
                    image_url:  `https://api.dicebear.com/9.x/initials/png?seed=${data.name}`,
                    username: data.name.toLowerCase().replace(" ", ""),
                    user_type: "admin",
                    phone_number: ""
                }
            }
        })

        return res.data.user
    }

    const updateUser = async (data: Partial<UpdateUserData>) => {
        return await supabase.auth.updateUser({
            data: {
                phone_number: data?.phone_number || ""
            }
        })
    }
    
    const changePassword = async (newPassword: string) => {
        return await Promise.all([
            await supabase.auth.updateUser({
                password: newPassword
            }),
            await supabase.from(SupabaseTables.Profiles).update({
                change_passsword: false
            })
        ])
    }

    const sendPasswordResetMail = async (email: string) => {
        return await supabase.auth.resetPasswordForEmail(email)
    }


    const signOut = async () => {
        await supabase.auth.signOut();
        queryClient.removeQueries({ queryKey: ["current-user"] })
        return router.replace('/login');
    }


    return {
        signIn,
        signUpWithEmail,
        getCurrentUser,
        signOut,
        updateUser,
        changePassword,
        sendPasswordResetMail
    }
}