import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    FlatList,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Platform
} from 'react-native';
import BusinessCard from './BusinessCard';
import { businessIdeas } from './data';
import { Search, Heart } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

const BusinessList = ({ navigation }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [budgetRange, setBudgetRange] = useState('All');

    const categories = ['All', ...new Set(businessIdeas.map(b => b.category))];
    const budgetOptions = ['All', 'Under 10k', '10k - 50k', '50k - 2L', '2L - 5L', '5L+'];

    const filteredBusinesses = businessIdeas.filter(business => {
        const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || business.category === selectedCategory;

        // Budget Filter Logic
        let matchesBudget = true;
        const investment = business.investmentAmount || 0;

        if (budgetRange === 'Under 10k') matchesBudget = investment < 10000;
        else if (budgetRange === '10k - 50k') matchesBudget = investment >= 10000 && investment <= 50000;
        else if (budgetRange === '50k - 2L') matchesBudget = investment > 50000 && investment <= 200000;
        else if (budgetRange === '2L - 5L') matchesBudget = investment > 200000 && investment <= 500000;
        else if (budgetRange === '5L+') matchesBudget = investment > 500000;

        return matchesSearch && matchesCategory && matchesBudget;
    });

    const handleSelectBusiness = (business) => {
        navigation.navigate('BusinessDetails', { business });
    };

    const renderFilters = () => (
        <View style={styles.filterContainer}>
            {/* Category Filter */}
            <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    {categories.map(cat => (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => setSelectedCategory(cat)}
                            style={[
                                styles.categoryChip,
                                selectedCategory === cat ? styles.activeCategoryChip : styles.inactiveCategoryChip
                            ]}
                        >
                            <Text style={[
                                styles.categoryChipText,
                                selectedCategory === cat ? styles.activeCategoryChipText : styles.inactiveCategoryChipText
                            ]}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Budget Filter */}
            <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Investment Budget</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    {budgetOptions.map(option => (
                        <TouchableOpacity
                            key={option}
                            onPress={() => setBudgetRange(option)}
                            style={[
                                styles.chip,
                                budgetRange === option ? styles.activeChip : styles.inactiveChip
                            ]}
                        >
                            <Text style={[
                                styles.chipText,
                                budgetRange === option ? styles.activeChipText : styles.inactiveChipText
                            ]}>
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

            {/* Sticky Header Section */}
            <View style={styles.stickyHeader}>
                <LinearGradient
                    colors={['#2563EB', '#1D4ED8']}
                    style={StyleSheet.absoluteFill}
                />
                <SafeAreaView>
                    <View style={styles.headerContent}>
                        <View>
                            <Text style={styles.headerTitle}>BazaarHub</Text>
                            <Text style={styles.headerSubtitle}>Discover your next big idea</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.wishlistButton}
                            onPress={() => navigation.navigate('Wishlist')}
                        >
                            <Heart size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Search Bar - Fixed inside Header */}
                    <View style={styles.searchContainer}>
                        <View style={styles.searchBar}>
                            <Search size={20} color="#64748B" style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search for ideas..."
                                placeholderTextColor="#94A3B8"
                                value={searchTerm}
                                onChangeText={setSearchTerm}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </View>

            {/* Main Content */}
            <FlatList
                data={filteredBusinesses}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <BusinessCard
                        business={item}
                        onPress={handleSelectBusiness}
                    />
                )}
                ListHeaderComponent={renderFilters}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No ideas found matching your criteria.</Text>
                    </View>
                }
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                style={styles.flatList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    stickyHeader: {
        zIndex: 10,
        backgroundColor: '#2563EB',
        paddingBottom: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    headerContent: {
        marginTop: Platform.OS === 'android' ? 16 : 0,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: 'white',
        letterSpacing: -0.5,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#BFDBFE',
        marginTop: 4,
    },
    wishlistButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    searchContainer: {
        paddingHorizontal: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 52,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 4,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1E293B',
        height: '100%',
    },
    flatList: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
        paddingTop: 24,
    },
    filterContainer: {
        marginBottom: 8,
    },
    filterSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748B',
        marginBottom: 12,
        marginLeft: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    filterScroll: {
        paddingRight: 16,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        marginRight: 8,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    activeChip: {
        backgroundColor: '#DCFCE7',
        borderColor: '#22C55E',
    },
    inactiveChip: {
        backgroundColor: 'white',
        borderColor: '#E2E8F0',
    },
    chipText: {
        fontSize: 14,
        fontWeight: '600',
    },
    activeChipText: {
        color: '#15803D',
    },
    inactiveChipText: {
        color: '#64748B',
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 100,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        backgroundColor: 'white',
    },
    activeCategoryChip: {
        backgroundColor: '#2563EB',
        borderColor: '#2563EB',
    },
    inactiveCategoryChip: {
        backgroundColor: 'white',
        borderColor: '#E2E8F0',
    },
    categoryChipText: {
        fontSize: 14,
        fontWeight: '600',
    },
    activeCategoryChipText: {
        color: 'white',
    },
    inactiveCategoryChipText: {
        color: '#64748B',
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#94A3B8',
    },
});

export default BusinessList;
