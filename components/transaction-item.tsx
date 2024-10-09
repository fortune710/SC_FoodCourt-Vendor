import { View, StyleSheet } from "react-native";
import { Text } from "~/components/ui/text";
import { Ionicons } from '@expo/vector-icons'; 
import { scale } from "react-native-size-matters";

interface TransactionProps {
    type: 'Payout' | 'Order Income';
    amount: string;
    date: string;
    description: string;
}

const TransactionItem: React.FC<TransactionProps> = ({ type, amount, date, description }) => (
    <View>
        <View style={styles.transaction}>
            <View style={styles.transactionIcon}>
                <Ionicons 
                    name={type === 'Payout' ? 'arrow-up' : 'arrow-down'} 
                    size={24} 
                    color={type === 'Payout' ? '#FF3B30' : 'green'} 
                />
            </View>
            <View style={styles.transactionDetails}>
                <Text style={styles.transactionType}>{type}</Text>
                <Text style={styles.transactionDate}>{date}</Text>
                <Text style={styles.transactionDescription}>{description}</Text>
            </View>
            <Text style={styles.transactionAmount}>N {amount}</Text>
        </View>
        <View style = {styles.seperator}></View>
    </View>
);

export default TransactionItem


const styles = StyleSheet.create({
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
