import { globalStyles } from "constants/Styles";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface BackButtonProps {
    onPress: () => any;
}


const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
    return (
    <TouchableOpacity 
        style={[globalStyles.flexItemsCenter]} 
        onPress={onPress}
    >
        <ChevronLeft stroke="#000000" />
        <Text>Back</Text>
    </TouchableOpacity>
    )
};

  
export default BackButton;