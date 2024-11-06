import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import ContactOption from 'components/support/contact';
import { Mail } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Header from '~/components/header';
import Page from 'components/page';
import useThemeColor from 'hooks/useThemeColor';
import { verticalScale } from 'react-native-size-matters';

const SupportPage = () => {
    const router = useRouter();
    const primaryColor = useThemeColor({}, "primary")

  return (
    <Page>
      <Header headerTitle='Support'/>
      
      <View style={styles.content}>
        <Image
          source={require('~/assets/contact-us.svg')}
          style={styles.illustration}
        />
        
        <Text style={styles.sectionTitle}>Contact Us Via</Text>
        
        <ContactOption
          icon={<Mail stroke={primaryColor}/>}
          title="Email"
          subtitle="Replies within 8hrs"
          onPress={() => {/* Handle email press */}}
        />
      </View>
    </Page>
  );
};

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  illustration: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'semibold',
    marginTop: verticalScale(24),
    marginBottom: verticalScale(16),
    textAlign: 'center',
  },
});

export default SupportPage;