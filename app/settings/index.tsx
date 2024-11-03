import React from "react";
import { Dimensions, Platform, Pressable, View } from "react-native";
import Page from "~/components/page";
import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import Header from "~/components/header";
import { StatusBar } from "expo-status-bar";
import { ListItem, Switch, Text } from "@rneui/themed";
import useThemeColor from "~/hooks/useThemeColor";
import { globalStyles } from "~/constants/Styles";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { LogOut } from "lucide-react-native";
import useAuth from "~/hooks/useAuth";
import useResturant from "~/hooks/useResturant";
import useCurrentUser from "~/hooks/useCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useVendorView } from "~/hooks/useVendorView";

const AccountContainer = View
const AppContainer = View


const APP_OPTIONS = [
    {
        name: "Legal",
        icon: require('~/assets/icons/legal-icon.svg'),
        href: "/settings/legal",
    },
    {
        name: "Support",
        icon: require('~/assets/icons/support-icon.svg'),
        href: "/settings/support"
    },

]



export default function SettingsPage() {
    const primary = useThemeColor({}, "primary");
    const { signOut } = useAuth();

    const { currentUser } = useCurrentUser();





    return (
        <Page 
            style={{ backgroundColor: primary }} 
            safeAreaBgColor={primary}
        >
            <View style={{ height: Dimensions.get("screen").height, width: Dimensions.get("screen").width }}>
                <StatusBar style="light"/>
                <Header headerTitle="Settings" style="light"/>
                <View style={styles.background} />

                <View style={[globalStyles.flexItemsCenter, { justifyContent: 'center', zIndex: 50, flexDirection: "column" }]}>
                    <View style={styles.optionsContainer}>
                        <ResturantOptions userType={currentUser?.user_type} />
                        <AccountsOptions/>
                        <AppOptions/>                        
                    </View>

                    <Pressable onPress={signOut} style={styles.signOut}>
                        <LogOut stroke={primary} size={35} />
                        <Text style={{ fontWeight: "600", marginLeft: 10 }}>Sign Out</Text>
                    </Pressable>
                </View>

            </View>
        </Page>
    )
}

function ResturantOptions({ userType }: { userType: string }) {
    const { resturant } = useResturant();
    const { showVendorView, toggleVendorView } = useVendorView();

    if (userType !== "admin") null

    return (
        <>
            <View className="w-full flex flex-row items-center gap-2">
                <Avatar alt="Zach Nugent's Avatar">
                    <AvatarImage source={{ uri: resturant?.image_url }} />
                    <AvatarFallback>
                        <Text>{resturant?.name?.at(0)}</Text>
                    </AvatarFallback>
                </Avatar>

                <Text className="text-xl font-semibold">{resturant?.name}</Text>                 
            </View>

            <View className="w-full flex flex-row items-center justify-between gap-2 my-5">
                <Text className="text-xl">Turn on Staff View</Text>     

                <Switch value={showVendorView} onValueChange={toggleVendorView} />            
            </View>

            <View className="w-full flex flex-row items-center justify-between gap-2 my-5">
                <Text className="text-xl">Accepting Orders</Text>     

                <Switch value={showVendorView} onValueChange={toggleVendorView} />            
            </View>
            
        </>
    )

}

function AccountsOptions() {
    const router = useRouter();


    const ACCOUNT_OPTIONS = [
        {
            name: "Profile",
            icon: require('~/assets/icons/profile-icon.svg'),
            onPress: () => {
                return router.push("/settings/profile")
            },
            canToggle: false,
            style: { width: 32, height: 32 }
        },
        {
            name: "Accepting Orders",
            icon: require('~/assets/icons/download-icon.svg'),
            onPress: () => {},
            canToggle: true,
            style: { width: 32, height: 35 }
        },
        {
            name: "Notifications",
            icon: require('~/assets/icons/bell-icon.svg'),
            onPress: () => {},
            canToggle: true,
            style: { width: 30, height: 34 }
        },
    
    ]

    return (
        <AccountContainer>
            <Text className="font-semibold text-xl">Accounts</Text>
            <View style={styles.optionCategory}>
                {
                    ACCOUNT_OPTIONS.map((option) => (
                        <ListItem 
                            key={option.name}
                            containerStyle={styles.listItemStyle}
                            onPress={!option.canToggle && option.onPress as any}
                        >
                            <View style={globalStyles.flexItemsCenter}>
                                <Image 
                                    source={option.icon} 
                                    style={option.style}
                                />
                                <Text style={{ marginLeft: 10 }}>{option.name}</Text>
                            </View>

                            {
                                !option.canToggle ? 
                                <Image 
                                    source={require('../../assets/icons/chevron-forward.svg')} 
                                    style={{ width: 30, height: 30 }}
                                />
                                : 
                                <Switch/>
                            }

                        </ListItem>
                    ))
                }
            </View>
        </AccountContainer>

    )
}

function AppOptions() {    
    const router = useRouter();

    return (
        <AppContainer style={styles.optionCategory}>
            <Text className="font-semibold text-xl">App</Text>
            <View style={styles.optionCategory}>
                {
                    APP_OPTIONS.map((option) => (
                        <ListItem 
                            key={option.name}
                            containerStyle={styles.listItemStyle}
                            onPress={() => router.push(option.href)}
                        >
                            <View style={globalStyles.flexItemsCenter}>
                                <Image 
                                    source={option.icon} 
                                    style={{ width: 40, height: 40 }}
                                />
                                <Text style={{ marginLeft: 10 }}>{option.name}</Text>
                            </View>

                            <Image 
                                source={require('~/assets/icons/chevron-forward.svg')} 
                                style={{ width: 30, height: 30 }}
                            />
                        </ListItem>
                    ))
                }
            </View>
        </AppContainer>

    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "white",
        height: Dimensions.get('screen').height * 0.83,
        width: "100%",
        position: "absolute",
        bottom: 0,
        zIndex: 20
    },
    optionsContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        shadowColor: "#9D9D9D",
        width: "90%",
        minHeight: verticalScale(300),
        padding: scale(25),
        marginTop: verticalScale(20),
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        
        elevation: 10,
    },
    signOut: {
        borderWidth: 1,
        marginTop: 30,
        paddingVertical: 20,
        width: "90%",
        borderRadius: 24,
        ...globalStyles.flexItemsCenter,
        paddingHorizontal: 25
    },
    optionCategory: { width: "100%", marginTop: 15 },
    listItemStyle: { 
        justifyContent: "space-between", 
        width: "100%", 
        display: "flex", 
        flexDirection: "row",
        padding: 10
    }
})