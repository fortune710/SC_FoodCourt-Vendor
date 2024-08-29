import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useRouter, useRootNavigation } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Text } from './ui/text';
import { scale, verticalScale } from 'react-native-size-matters';
import useThemeColor from "../hooks/useThemeColor";


interface HeaderProps {
  headerTitle?: string;
  showTitle?: boolean;
  backButtonColor?: string;
  backTextColor?: string;


}

export default function Header({  
     headerTitle, 
    showTitle = true, 
    backButtonColor, 
    backTextColor 
}: HeaderProps) {
  const router = useRouter();
  const route = useRootNavigation();
  const pageName = route?.getCurrentRoute()?.name as string;
  const primary = useThemeColor({}, "primary")

  const title = headerTitle || (pageName === 'index' ? 'Orders' : pageName);

  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <ChevronLeft size={24} color= {backButtonColor || primary} />
        <Text style={[styles.backText, {color: backTextColor || primary}]}>Back</Text>
      </Pressable>
      {showTitle && <Text style={styles.headerTitle}>{title}</Text>}
      
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(50),
    paddingHorizontal: scale(18),
    backgroundColor: 'white',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: scale(18),
  },
  backText: {
    fontSize: scale(16),
    marginLeft: scale(4),
    
    
  },
  headerTitle: {
    padding: scale(2),
    marginTop: scale(7),
    fontSize: scale(22),
   
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});