import React from "react";
import { Redirect } from "expo-router";
import { ActivityIndicator } from "react-native";
import Page from "~/components/page";
import useCurrentUser from "~/hooks/useCurrentUser";

export default function IndexPage() {
    const { currentUser, isLoading } = useCurrentUser();

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