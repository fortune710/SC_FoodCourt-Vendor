import React from 'react'
import { Text } from "~/components/ui/text";
import Page from "~/components/page";
import { View,  StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { scale } from 'react-native-size-matters';
import { StatusBar,Pressable } from 'react-native';
import { useRouter } from 'expo-router';


interface Transaction {
    id: string;
    type: 'Payout' | 'Order Income';
    amount: string;
    date: string;
    description: string;
  }

  
  
  
  const TransactionItem: React.FC<{ item: Transaction }> = ({ item }) => (
    <View>
    <View style={styles.transactionItem}>
      <View style={[styles.iconContainer, { backgroundColor: item.type === 'Payout' ? '#FFECEC' : '#E6FFEC' }]}>
        <Ionicons 
          name={item.type === 'Payout' ? 'arrow-up' : 'arrow-down'} 
          size={24} 
          color={item.type === 'Payout' ? '#FF3B30' : '#34C759'} 
        />
      </View>
      <View style={styles.transactionDetails}>
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionType}>{item.type}</Text>
          <Text style={styles.transactionAmount}>N {item.amount}</Text>
        </View>
        <Text style={styles.transactionDate}>{item.date}</Text>
        <Text style={styles.transactionDescription}>{item.description}</Text>
      </View>
     
    </View>
     <View style={styles.seperator}></View>
    </View>
  );

export default function transhistory() {
    const router = useRouter()
    const transactions: Transaction[] = [
        { id: '1', type: 'Payout', amount: '3,000,000', date: '24 Aug 2023', description: 'Earnings from 17 Aug 2023 to 23 Aug 2023' },
        { id: '2', type: 'Order Income', amount: '3,000', date: '24 Aug 2023', description: 'Received payment for order #12345' },
        { id: '3', type: 'Order Income', amount: '3,000', date: '24 Aug 2023', description: 'Received payment for order #12345' },
        { id: '4', type: 'Order Income', amount: '3,000', date: '24 Aug 2023', description: 'Received payment for order #12345' },
        { id: '5', type: 'Payout', amount: '3,000,000', date: '24 Aug 2023', description: 'Earnings from 17 Aug 2023 to 23 Aug 2023' },
        { id: '6', type: 'Order Income', amount: '3,000', date: '24 Aug 2023', description: 'Received payment for order #12345' },
        { id: '7', type: 'Order Income', amount: '3,000', date: '24 Aug 2023', description: 'Received payment for order #12345' },
        { id: '8', type: 'Order Income', amount: '3,000', date: '24 Aug 2023', description: 'Received payment for order #12345' },
        { id: '9', type: 'Order Income', amount: '3,000', date: '24 Aug 2023', description: 'Received payment for order #12345' },
     
      ];
  return (
    <Page>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
    
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={()=>router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Transaction History</Text>
    </View>
    
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
      <TextInput 
        style={styles.searchInput} 
        placeholder="Chinese"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.clearButton}>
        <Ionicons name="close-circle" size={20} color="#FF3B30" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton}>
        <Ionicons name="filter" size={20} color="#888" />
      </TouchableOpacity>
    </View>

    <FlatList
      data={transactions}
      renderItem={({ item }) => <TransactionItem item={item} />}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.transactionList}
    />
  </SafeAreaView>
  </Page>
  
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    backButton: {
      marginRight: 16,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 16,
      paddingHorizontal: 12,
      borderRadius: 20,
      backgroundColor: '#F0F0F0',
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      height: 40,
      fontSize: 16,
    },
    clearButton: {
      marginLeft: 8,
    },
    filterButton: {
      marginLeft: 12,
    },
    transactionList: {
      paddingHorizontal: 16,
      paddingBottom:scale(100)

    
        
    },
    seperator:{
      height:scale(1),
      backgroundColor:'#E0E0E0',
      marginVertical:scale(5)
    },
    transactionItem: {
      flexDirection: 'row',
      marginBottom: 16,
      
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    transactionDetails: {
      flex: 1,
    },
    transactionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    transactionType: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    transactionAmount: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    transactionDate: {
      fontSize: 14,
      color: '#888',
      marginTop: 2,
    },
    transactionDescription: {
      fontSize: 14,
      color: '#888',
      marginTop: 2,
    },
  });
  