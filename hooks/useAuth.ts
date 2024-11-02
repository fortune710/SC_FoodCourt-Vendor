import { useRouter } from 'expo-router';
import { supabase } from '../utils/supabase';
import { useQueryClient } from '@tanstack/react-query';

interface SignUpData {
    email: string;
    password: string;
    name: string
}

export default function useAuth() {
    const queryClient = useQueryClient();
    const router = useRouter();


    const getCurrentUser = async () => {
        const user = await supabase.auth.getUser();
        return user;
    }
    
    const signIn = async (email: string, password: string) => {
        const res = await supabase.auth.signInWithPassword({
            email,
            password,
        })        
        return res.data.user;
    }

    const signUpWithEmail = async (data: SignUpData) => {
        console.log(data)
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

    const signOut = async () => {
        await supabase.auth.signOut();
        queryClient.removeQueries({ queryKey: ["current-user"] })
        return router.replace('/login');
    }


    return {
        signIn,
        signUpWithEmail,
        getCurrentUser,
        signOut
    }
}