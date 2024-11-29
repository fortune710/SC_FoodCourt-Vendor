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
                    color={type === 'Payout' ? '#FF3B30' : '#37E80F'} 
                />
            </View>

            <View style={styles.transactionContainer}> 
              <View style={styles.transactionDetails}>
                <View>
                  <Text style={styles.transactionType}>{type}</Text>
                  <Text style={styles.transactionDate}>{date}</Text>
                </View>
                  <Text style={styles.transactionAmount}>N {amount}</Text>
              </View>

              <Text style={styles.transactionDescription}>{description}</Text>
            </View>
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
    },
    transactionTitle: {
        alignSelf:"center",
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    transaction: {
      flexDirection: 'row',
    },
    transactionIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 0.3,
      borderColor: '#37E80F',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12
    },
    transactionDetails: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    transactionType: {
      fontWeight: 'bold',
    },
    transactionDate: {
      fontSize: 12,
      color: '#7e7e7e',
    },
    transactionDescription: {
      fontSize: 12,
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
