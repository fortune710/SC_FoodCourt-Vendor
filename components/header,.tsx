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


const ICON_SIZE = 35;

const toolbarColorPerPage: Record<string, string> = {
    "index": "white",
    "settings": "#F72F2F"
}

interface HeaderProps {
    style?: "light"|"dark"
}


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
        "dark": undefined
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
        
            <View style={[styles.hedaer,{ backgroundColor: toolbarColorPerPage[pageName], }]}>
                <View style={globalStyles.flexItemsCenter}>
                    <Pressable onPress={() => setMenuOpen(!menuOpen)}>
                        <MaterialIcons 
                            name="menu" 
                            size={ICON_SIZE - 10} 
                            color={iconColor[style!]} 
                        />
                    </Pressable>

                    <Text style={[styles.hedaerTitle, { color: labelColor[style!] }]}>
                        {pageName === 'index' ? 'Orders' : pageName}
                    </Text>
                </View>

                <Link href="/pickup">
                    <MaterialIcons 
                        name="shopping-bag" 
                        size={ICON_SIZE - 10} 
                        color={iconColor[style!]} 
                    />
                </Link>

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
    menuButons: {
        position: "absolute",
        top: "25%",
        left: "10%",
        ...globalStyles.flexItemsCenter,
        justifyContent: "center",
        flexDirection: "column"
    },
    hedaer: {
        ...globalStyles.flexItemsCenter,
        justifyContent: "space-between",
        height: verticalScale(50),
        paddingHorizontal: scale(10)
    },
    hedaerTitle: {
        fontSize: scale(24),
        fontWeight: "700",
        marginLeft: 20,
        textTransform: "capitalize"
    }
})