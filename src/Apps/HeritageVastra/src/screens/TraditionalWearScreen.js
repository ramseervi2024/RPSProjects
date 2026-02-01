import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { Filter, SlidersHorizontal } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const TraditionalWearScreen = ({ navigation }) => {
    const [products, setProducts] = useState(PRODUCTS);

    const renderProduct = ({ item }) => (
        <View style={styles.columnWrapper}>
            <ProductCard
                product={item}
                onPress={() => navigation.navigate('ProductDetail', { product: item })}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="Traditional Wear" showCart />

            {/* Filter Bar */}
            <View style={styles.filterBar}>
                <TouchableOpacity style={styles.filterButton}>
                    <Filter size={16} color="#0F172A" />
                    <Text style={styles.filterText}>Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButtonOutline}>
                    <Text style={styles.filterTextOutline}>Sort By</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButtonOutline}>
                    <SlidersHorizontal size={16} color="#C59D5F" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.row}
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
    filterBar: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C59D5F',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        gap: 6,
    },
    filterText: {
        color: '#0F172A',
        fontWeight: '600',
        fontSize: 14,
    },
    filterButtonOutline: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#C59D5F',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        gap: 6,
    },
    filterTextOutline: {
        color: '#C59D5F',
        fontWeight: '600',
        fontSize: 14,
    },
    listContent: {
        padding: 10,
    },
    row: {
        justifyContent: 'space-between',
    },
    columnWrapper: {
        width: (width - 32) / 2,
    },
});

export default TraditionalWearScreen;
