import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, Search } from 'lucide-react-native';

const CONTACTS = [
  {
    id: '1',
    name: 'Alice Johnson',
    number: '+1 234 567 8903',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Bob Wilson',
    number: '+1 234 567 8904',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'Carol Martinez',
    number: '+1 234 567 8905',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
  },
];

export default function ContactsScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.contactItem}>
      <View style={styles.avatarContainer}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholderAvatar]}>
            <Text style={styles.avatarText}>{item.name[0]}</Text>
          </View>
        )}
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.number}>{item.number}</Text>
      </View>
      <TouchableOpacity style={styles.callButton}>
        <Phone size={20} color="#0066FF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contacts</Text>
      </View>
      <View style={styles.searchContainer}>
        <Search size={20} color="#666666" />
        <Text style={styles.searchPlaceholder}>Search contacts</Text>
      </View>
      <FlatList
        data={CONTACTS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#000000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  searchPlaceholder: {
    marginLeft: 12,
    color: '#666666',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  list: {
    padding: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  placeholderAvatar: {
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    color: '#666666',
    fontFamily: 'Inter_600SemiBold',
  },
  contactInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
  },
  number: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});