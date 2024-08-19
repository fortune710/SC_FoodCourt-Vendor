import { Dimensions, Pressable, View } from "react-native";
import { Link, SplashScreen, Stack, useRootNavigation } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { globalStyles } from "../constants/Styles";
import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { useState } from "react";
import { Text } from "@rneui/themed";
import useThemeColor from "../hooks/useThemeColor";
import { Image } from "expo-image";


const ICON_SIZE = 35;

const toolbarColorPerPage: Record<string, string> = {
    "index": "white",
    "settings": "#F72F2F"
}

interface HeaderProps {
    style?: "light"|"dark"
}

const MenuLight = require('../assets/icons/menu-icon-light.svg');
const MenuRed = require('../assets/icons/menu-icon-red.svg');
const ShoppingBag = require('../assets/icons/shopping-bag.svg');


export default function Header({ style }: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const route = useRootNavigation();
    const pageName = route?.getCurrentRoute()?.name! as string;

    const primary = useThemeColor({}, "primary")

    const iconColor = {
        "light": "#fff",
        "dark": primary
    }

    const labelColor = {
        "light": "#fff",
        "dark": "#000"
    }

    return (
        <>
            {
                !menuOpen ? null :
                <View style={styles.menu}>
                    
                    <View style={styles.menuButons}>
                        <Pressable>
                            <Octicons name="apps" color='white' size={ICON_SIZE}/>                    
                        </Pressable>

                        <View style={[globalStyles.flexItemsCenter, { marginVertical: verticalScale(25), justifyContent: "space-between" }]}>
                            <Pressable onPress={() => setMenuOpen(false)}>
                                <MaterialIcons name="close" size={ICON_SIZE} color="red"/>
                            </Pressable>

                            <Pressable style={{ marginLeft: "40%" }}>
                                <Ionicons name="mail" color='white' size={ICON_SIZE}/>                    
                            </Pressable>
                        </View>


                        <Link href="/settings" onPressOut={() => setMenuOpen(false)}>
                            <Ionicons name="settings-outline" color='white' size={ICON_SIZE}/>                    
                        </Link>
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

                    <Text style={[styles.headerTitle, { color: labelColor[style!] }]}>
                        {pageName === 'index' ? 'Orders' : pageName}
                    </Text>
                </View>

                {
                    pageName === 'settings/index' ?  null :
                    <Link href="/pickup">
                        <Image style={styles.headerIcon} source={ShoppingBag}/>
                    </Link>
                }

            </View>
        
        </>
    )
}

Header.defaultProps = {
    "style": "dark"
}

const styles = StyleSheet.create({
    menu: {
        backgroundColor: "#111111",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        zIndex: 200,
        position: "relative"
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
        fontSize: scale(24),
        fontWeight: "700",
        marginLeft: 20,
        textTransform: "capitalize"
    }
})