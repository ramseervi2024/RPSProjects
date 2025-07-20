import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { X, ChevronDown, HelpCircle, Settings, User } from 'lucide-react-native';

const accordionItems = [
  {
    id: 1,
    title: 'Account Settings',
    icon: User,
    content: 'Manage your profile, preferences, and account security settings.',
  },
  {
    id: 2,
    title: 'General Settings',
    icon: Settings,
    content: 'Configure app behavior, notifications, and display preferences.',
  },
  {
    id: 3,
    title: 'Help & Support',
    icon: HelpCircle,
    content: 'Find answers to common questions or contact our support team.',
  },
];

export default function AccordionAnimation({ onClose }) {
  const [expandedId, setExpandedId] = useState(null);

  const handleClose = () => {
    runOnJS(onClose)();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Accordion Animation</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <X size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {accordionItems.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isExpanded={expandedId === item.id}
            onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

function AccordionItem({ item, isExpanded, onToggle }) {
  const height = useSharedValue(0);
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    height.value = withSpring(isExpanded ? 1 : 0, { damping: 15, stiffness: 150 });
    rotation.value = withSpring(isExpanded ? 1 : 0, { damping: 15, stiffness: 150 });
  }, [isExpanded]);

  const contentStyle = useAnimatedStyle(() => ({
    height: interpolate(height.value, [0, 1], [0, 100]),
    opacity: height.value,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 180}deg` }],
  }));

  const IconComponent = item.icon;

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity style={styles.accordionHeader} onPress={onToggle}>
        <View style={styles.headerLeft}>
          <IconComponent size={20} color="#3B82F6" />
          <Text style={styles.accordionTitle}>{item.title}</Text>
        </View>
        <Animated.View style={iconStyle}>
          <ChevronDown size={20} color="#6B7280" />
        </Animated.View>
      </TouchableOpacity>
      
      <Animated.View style={[styles.accordionContent, contentStyle]}>
        <Text style={styles.contentText}>{item.content}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  accordionItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12,
  },
  accordionContent: {
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  contentText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    paddingBottom: 20,
  },
});