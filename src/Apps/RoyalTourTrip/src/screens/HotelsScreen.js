import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import HotelCard from '../components/HotelCard';
import { hotels } from '../data/hotels';
import { Filter } from 'lucide-react-native';

const HotelsScreen = ({ navigation }) => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Luxury', 'Budget', 'Jaisalmer', 'Jodhpur'];

    const renderFilter = () => (
        <View style={styles.filterContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
                {filters.map((filter, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.filterChip, activeFilter === filter && styles.activeFilterChip]}
                        onPress={() => setActiveFilter(filter)}
                    >
                        <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>{filter}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="Hotels & Stays" showMenu={false} />
            {renderFilter()}
            <FlatList
                data={hotels}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <HotelCard
                        item={item}
                        onPress={() => navigation.navigate('HotelDetail', { item })}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    filterContainer: {
        height: 60,
        paddingVertical: 10,
    },
    filterChip: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#eee',
    },
    activeFilterChip: {
        backgroundColor: '#333',
        borderColor: '#333',
    },
    filterText: {
        color: '#666',
        fontWeight: '600',
    },
    activeFilterText: {
        color: '#fff',
    },
    listContainer: {
        paddingTop: 10,
        paddingBottom: 80,
    },
});

export default HotelsScreen;
