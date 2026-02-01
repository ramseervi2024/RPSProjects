import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Filter, ChevronDown } from 'lucide-react-native';
import Header from '../components/Header';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';

const BuyScreen = ({ navigation }) => {
    const buyProperties = properties.filter(p => p.status === 'Buy');

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <PropertyCard
                property={item}
                onPress={() => navigation.navigate('PropertyDetail', { property: item })}
                style={{ width: '100%', marginRight: 0 }}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="Buy Property" showLocation={false} />

            {/* Filter Bar */}
            <View style={styles.filterBar}>
                <TouchableOpacity style={styles.filterBtn}>
                    <Filter size={16} color="#333" />
                    <Text style={styles.filterText}>Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortBtn}>
                    <Text style={styles.sortText}>Price Range</Text>
                    <ChevronDown size={14} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortBtn}>
                    <Text style={styles.sortText}>Type</Text>
                    <ChevronDown size={14} color="#666" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={buyProperties}
                renderItem={renderItem}
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
        backgroundColor: '#FAFAFA',
    },
    filterBar: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    filterBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F7',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        marginRight: 10,
    },
    filterText: {
        fontWeight: '600',
        marginLeft: 6,
        fontSize: 14,
        color: '#333',
    },
    sortBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        marginRight: 10,
    },
    sortText: {
        fontSize: 14,
        color: '#666',
        marginRight: 4,
    },
    listContent: {
        padding: 20,
        paddingBottom: 100, // Space for Bottom Tab
    },
    itemContainer: {
        marginBottom: 20,
    },
});

// Overriding card style for vertical list
const styles2 = StyleSheet.create({
    fullWidthCard: {
        width: '100%',
        marginRight: 0,
    }
});

export default BuyScreen;
