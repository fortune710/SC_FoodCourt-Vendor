
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import React from 'react';
import { Text } from "~/components/ui/text";
import Page from "~/components/page";
import { scale } from 'react-native-size-matters';
import { StatusBar,Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Monnify from '~/services/monnify';
import useResturant from '~/hooks/useResturant';
import useOrderStatus from '~/hooks/useOrderStatus';
import { OrderStatus } from '~/utils/types';
import TransactionItem from '~/components/transaction-item';




  

  

export default function walletPage() {

  const router = useRouter();
  const { resturant } = useResturant();
  const { orders, isLoading } = useOrderStatus(OrderStatus.Collected);

  return (
    <Page>
        <StatusBar backgroundColor="#FF3B30" barStyle="light-content" />
        <SafeAreaView style={styles.container}>
      <View style={styles.walletHeader}>
        <Text style={styles.walletTitle}>Wallet</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Attached Account Number</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceAmount}>{resturant?.account_number || "N/A"}</Text>
            <TouchableOpacity style= {styles.eyeicon}>
              <Ionicons name="eye-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.lastUpdated}>Last Updated on 26-8-2023 by 12:30pm</Text>
        </View>

        {
          /*
          <View style={styles.pagination}>
            <View style={[styles.paginationDot, styles.activeDot]} />
            <View style={styles.paginationDot} />
          </View>
          
          */
        }

        {
          !resturant?.subaccount_code ? 
          <TouchableOpacity onPress={() => router.push('/admin/wallet/create')} className='bg-white rounded-[50px] p-4'>
            <Text className='mx-auto'>Add Payment Details</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity className='bg-white rounded-[50px] p-4'>
            <Text className='mx-auto'>Update Payment Details</Text>
          </TouchableOpacity>

        }

      </View>
      
      <View style={styles.transactionContainer}>
        <View style = {styles.handle}/>

        <Pressable onPress={() => router.push("/admin/wallet/transhistory")}>
          <Text style={styles.transactionTitle}>Transaction History</Text>
        </Pressable>
        {
          isLoading ? <ActivityIndicator/> :
          orders?.length === 0 ?
          <View className='w-full items-center justify-center flex-row h-[200px]'>
            <Text>There are no orders available</Text>
          </View> 
          :
          <ScrollView>
            {
              orders?.slice(0, 5).map((order) => (
                <TransactionItem 
                  type="Order Income"
                  amount={order.total_amount.toString()}
                  date="24 Aug 2023" //change date format
                  description={`Order Payment from ${order.customer_name}`}
                />
              ))
            }
          </ScrollView>
        }
      </View>
    </SafeAreaView>
    </Page>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FF3B30',
    },
    
    eyeicon: {
        position: 'absolute',
        right: scale(-70)
        ,
    },
    walletHeader: {
      padding: 20,
    },
    walletTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 20,
    },
    balanceContainer: {
      marginBottom: 20,
      
      alignItems: 'center',
    },
    balanceLabel: {
      fontSize: 18,
      color: 'white',
      marginBottom: 10,
    },
    balanceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    balanceAmount: {
       
      fontSize: 28,
      fontWeight: 'bold',
      color: 'white',
      paddingTop:10,

    },
    lastUpdated: {
      fontSize: 12,
      color: 'white',
      marginTop: 5,
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: 'white',
    },
    transactionContainer: {
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    handle:{
        marginTop: scale(-10),
        width: scale(60),
        backgroundColor: "#FF3B30",
        height: scale(10),
        alignSelf: "center",
        borderRadius : 30,
        marginBottom: scale(10)


    }, 
    transactionTitle: {
        alignSelf:"center",
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    transaction: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 0,
    },
    transactionIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#F0F0F0',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    transactionDetails: {
      flex: 1,
    },
    transactionType: {
      fontWeight: 'bold',
    },
    transactionDate: {
      fontSize: 12,
      color: '#888',
    },
    transactionDescription: {
      fontSize: 12,
      color: '#888',
    },
    transactionAmount: {
      fontWeight: 'bold',
    },
    seperator: {
        marginVertical: scale(10),
        height: scale(1),
        backgroundColor: "#E0E0E0",
        
        
    }
  });
