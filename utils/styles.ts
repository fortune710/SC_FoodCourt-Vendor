import { StyleSheet } from "react-native";

const styleUtility = StyleSheet.create({
    flexAllCenter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    flexJustifyBetween: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default styleUtility;