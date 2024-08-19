// components/BackButton.js
import { ChevronRight } from 'lucide-react-native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ContactOptionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
}



const ContactOption = ({ icon, title, subtitle, onPress }: ContactOptionProps) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <View style={styles.iconContainer}>
      {icon}
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
    <ChevronRight stroke="#000000"/>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ContactOption;