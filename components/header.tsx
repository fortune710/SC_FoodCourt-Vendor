import { Dimensions, Pressable, View } from "react-native";
import { Link, SplashScreen, Stack, useRootNavigation, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { globalStyles } from "../constants/Styles";
import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { useState } from "react";
import useThemeColor from "../hooks/useThemeColor";
import { Image } from "expo-image";
import { LayoutGrid, UsersRound, Settings, X, Mail, Package } from "lucide-react-native";
import { Text } from "./ui/text";
import { Text as RNEText } from "@rneui/themed"


const ICON_SIZE = 35;

const toolbarColorPerPage: Record<string, string> = {
    "index": "white",
    "settings": "#F72F2F"
}

interface HeaderProps {
    style?: "light"|"dark",
    headerTitle?: string,
    rightIcon?: React.ReactNode
}

const MenuLight = require('../assets/icons/menu-icon-light.svg');
const MenuRed = require('../assets/icons/menu-icon-red.svg');
const ShoppingBag = require('../assets/icons/shopping-bag.svg');


export default function Header({ style = "dark", headerTitle, rightIcon }: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const route = useRootNavigation();
    const pageName = route?.getCurrentRoute()?.name! as string;

    const router = useRouter();

    const primary = useThemeColor({}, "primary")

    const iconColor = {
        "light": "#fff",
        "dark": primary
    }

    const labelColor = {
        "light": "#fff",
        "dark": "#000"
    }

    const moveToMenu = () => {
        router.push("/menu")
        return setMenuOpen(false)
    }

    const moveToAdmin = () => {
        router.replace("/admin/wallet")
        return setMenuOpen(false)
    }

    const moveToOrders = () => {
        router.push("/orders")
        return setMenuOpen(false)
    }

    const title = () => {
        if (!headerTitle) {
            return pageName === 'index' ? 'Orders' : pageName
        }

        return headerTitle
    }




    return (
        <>
            {
                !menuOpen ? null :
                <View style={styles.menu}>
                    <View className="">
                        <Pressable onPress={() => setMenuOpen(false)}>
                            <X size={ICON_SIZE} color="red"/>
                        </Pressable>
                    </View>
                    
                    <View className="flex flex-col gap-4">
                        <Pressable onPress={moveToMenu}>
                            <LayoutGrid color='white' size={ICON_SIZE}/>                    
                        </Pressable>

                        <Pressable onPress={moveToOrders} className="flex flex-row items-center gap-2">
                            <Package size={ICON_SIZE} color='white'/>
                            <Text className="text-white text-xl font-semibold">Orders</Text>
                        </Pressable>

                        <Pressable>
                            <Mail color='white' size={ICON_SIZE}/>                    
                        </Pressable>

                        <Link href="/settings" onPressOut={() => setMenuOpen(false)}>
                            <Settings color='white' size={ICON_SIZE}/>                    
                        </Link>

                        <Pressable onPress={moveToAdmin} className="flex flex-row items-center gap-2">
                            <UsersRound size={ICON_SIZE} color='white'/>
                            <Text className="text-white text-xl font-semibold">Admin</Text>
                        </Pressable>
                    </View>



                </View>
            }
        
            <View style={[styles.header,{ backgroundColor: toolbarColorPerPage[pageName], }]}>
                <View style={globalStyles.flexItemsCenter}>
                    <Pressable onPress={() => setMenuOpen(!menuOpen)}>
                        <Image 
                            style={styles.headerIcon} 
                            source={style === 'light' ? MenuLight : MenuRed}
                        />
                    </Pressable>

                    <RNEText style={[styles.headerTitle, { color: labelColor[style!] }]}>
                        {title()}
                    </RNEText>
                </View>

                {
                    !rightIcon ?
                    pageName === 'settings/index' ?  null :
                    <Link href="/pickup">
                        <Image style={styles.headerIcon} source={ShoppingBag}/>
                    </Link>
                    : rightIcon
                }

            </View>
        
        </>
    )
}


const styles = StyleSheet.create({
    menu: {
        backgroundColor: "#111111",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        zIndex: 200,
        position: "absolute",
        bottom: 0,
        top: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 50
    },
    headerIcon: { width: 24, height: 24 },
    menuButons: {
        position: "absolute",
        top: "25%",
        left: "10%",
        ...globalStyles.flexItemsCenter,
        justifyContent: "center",
        flexDirection: "column"
    },
    header: {
        ...globalStyles.flexItemsCenter,
        justifyContent: "space-between",
        height: verticalScale(50),
        paddingHorizontal: scale(18)
    },
    headerTitle: {
        fontSize: scale(22),
        fontWeight: "700",
        marginLeft: 20,
        textTransform: "capitalize"
    }
})