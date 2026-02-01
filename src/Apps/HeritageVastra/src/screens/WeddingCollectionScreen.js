import React from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground } from 'react-native';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

const WeddingCollectionScreen = ({ navigation }) => {
    const weddingProducts = PRODUCTS.filter(p => p.isWedding);

    return (
        <View style={styles.container}>
            <Header title="Wedding Collection" showCart />

            <View style={styles.bannerContainer}>
                <Text style={styles.bannerTitle}>Royal Weddings</Text>
                <Text style={styles.bannerSubtitle}>Curated for your special day</Text>
            </View>

            <FlatList
                data={weddingProducts}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        onPress={() => navigation.navigate('ProductDetail', { product: item })}
                    />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    bannerContainer: {
        padding: 24,
        backgroundColor: '#4B164C',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    bannerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#C59D5F',
        fontFamily: 'serif',
        marginBottom: 4,
    },
    bannerSubtitle: {
        fontSize: 16,
        color: '#E5E7EB',
        opacity: 0.9,
    },
    listContent: {
        padding: 16,
    },
});

export default WeddingCollectionScreen;
