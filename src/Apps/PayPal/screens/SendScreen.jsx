import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Users } from 'lucide-react-native';

export default function SendScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Send Money</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#6C7C8C" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search name or email"
          placeholderTextColor="#6C7C8C"
        />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Users size={20} color="#1C2B33" />
            <Text style={styles.sectionTitle}>Recent Recipients</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentList}>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <TouchableOpacity key={index} style={styles.recentItem}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop' }}
                  style={styles.recentAvatar}
                />
                <Text style={styles.recentName}>Emma</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Contacts</Text>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <TouchableOpacity key={index} style={styles.contactItem}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=60&h=60&fit=crop' }}
                style={styles.contactAvatar}
              />
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>Alex Thompson</Text>
                <Text style={styles.contactEmail}>alex.t@example.com</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#1C2B33',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#1C2B33',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#1C2B33',
    marginLeft: 8,
  },
  recentList: {
    paddingLeft: 16,
  },
  recentItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  recentAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  recentName: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#1C2B33',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  contactInfo: {
    marginLeft: 12,
  },
  contactName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#1C2B33',
  },
  contactEmail: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6C7C8C',
    marginTop: 2,
  },
});