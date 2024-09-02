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

    return (
        <>
            {
                !currentUser ? <Redirect href="/login"/> :
                <Redirect href="/admin/dashboard"/>
            }
        </>
    )
}