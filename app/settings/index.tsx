import { Dimensions, Platform, Pressable, View } from "react-native";
import Page from "../../components/page";
import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import Header from "../../components/header,";
import { StatusBar } from "expo-status-bar";
import { ListItem, Switch, Text } from "@rneui/themed";
import useThemeColor from "../../hooks/useThemeColor";
import { globalStyles } from "../../constants/Styles";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";

const AccountContainer = View
const AppContainer = View


const APP_OPTIONS = [
    {
        name: "Legal",
        icon: require('../../assets/icons/legal-icon.svg'),
        href: "/settings/legal",
    },
    {
        name: "Support",
        icon: require('../../assets/icons/support-icon.svg'),
        href: "/settings/support"
    },

]

const ACCOUNT_OPTIONS = [
    {
        name: "Profile",
        icon: require('../../assets/icons/profile-icon.svg'),
        onPress: () => {},
        canToggle: false,
        style: { width: 32, height: 32 }
    },
    {
        name: "Accepting Orders",
        icon: require('../../assets/icons/download-icon.svg'),
        onPress: () => {},
        canToggle: true,
        style: { width: 32, height: 35 }
    },
    {
        name: "Notifications",
        icon: require('../../assets/icons/bell-icon.svg'),
        onPress: () => {},
        canToggle: true,
        style: { width: 30, height: 34 }
    },

]


export default function SettingsPage() {

    const primary = useThemeColor({}, "primary");

    const router = useRouter();
    return (
        <Page 
            style={{ backgroundColor: primary }} 
            safeAreaBgColor={primary}
        >
            <View style={{ height: Dimensions.get("screen").height, width: Dimensions.get("screen").width }}>
                <StatusBar style="light"/>
                <Header style="light"/>
                <View style={styles.background} />

                <View style={[globalStyles.flexItemsCenter, { justifyContent: 'center', zIndex: 50, flexDirection: "column" }]}>
                    <View style={styles.optionsContainer}>
                        <AccountContainer>
                            <Text>Accounts</Text>
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

                        <AppContainer style={styles.optionCategory}>
                            <Text>App</Text>
                            <View style={styles.optionCategory}>
                                {
                                    APP_OPTIONS.map((option) => (
                                        <Link 
                                            key={option.name}
                                            
                                            href={option.href}
                                        >
                                            <View style={styles.listItemStyle}>
                                                <View style={globalStyles.flexItemsCenter}>
                                                    <Image 
                                                        source={option.icon} 
                                                        style={{ width: 40, height: 40 }}
                                                    />
                                                    <Text style={{ marginLeft: 10 }}>{option.name}</Text>
                                                </View>
                
                                                <Image 
                                                    source={require('../../assets/icons/chevron-forward.svg')} 
                                                    style={{ width: 30, height: 30 }}
                                                />
                                            </View>
                                        </Link>
                                    ))
                                }
                            </View>
                        </AppContainer>
                        
                    </View>

                    <Pressable onPress={() => router.push('/login')} style={styles.signOut}>
                        <Image source={require('../../assets/icons/log-out.svg')} style={{ width: 35, height: 30, marginRight: 15 }}/>
                        <Text style={{ fontWeight: "600" }}>Sign Out</Text>
                    </Pressable>
                </View>

            </View>
        </Page>
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
    listItemStyle: { justifyContent: "space-between", width: "100%", display: "flex", flexDirection: "row" }
})