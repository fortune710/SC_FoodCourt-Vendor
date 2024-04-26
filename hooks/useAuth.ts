import { createUserWithEmailAndPassword, getIdToken, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

export default function useAuth() {
    
    const signIn = async (email: string, password: string) => {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await getIdToken(user);
        return idToken
    }

    const signUpWithEmail = async (email: string, password: string) => {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        const idToken = await getIdToken(user);
        return idToken

    }

    return {
        signIn,
        signUpWithEmail
    }
}