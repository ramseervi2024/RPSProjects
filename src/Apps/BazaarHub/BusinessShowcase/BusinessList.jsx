import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    FlatList,
    ScrollView,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import BusinessCard from './BusinessCard';
import { businessIdeas } from './data';
import { Search } from 'lucide-react-native';

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

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleMain}>
                    Explore Profitable <Text style={styles.titleHighlight}>Business Ideas</Text>
                </Text>
                <Text style={styles.subtitle}>
                    Discover vetted business opportunities with detailed insights on investment, income, and execution plans.
                </Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search businesses..."
                    placeholderTextColor="#9CA3AF"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>

            {/* Budget Filter */}
            <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Budget:</Text>
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

            {/* Category Filter */}
            <View style={styles.filterSection}>
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
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={filteredBusinesses}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <BusinessCard
                        business={item}
                        onPress={handleSelectBusiness}
                    />
                )}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No businesses found matching your criteria.</Text>
                    </View>
                }
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    listContent: {
        padding: 16,
        paddingBottom: 40,
    },
    headerContainer: {
        marginBottom: 20,
    },
    titleContainer: {
        marginBottom: 24,
        alignItems: 'center',
    },
    titleMain: {
        fontSize: 28,
        fontWeight: '800',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 8,
    },
    titleHighlight: {
        color: '#2563EB',
    },
    subtitle: {
        fontSize: 14,
        color: '#4B5563',
        textAlign: 'center',
        lineHeight: 20,
        maxWidth: 300,
    },
    searchContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    searchIcon: {
        position: 'absolute',
        left: 12,
        top: 14,
        zIndex: 1,
    },
    searchInput: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingVertical: 12,
        paddingLeft: 44,
        paddingRight: 16,
        fontSize: 16,
        color: '#111827',
    },
    filterSection: {
        marginBottom: 16,
    },
    filterLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: 8,
    },
    filterScroll: {
        paddingRight: 16,
    },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginRight: 8,
        borderWidth: 1,
    },
    activeChip: {
        backgroundColor: '#16A34A',
        borderColor: '#16A34A',
    },
    inactiveChip: {
        backgroundColor: 'white',
        borderColor: '#E5E7EB',
    },
    chipText: {
        fontSize: 13,
        fontWeight: '500',
    },
    activeChipText: {
        color: 'white',
    },
    inactiveChipText: {
        color: '#4B5563',
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 100,
        marginRight: 8,
        borderWidth: 1,
    },
    activeCategoryChip: {
        backgroundColor: '#2563EB',
        borderColor: '#2563EB',
    },
    inactiveCategoryChip: {
        backgroundColor: 'white',
        borderColor: '#E5E7EB',
    },
    categoryChipText: {
        fontSize: 14,
        fontWeight: '500',
    },
    activeCategoryChipText: {
        color: 'white',
    },
    inactiveCategoryChipText: {
        color: '#4B5563',
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#6B7280',
    },
});

export default BusinessList;
