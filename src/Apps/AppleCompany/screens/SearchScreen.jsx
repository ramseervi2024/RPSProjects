import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Search as SearchIcon } from 'lucide-react-native';
import { useState } from 'react';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchIcon size={20} color="#666666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Apple products"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666666"
        />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Popular Searches</Text>
        <View style={styles.popularSearches}>
          <Text style={styles.searchItem}>iPhone 15</Text>
          <Text style={styles.searchItem}>MacBook Pro</Text>
          <Text style={styles.searchItem}>iPad Pro</Text>
          <Text style={styles.searchItem}>Apple Watch</Text>
          <Text style={styles.searchItem}>AirPods Pro</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'SF-Pro-Display-SemiBold',
    fontSize: 32,
    color: '#000000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 20,
    borderRadius: 10,
    padding: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'SF-Pro-Display',
    fontSize: 16,
    color: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'SF-Pro-Display-SemiBold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 15,
  },
  popularSearches: {
    marginTop: 10,
  },
  searchItem: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 16,
    color: '#666666',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
});