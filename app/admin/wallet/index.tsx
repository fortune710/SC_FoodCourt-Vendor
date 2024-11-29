
import { Dimensions, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import React from 'react';
import { Text } from "~/components/ui/text";
import Header from '~/components/header'
import { scale, verticalScale } from 'react-native-size-matters';
import { StatusBar,Pressable , Modal, TextInput} from 'react-native';
import { useRouter } from 'expo-router';
import useResturant from '~/hooks/useResturant';
import useOrderStatus from '~/hooks/useOrderStatus';
import { OrderStatus } from '~/utils/types';
import TransactionItem from '~/components/transaction-item';
import Page from '~/components/page';

  

  



export default function walletPage() {

  const router = useRouter();
  const { resturant } = useResturant();
  const { orders, isLoading } = useOrderStatus(OrderStatus.Completed);
  //const [modalVisible, setModalVisible] = React.useState(false); // State for modal visibility
  //const [withdrawAmount, setWithdrawAmount] = React.useState(''); // State for input amount

  return (
    <Page>
      <Header headerTitle='Transactions' noRightIcon = {true} style='dark'/>     

      <View className='pt-10 px-3'>
        <Text className='text-center text-xl'>Payment Details</Text>

        <View className='my-4'>
          {/* <Text className='text-center'>Account Number</Text> */}
          <Text className='text-4xl text-center'>{resturant?.account_number || "N/A"}</Text>
          {
            !resturant?.account_number && 
            <Text className='text-xs text-center'>You must add payment details to start receiving orders</Text>
          }
        </View>

        {
          /*
          <View style={styles.pagination}>
            <View style={[styles.paginationDot, styles.activeDot]} />
            <View style={styles.paginationDot} />
          </View>
          
          */
        }

        <View style={{marginTop: verticalScale(20)}}>
          {
            !resturant?.subaccount_code ? 
            <TouchableOpacity onPress={() => router.push('/admin/wallet/create')} className='rounded-[50px] p-6 mx-16' style={{backgroundColor: '#f72f2f'}}>
              <Text className='mx-auto text-white text-lg'>Add Payment Details</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => router.push('/admin/wallet/create')} className='rounded-[50px] p-6 mx-16'  style={{backgroundColor: '#f72f2f'}}>
              <Text className='mx-auto text-white text-lg'>Update Payment Details</Text>
            </TouchableOpacity>

          }
        </View>
      </View>


      <View style={styles.transactionContainer}>
        <View style= {styles.handle}/>

        <Pressable onPress={() => router.push("/admin/wallet/transhistory")}>
          <Text style={styles.transactionTitle}>Transaction History</Text>
        </Pressable>
        {
          isLoading ? <ActivityIndicator/> :
          orders?.length === 0 ?
          <View className='w-full items-center justify-center flex-row h-[300px]'>
            <Text>There are no orders available</Text>
          </View> 
          :
          <FlatList
            data={orders}
            renderItem={({ item: order }) => (
              <TransactionItem 
                type="Order Income"
                amount={order.total_amount.toString()}
                date="24 Aug 2023" //change date format
                description={`Payment for Order #${order.id}`}
                key={order.id}
              />
            )}
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 400 }}
          />
        }
      </View>

    </Page>
  )
}

const styles = StyleSheet.create({
    eyeicon: {
      position: 'absolute',
      right: scale(-70),
      color: 'black'
    },
    walletHeader: {
      padding: 20,
      paddingLeft: 10,
    },
    walletTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 20,
    },
    balanceContainer: {
      marginBottom: 20,
      marginTop: 15,
      
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
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderTopWidth: 1,
      height: "100%",
      padding: 20,
      position: "absolute",
      top: verticalScale(240),
      bottom: 0,
      left: 0,
      right: 0,
      marginTop: verticalScale(16),
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
    },
    withdrawButton: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FF3B30', // Adjust as needed
          padding: 10,
          borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        marginTop: 20,
          
        },
        withdrawIcon: {
          marginRight: 5,
        },
        withdrawText: {
          color: 'white',
          fontSize: 16,
        },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
    },
    submitButton: {
      backgroundColor: '#FF3B30',
      padding: 10,
      borderRadius: 5,
      width: '100%',
      alignItems: 'center',
    },
    submitText: {
      color: 'white',
      fontWeight: 'bold',
    },
    cancelButton: {
      marginTop: 10,
      padding: 10,
    },
    cancelText: {
      color: '#FF3B30',
    },
  });
