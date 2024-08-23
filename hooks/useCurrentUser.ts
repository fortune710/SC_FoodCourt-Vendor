import useAuth from "./useAuth";

export default function useCurrentUser() {
    const { getCurrentUser: currentUser } = useAuth();

    const getCurrentUser = async () => {
        const { data } = await currentUser();
        return {
            id: data.user?.id,
            user_type: data.user?.user_metadata.user_type,
            full_name: data.user?.user_metadata.full_name,
            image_url: data.user?.user_metadata.image_url,
            username: data.user?.user_metadata.username,
            email: data.user?.email
        };
    }

    return {
        getCurrentUser
    }
}