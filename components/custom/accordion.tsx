import useThemeColor from 'hooks/useThemeColor';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface AccordionItemProps {
  title: string;
  content: string;
}



const AccordionItem = ({ title, content }: AccordionItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const primaryColor = useThemeColor({}, "primary")


  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity style={styles.titleContainer} onPress={toggleExpand}>
        <Text style={styles.title}>{title}</Text>
        {expanded ? <ChevronUp stroke={primaryColor}/> : <ChevronDown stroke={primaryColor}/>}
      </TouchableOpacity>
      {expanded && (
        <View style={styles.contentContainer}>
          <Text>{content}</Text>
        </View>
      )}
    </View>
  );
};

interface AccordionProps {
  data: AccordionItemProps[];
}


const Accordion = ({ data }: AccordionProps) => {
  return (
    <View>
      {data.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  accordionItem: {
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 15,
  },
});

export default Accordion;