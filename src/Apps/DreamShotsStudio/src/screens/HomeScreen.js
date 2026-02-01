import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';
import Header from '../components/Header';
import CategoryPill from '../components/CategoryPill';
import PhotographerCard from '../components/PhotographerCard';
import { photographers } from '../data/photographers';

const { width } = Dimensions.get('window');

const HERO_IMAGES = [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&w=800&q=80',
];

const CATEGORIES = ['All', 'Wedding', 'Pre-Wedding', 'Events', 'Reels'];

const HomeScreen = ({ navigation }) => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPhotographers = activeCategory === 'All'
        ? photographers
        : photographers.filter(p => p.categories.includes(activeCategory));

    return (
        <View style={styles.container}>
            <Header title="DreamShots" />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.heroContainer}>
                    {HERO_IMAGES.map((img, index) => (
                        <Image key={index} source={{ uri: img }} style={styles.heroImage} />
                    ))}
                    <View style={styles.heroOverlay}>
                        <Text style={styles.heroTitle}>Capture Your Perfect Moments</Text>
                        <Text style={styles.heroSubtitle}>Book top-rated photographers nearby</Text>
                    </View>
                </ScrollView>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Search color="#000000" size={20} />
                    <TextInput
                        placeholder="Search photographers, location..."
                        placeholderTextColor="#6B7280"
                        style={styles.searchInput}
                    />
                </View>

                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
                    {CATEGORIES.map((cat) => (
                        <CategoryPill
                            key={cat}
                            title={cat}
                            isActive={activeCategory === cat}
                            onPress={() => setActiveCategory(cat)}
                        />
                    ))}
                </ScrollView>

                {/* Top Photographers */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Top Photographers</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Photographers')}>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={filteredPhotographers}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={{ width: width * 0.8, marginRight: 16 }}>
                            <PhotographerCard
                                photographer={item}
                                onPress={() => navigation.navigate('PhotographerDetails', { photographer: item })}
                            />
                        </View>
                    )}
                    contentContainerStyle={styles.listContainer}
                />

                <View style={{ height: 80 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    heroContainer: {
        height: 250,
    },
    heroImage: {
        width: width,
        height: 250,
        resizeMode: 'cover',
    },
    heroOverlay: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 10,
        borderRadius: 8,
    },
    heroTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    heroSubtitle: {
        color: '#FFFFFF',
        fontSize: 16,
        marginTop: 4,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        margin: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#000000',
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        color: '#000000',
        fontSize: 16,
    },
    categoriesContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
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
        color: '#000000',
    },
    seeAll: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '600',
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
});

export default HomeScreen;
