import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { ActivityIndicator } from "react-native";
import Page from "~/components/page";
import { supabase } from "~/utils/supabase";

export default function IndexPage() {
    const [isLoading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        //TODO: Create a sperate hook for checking current user status
        async function fetchCurrentUser() {
            setLoading(true);
            const user = await supabase.auth.getUser();
            setCurrentUser(user);
            setLoading(false);
        }

        fetchCurrentUser();
    }, []);

    if (isLoading) {
        return (
            <Page>
                <ActivityIndicator/>
            </Page>
        )

    }

    if (!currentUser?.id) return <Redirect href="/login"/>

    return (
        <>
            {
                currentUser.user_type === "admin" ? 
                <Redirect href="/admin/dashboard"/> : 
                <Redirect href="/orders" />            
            }
        </>
    )
}