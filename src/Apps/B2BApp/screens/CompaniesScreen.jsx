import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Search, Filter } from 'lucide-react-native';

export default function CompaniesScreen() {
  const companies = [
    {
      name: 'TechCorp Solutions',
      industry: 'Technology',
      location: 'San Francisco, CA',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop',
    },
    {
      name: 'Global Innovations',
      industry: 'Manufacturing',
      location: 'Chicago, IL',
      image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=200&h=200&fit=crop',
    },
    {
      name: 'EcoSmart Systems',
      industry: 'Green Energy',
      location: 'Austin, TX',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Companies</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search companies"
              placeholderTextColor="#666"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {companies.map((company, index) => (
          <TouchableOpacity key={index} style={styles.companyCard}>
            <Image source={{ uri: company.image }} style={styles.companyImage} />
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>{company.name}</Text>
              <Text style={styles.companyIndustry}>{company.industry}</Text>
              <Text style={styles.companyLocation}>{company.location}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: '#1a1a1a',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    paddingVertical: 12,
    marginLeft: 8,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#007AFF15',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  companyCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  companyImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  companyInfo: {
    flex: 1,
    marginLeft: 16,
  },
  companyName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  companyIndustry: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  companyLocation: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
  },
});