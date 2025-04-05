import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Search as SearchIcon } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const popularSearches = [
    'Fresh Vegetables',
    'Organic Fruits',
    'Dairy Products',
    'Whole Grain Bread',
    'Healthy Snacks',
];

export default function SearchScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.searchContainer}>
                        <SearchIcon size={20} color="#64748b" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for products"
                            placeholderTextColor="#64748b"
                        />
                    </View>
                </View>

                <ScrollView style={styles.content}>
                    <Text style={styles.sectionTitle}>Popular Searches</Text>
                    <View style={styles.popularSearches}>
                        {popularSearches.map((search, index) => (
                            <TouchableOpacity key={index} style={styles.searchTag}>
                                <Text style={styles.searchTagText}>{search}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        padding: 12,
        borderRadius: 8,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: '#1f2937',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    sectionTitle: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 18,
        color: '#1f2937',
        marginBottom: 16,
    },
    popularSearches: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    searchTag: {
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    searchTagText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#64748b',
    },
});