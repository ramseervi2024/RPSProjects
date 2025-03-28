import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Search, Phone, Mail, MapPin } from 'lucide-react-native';

const CATEGORIES = [
  { id: '1', name: 'Emergency', icon: '🚑' },
  { id: '2', name: 'Healthcare', icon: '🏥' },
  { id: '3', name: 'Education', icon: '🎓' },
  { id: '4', name: 'Services', icon: '🔧' },
];

const LISTINGS = [
  {
    id: '1',
    name: 'Village Medical Center',
    category: 'Healthcare',
    phone: '+1 234-567-8900',
    email: 'info@villagemedical.com',
    address: '123 Health Street',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&q=80',
  },
  {
    id: '2',
    name: 'Community School',
    category: 'Education',
    phone: '+1 234-567-8901',
    email: 'info@communityschool.edu',
    address: '456 Education Ave',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&q=80',
  },
  {
    id: '3',
    name: 'Local Repair Shop',
    category: 'Services',
    phone: '+1 234-567-8902',
    email: 'service@repairshop.com',
    address: '789 Service Road',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80',
  },
];

export default function DirectoryScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Village Directory</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#64748b" />
          <Text style={styles.searchPlaceholder}>Search directory...</Text>
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryButton}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.listings}>
        {LISTINGS.map((listing) => (
          <TouchableOpacity key={listing.id} style={styles.listingCard}>
            <Image source={{ uri: listing.image }} style={styles.listingImage} />
            <View style={styles.listingContent}>
              <View style={styles.categoryTag}>
                <Text style={styles.categoryTagText}>{listing.category}</Text>
              </View>
              <Text style={styles.listingName}>{listing.name}</Text>
              
              <View style={styles.contactInfo}>
                <View style={styles.contactItem}>
                  <Phone size={16} color="#64748b" />
                  <Text style={styles.contactText}>{listing.phone}</Text>
                </View>
                <View style={styles.contactItem}>
                  <Mail size={16} color="#64748b" />
                  <Text style={styles.contactText}>{listing.email}</Text>
                </View>
                <View style={styles.contactItem}>
                  <MapPin size={16} color="#64748b" />
                  <Text style={styles.contactText}>{listing.address}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.contactButton}>
                <Text style={styles.contactButtonText}>Contact</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#166534',
  },
  searchContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: '#94a3b8',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  categoriesContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#64748b',
  },
  listings: {
    padding: 20,
  },
  listingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  listingImage: {
    width: '100%',
    height: 200,
  },
  listingContent: {
    padding: 15,
  },
  categoryTag: {
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  categoryTagText: {
    color: '#166534',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  listingName: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#334155',
    marginBottom: 10,
  },
  contactInfo: {
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
    marginLeft: 8,
  },
  contactButton: {
    backgroundColor: '#166534',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
});