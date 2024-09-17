import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Page from 'components/page';
import Header from '~/components/page-header';
import Accordion from '~/components/custom/accordion'; // Assuming you've moved the Accordion component to the components folder
import useThemeColor from 'hooks/useThemeColor';
import { Stack } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

const LegalPage = () => {
  const legalData = [
    {
      title: "Terms and Conditions",
      content: "These are the terms and conditions. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc."
    },
    {
      title: "Privacy Policy",
      content: "This is our privacy policy. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc."
    }
  ];


  return (
    <Page>
        <Stack.Screen 
            options={{ 
                title: 'Legal', 
                headerRight: () => null,
                headerLeft: () => (
                    <TouchableOpacity>
                        <ChevronLeft/>
                    </TouchableOpacity>
                ), 
            }}
        />
      <Header headerTitle='Legal'/>
      <View style={styles.content}>
        <Accordion data={legalData} />
      </View>
    </Page>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
});

export default LegalPage;