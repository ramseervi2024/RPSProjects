import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';
import Header from '../components/Header';
import CategoryPill from '../components/CategoryPill';
import PropertyCard from '../components/PropertyCard';
import AgentCard from '../components/AgentCard';
import { properties } from '../data/properties';
import { agents } from '../data/agents';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ['All', 'Land', 'House', 'Shop', 'Plot', 'Farm'];

    const featuredProperties = properties.slice(0, 4); // First 4 as featured

    const handlePropertyPress = (property) => {
        navigation.navigate('PropertyDetail', { property });
    };

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Search size={20} color="#999" />
                        <TextInput
                            placeholder="Search properties, locations..."
                            style={styles.input}
                            placeholderTextColor="#999"
                        />
                    </View>
                </View>

                {/* Hero Carousel */}
                <View style={styles.carouselContainer}>
                    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                        {featuredProperties.slice(0, 3).map((item, index) => (
                            <View key={index} style={styles.heroSlide}>
                                <Image source={{ uri: item.images[0] }} style={styles.heroImage} />
                                <View style={styles.heroOverlay}>
                                    <Text style={styles.heroTitle}>{item.title}</Text>
                                    <Text style={styles.heroPrice}>{item.price}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Categories */}
                <View style={styles.section}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
                        {categories.map((cat, index) => (
                            <CategoryPill
                                key={index}
                                label={cat}
                                isSelected={selectedCategory === cat}
                                onPress={() => setSelectedCategory(cat)}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Featured Properties */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Featured Properties</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Buy')}>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
                        {properties.map((item) => (
                            <PropertyCard
                                key={item.id}
                                property={item}
                                onPress={() => handlePropertyPress(item)}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Top Brokers */}
                <View style={[styles.section, styles.lastSection]}>
                    <Text style={styles.sectionTitle}>Top Brokers Near You</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
                        {agents.map((agent) => (
                            <AgentCard key={agent.id} agent={agent} />
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 50,
        borderWidth: 1,
        borderColor: '#EFEFEF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
        elevation: 2,
    },
    input: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: '#333',
    },
    carouselContainer: {
        height: 200,
        marginBottom: 24,
    },
    heroSlide: {
        width: width - 40,
        height: 200,
        marginHorizontal: 20,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        paddingTop: 40,
        backgroundColor: 'rgba(0,0,0,0.4)',
        // background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', // React native doesn't support this directly without libs
    },
    heroTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    heroPrice: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    section: {
        marginBottom: 24,
    },
    lastSection: {
        marginBottom: 40,
    },
    categoryList: {
        paddingHorizontal: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
        paddingHorizontal: 20, // If direct child
    },

    seeAll: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '600',
    },
    horizontalList: {
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
});

export default HomeScreen;
