import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

interface BackArrowButtonProps {
    onPress: () => any;
    color?: string
}


const BackArrowButton: React.FC<BackArrowButtonProps> = ({ onPress, color }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <ArrowLeft stroke={color ?? "#000000"} />
        </TouchableOpacity>
    )
};

  
export default BackArrowButton;