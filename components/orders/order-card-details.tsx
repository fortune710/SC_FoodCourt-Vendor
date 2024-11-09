

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import OrderCardName from './order-card-name';
import { globalStyles } from '../../constants/Styles';
 import utilityStyles from '../../utils/styles';
import { CountdownTimer } from './CountdownTimer';
import { Order, OrderStatus } from '~/utils/types';
 

interface OrderCardDetailsProps {
  showTime?: boolean
  isPreparing?: boolean
  order: Order
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  type: string;
  addonName?: string
}

const AccordionItem = ({ title, children } : AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.accordionHeader}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={24} color="black" />
      </TouchableOpacity>
     
      {isOpen && <View style={styles.accordionContent}>
        {(title === "Food" || title === "Drinks")  &&(<View style={styles.labelsRow}>
            <Text style={[styles.label, styles.labelItem]}>Item</Text>
            <Text style={[styles.label,styles.labelQty]}>Qty</Text>
            <Text style={[styles.label,styles.labelPrice]}>Price</Text>
    </View>)}{children}</View>}
    </View>
  );
};

export default function OrderCardDetails({ showTime, order } : OrderCardDetailsProps ) {

  return (
    <View style={styles.container}>
      <OrderCardName order={order} />
      
      <View className='py-3'>
        {
          order.items.map(item => (
            <OrderItem 
              key={item.menu_item.name}
              quantity={item.quantity} 
              price={item.menu_item.price} 
              name={item.menu_item.name}
              type={item.menu_item.name}
              addonName={item.addon_name}
            />
          ))
        }
      </View>
      
      <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
        <View style={[styles.itemsCatPresent, {gap: 16}]}>
          <View style={styles.itemsCatPresent}>
            <Image source={require("../../assets/icons/food-cat.svg")} style={{width: 40, height: 40}}/>
            <Text style={{fontSize: 16, color: '#5c5c5c'}}>Food</Text>
          </View>

          <View style={styles.itemsCatPresent}>
            <Image source={require("../../assets/icons/drinks-cat.svg")} style={{width: 40, height: 40}}/>
            <Text style={{fontSize: 16, color: '#5c5c5c'}}>Drink</Text>
          </View>
        </View>


        {showTime && (
          <CountdownTimer 
            initialPreparationTime={order?.preparation_time * 60} 
            orderId={order?.id!} 
            isPreparing={order?.status === OrderStatus.Preparing}  
          />
        )}
      </View>
    </View>
  );
}

const OrderItem = (item : OrderItem) => (
  <View key={item.name} style={styles.orderItem}>
    <Text style={styles.itemQuantity}>{item.quantity}x</Text>

    <View style={{rowGap: 8}}>
      <Text style={styles.itemName}>{item.name}</Text>
      {item?.addonName ? <Text style={styles.itemAddOns}>with {item?.addonName}</Text>: null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderColor: '#7E7E7E',
    backgroundColor: '#FFF5F5',
  },
 
  label: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: "grey"
  },
  labelsRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  labelItem: {
    textAlign: 'left',
   flex: 1,
  },
  labelQty: {
    textAlign: 'center',
    
    flex: 1,
  },
  labelPrice: {
    textAlign: 'center',
    flex: 1,
    
  },
  accordionItem: {
    marginBottom: 16,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#7E7E7E',
  },
  accordionTitle: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '600',
  },
  accordionContent: {
    paddingTop: 8,
  },
  orderItem: {
    width: "100%",
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  itemAddOns:{
    fontSize: 16,
    fontWeight: 400,
    paddingLeft: 24
  },
  itemName: {
    flex: 2,
    // fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: 600,
    
  },

  // itemDetails:{
  //   flexDirection: "row",
  // },
 
  itemQuantity: {
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'center',
   
  },
  itemPrice: {
    // flex: 1,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'left',
  },
  itemsCatPresent:{
    flexDirection:'row', 
    gap: 8, 
    alignItems: 'center'
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#7E7E7E',
  },
  totalLabel: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '600',
  },
  totalAmount: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '600',
  },
  orderCompletedTime: {
    marginTop: 0,
    marginBottom: 10,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    textAlign: 'center',
    backgroundColor: '#d9d9d9',
    color: 'black',
    alignSelf: 'flex-end',
  },
});