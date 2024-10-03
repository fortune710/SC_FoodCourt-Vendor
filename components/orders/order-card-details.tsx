// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { Image } from "expo-image"; 
// import utilityStyles from '../../utils/styles';
// import OrderCardName from "./order-card-name";
// import { globalStyles } from "../../constants/Styles";

// const OrderItemIcon = View

// interface OrderCardDetailsProps {
//     showTime?: boolean
// }

// export default function OrderCardDetails({ showTime }: OrderCardDetailsProps) {
//     return (
//         <>
//             <OrderCardName/>

//             <View style={styles.orderDescription}>
//                 <Text>
//                     Lorem ipsum dolor sit amet consectetur. Tristique 
//                     platea enim maecenas sed volutpat. Interdum 
//                     morbi eget bibendum volutpat ipsum amet nunc orci.
//                 </Text>

//                 <View style={[globalStyles.flexItemsCenter, globalStyles.justifyBetween]}>
//                     <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginVertical:7 }}>
//                         <View style={styles.orderItem}>
//                             <OrderItemIcon style={styles.orderItemType}>
//                                 <Image
//                                     source={require('../../assets/food.svg')}
//                                 />
//                             </OrderItemIcon>
//                             <Text>Food</Text>
//                         </View>

//                         <View style={styles.orderItem}>
//                             <OrderItemIcon style={styles.orderItemType}>
//                                 <Image
//                                     source={{
//                                         uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/6b0be5ea14d58de9c30289921bf630117df978d4109955a6302773e3fb884d32?apiKey=730671e7852c4d91bc984b7d2d07d7fb&",
//                                     }}
//                                 />
//                             </OrderItemIcon>
//                             <Text>Drink</Text>
//                         </View>
//                     </View>
//                     {
//                         !showTime ? null :
//                         <Text style={styles.orderCompletedTime}>
//                             2:00
//                         </Text>
//                     }
//                 </View>
//             </View>
//         </>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//       alignItems: "stretch",
//       borderRadius: 16,
//       borderWidth: 1,
//       borderColor: "#7E7E7E",
//       backgroundColor: "#FFF5F5",
//       display: "flex",
//       flexDirection: "column",
//       padding: 10,
//     },
//     header: {
//         alignItems: "stretch",
//         display: "flex",
//         flexDirection: "column",
//         padding: 16,
//     },
//     date: {
//         fontFamily: "Montserrat",
//         fontSize: 16,
//         fontWeight: "600",
//     },
//     customer: {
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         display: "flex",
//         marginTop: 5,
//         marginBottom: 20,
//     },
//     time: {
//         textAlign: "right",
//         fontFamily: "Montserrat",
//     },
//     orderCompletedTime: {
//         //...utilityStyles.flexAllCenter,
//         borderRadius: 5,
//         paddingVertical: 8,
//         paddingHorizontal: 15,
//         textAlign: 'center',
//         backgroundColor: '#d9d9d9',
//         color: 'black',
//         width:'auto'

//     },
//     orderDescription: {
//         borderTopWidth: 1,
//         paddingVertical: 5
//     },
//     orderItem: {
//         display: "flex",
//         alignItems: "center",
//         flexDirection: "row",        
//     },
//     orderItemType: {
//         justifyContent: "center",
//         alignItems: "center",
//         borderRadius: 999,
//         border: "0.5px solid #FE7F7F",
//         backgroundColor: "#fff",
//         flexDirection: "row",
//         display: "flex",
//         aspectRatio: "1",
//         width: 32,
//         height: 32,
//         marginRight: 7,
//         paddingHorizontal: 4
//     },
//     actions: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: "space-between",
//         alignItems: "center",
//     }
    
// })  

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import OrderCardName from './order-card-name';
import { globalStyles } from '../../constants/Styles';
 import utilityStyles from '../../utils/styles';

interface OrderCardDetailsProps {
       showTime?: boolean
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

export default function OrderCardDetails({ showTime } : OrderCardDetailsProps ) {
  const orderItems = [
    { name: 'Sharwizzy', quantity: 1, price: 1600, type: 'food' },
    { name: 'Jollof rice Jumbo', quantity: 1, price: 1800, type: 'food' },
    { name: 'pasta', quantity: 2, price: 3000, type: 'food' },
    { name: 'Classic Lemonade', quantity: 1, price: 1200, type: 'drink' },
  ];

  const foodItems = orderItems.filter(item => item.type === 'food');
  const drinkItems = orderItems.filter(item => item.type === 'drink');

  const renderOrderItem = (item : OrderItem) => (
    <View key={item.name} style={styles.orderItem}>
    <Text style={styles.itemName}>{item.name}</Text>
    
    <Text style={styles.itemQuantity}>{item.quantity}</Text>
    <Text style={styles.itemPrice}>N{item.price.toFixed(2)}</Text>
      
    </View>
  );

  return (
    <View style={styles.container}>
      <OrderCardName />
      
      

      <AccordionItem title="Food">
        {foodItems.map(renderOrderItem)}
      </AccordionItem>

      <AccordionItem title="Drinks">
        {drinkItems.map(renderOrderItem)}
      </AccordionItem>

      <AccordionItem title="Order Notes">
        <Text>Nb additional notes for this order.</Text>
      </AccordionItem>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>N8700.34</Text>
      </View>

      {showTime && (
        <Text style={styles.orderCompletedTime}>
          2:00
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#7E7E7E',
    backgroundColor: '#FFF5F5',
    padding: 16,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    flex: 2,
    fontFamily: 'Montserrat',
    fontSize: 14,
    
  },

  // itemDetails:{
  //   flexDirection: "row",
  // },
 
  itemQuantity: {
    flex: 1,
    fontFamily: 'Montserrat',
    fontSize: 14,
    marginRight: 50,
    textAlign: 'center',
   
  },
  itemPrice: {
    // flex: 1,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'left',

    
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
    marginTop: 16,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    textAlign: 'center',
    backgroundColor: '#d9d9d9',
    color: 'black',
    alignSelf: 'flex-end',
  },
});