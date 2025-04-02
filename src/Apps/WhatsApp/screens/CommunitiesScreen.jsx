import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Users, ChevronRight } from 'lucide-react-native';

const COMMUNITIES = [
  {
    id: '1',
    name: 'Neighborhood Watch',
    description: 'Keep our community safe and informed',
    members: 156,
    avatar: 'https://images.unsplash.com/photo-1497294815431-9365093b7331',
  },
  {
    id: '2',
    name: 'Local Food Lovers',
    description: 'Share recipes and restaurant recommendations',
    members: 342,
    avatar: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  },
  {
    id: '3',
    name: 'Tech Enthusiasts',
    description: 'Discuss latest tech trends and gadgets',
    members: 89,
    avatar: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
  },
];

export default function CommunitiesScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.communityItem}>
      <Image
        source={{ uri: `${item.avatar}?w=100` }}
        style={styles.avatar}
      />
      <View style={styles.communityInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {item.description}
        </Text>
        <Text style={styles.members}>{item.members} members</Text>
      </View>
      <ChevronRight size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Users size={24} color="#128C7E" />
        </View>
        <Text style={styles.headerTitle}>New Community</Text>
      </View>
      <FlatList
        data={COMMUNITIES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e6f7f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
  },
  list: {
    paddingVertical: 8,
  },
  communityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 16,
  },
  communityInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 4,
  },
  members: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#128C7E',
  },
});