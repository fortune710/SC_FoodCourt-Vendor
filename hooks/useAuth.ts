import { createUserWithEmailAndPassword, getIdToken, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
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
        return res.data.user
    }

    return {
        signIn,
        signUpWithEmail
    }
}