import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search as SearchIcon, Hash, Users } from 'lucide-react-native';

const searchResults = [
  {
    type: 'channel',
    name: 'general',
    server: 'Discord App',
  },
  {
    type: 'channel',
    name: 'development',
    server: 'Discord App',
  },
  {
    type: 'user',
    name: 'Sarah Wilson',
    status: 'Playing Valorant',
  },
  {
    type: 'user',
    name: 'Michael Chen',
    status: 'Online',
  },
];

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Search</Text>
        </View>
      </SafeAreaView>

      <View style={styles.searchContainer}>
        <SearchIcon size={20} color="#8e9297" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#8e9297"
        />
      </View>

      <ScrollView style={styles.content}>
        {searchResults.map((result, index) => (
          <Pressable key={index} style={styles.resultItem}>
            {result.type === 'channel' ? (
              <Hash size={20} color="#8e9297" />
            ) : (
              <Users size={20} color="#8e9297" />
            )}
            <View style={styles.resultInfo}>
              <Text style={styles.resultName}>{result.name}</Text>
              <Text style={styles.resultDetails}>
                {result.type === 'channel' ? result.server : result.status}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36393f',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#202225',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    backgroundColor: '#202225',
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  resultInfo: {
    marginLeft: 12,
  },
  resultName: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  resultDetails: {
    color: '#8e9297',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
});