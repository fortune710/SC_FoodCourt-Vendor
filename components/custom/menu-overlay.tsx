import React from 'react';
import { View, Text, StyleSheet,  Dimensions } from 'react-native';


// Define the interface for the component's props


// Define the functional component with props
const MenuOverlay: React.FC = () => {

    return (
       <View>
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>Menu Overlay</Text>
              </View>
       </View>
    );
    
};



const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        top: 0,
        left: 0,
        right:0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 4000,
    },
    overlayText: {
        color: 'blue',
        fontSize: 30,
    },
});

export default MenuOverlay;