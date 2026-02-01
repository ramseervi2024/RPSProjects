import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';

const MyListingsScreen = ({ navigation }) => {
    // Simulating user listings using some dummy data
    const myListings = [
        { ...properties[0], myStatus: 'Active' },
        { ...properties[2], myStatus: 'Pending' }
    ];

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <PropertyCard
                property={item}
                onPress={() => navigation.navigate('PropertyDetail', { property: item })}
            />
            <View style={[styles.statusBadge, item.myStatus === 'Active' ? styles.active : styles.pending]}>
                <Text style={styles.statusText}>{item.myStatus}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="My Listings" showLocation={false} />
            <FlatList
                data={myListings}
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
    listContent: {
        padding: 20,
        paddingBottom: 100,
    },
    itemContainer: {
        marginBottom: 24,
        alignItems: 'center',
        position: 'relative',
    },
    statusBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    active: {
        backgroundColor: '#34C759',
    },
    pending: {
        backgroundColor: '#FF9500',
    },
    statusText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
});

export default MyListingsScreen;
