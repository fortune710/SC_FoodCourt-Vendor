import { Redirect } from "expo-router";
import Page from "~/components/page";
import { Text } from "~/components/ui/text";

export default function AdminPage() {
    return <Redirect href='/admin/dashboard' />
}