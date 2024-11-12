import React from 'react'
import { Text } from "~/components/ui/text";
import Page from "~/components/page";
import { View,  StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { scale } from 'react-native-size-matters';
import { StatusBar,Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import useOrderStatus from '~/hooks/useOrderStatus';
import { OrderStatus } from '~/utils/types';
import TransactionItem from '~/components/transaction-item';
  

export default function transhistory() {
  const router = useRouter();
  const { orders, isLoading } = useOrderStatus(OrderStatus.Collected);

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

      {
        isLoading ? <ActivityIndicator/> :
        orders?.length === 0 ?
        <View className='w-full items-center justify-center flex-row h-[200px]'>
          <Text>There are no orders available</Text>
        </View> 
        :
        <FlatList
          data={orders}
          renderItem={({ item: order }) => (
            <TransactionItem //Usiere- static data even though I changed things like description
              type="Order Income"
              amount={order.total_amount.toString()}
              date={order.order_date.toDateString()} //change date format
              description={`Received Payment for ${order.id}`}
            />
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.transactionList}
        />
      }

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
  