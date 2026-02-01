import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, FlatList } from 'react-native';
import Header from '../components/Header';
import CategoryPill from '../components/CategoryPill';
import ProductCard from '../components/ProductCard';
import ArtisanCard from '../components/ArtisanCard';
import { PRODUCTS } from '../data/products';
import { ARTISANS } from '../data/artisans';

const { width } = Dimensions.get('window');

const CAROUSEL_IMAGES = [
    'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
    'https://images.unsplash.com/photo-1512413914633-b5043f4041ea?w=800&q=80',
    'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&q=80',
];

const HomeScreen = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Bandhani', 'Sherwani', 'Lehenga', 'Pagdi'];

    const trendingProducts = PRODUCTS.filter(p => p.isTrending).slice(0, 4);

    return (
        <View style={styles.container}>
            <Header title="Heritage Vastra" showMenu />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Banner Carousel */}
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.carouselContainer}>
                    {CAROUSEL_IMAGES.map((img, index) => (
                        <Image key={index} source={{ uri: img }} style={styles.carouselImage} />
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Shop by Category</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
                    {categories.map((cat, index) => (
                        <CategoryPill
                            key={index}
                            title={cat}
                            isActive={selectedCategory === cat}
                            onPress={() => setSelectedCategory(cat)}
                        />
                    ))}
                </ScrollView>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Trending Collection</Text>
                    <Text style={styles.seeAll} onPress={() => navigation.navigate('TraditionalWear')}>See All</Text>
                </View>

                <FlatList
                    horizontal
                    data={trendingProducts}
                    renderItem={({ item }) => (
                        <View style={{ width: width * 0.45, marginRight: 12 }}>
                            <ProductCard
                                product={item}
                                onPress={() => navigation.navigate('ProductDetail', { product: item })}
                            />
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Top Artisans Near You</Text>
                    <Text style={styles.seeAll} onPress={() => navigation.navigate('Artisans')}>See All</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
                    {ARTISANS.map(artisan => (
                        <ArtisanCard
                            key={artisan.id}
                            artisan={artisan}
                            onPress={() => navigation.navigate('Artisans')}
                        />
                    ))}
                </ScrollView>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    carouselContainer: {
        height: 200,
        marginBottom: 20,
    },
    carouselImage: {
        width: width,
        height: 200,
        resizeMode: 'cover',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#E5E7EB',
        marginLeft: 16, // For standalone titles
        marginBottom: 12, // For standalone titles
    },
    seeAll: {
        color: '#C59D5F',
        fontWeight: '600',
    },
    categoryContainer: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
});

export default HomeScreen;
