import { supabase } from '../utils/supabase';

export default function useAuth() {
    
    const signIn = async (email: string, password: string) => {
        const res = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        
        return ""
    }

    const signUpWithEmail = async (email: string, password: string) => {
        const res = await supabase.auth.signUp({
            email, password
        })
        await supabase.from('profile').insert([
            { name: "", email,  }
        ])
        await supabase.from('resturants').insert([
            { name: "", user_id: res.data.user?.id!, email }
        ])

        return res.data.user
    }

    return {
        signIn,
        signUpWithEmail
    }
}