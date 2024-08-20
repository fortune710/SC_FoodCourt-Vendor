import { Image } from "expo-image";
import React from "react";

interface IconProps {
    iconFile: any
    size?: number
}

export default function Icon({ size, iconFile }: IconProps) {
    return (
        <Image
            source={{ uri: iconFile }}
            style={{ width: size ?? 20, height: size ?? 20 }}
        />
    )
}

