import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';

const RentScreen = ({ navigation }) => {
    const rentProperties = properties.filter(p => p.status === 'Rent');

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <PropertyCard
                property={item}
                onPress={() => navigation.navigate('PropertyDetail', { property: item })}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="Rent Property" showLocation={false} />
            <FlatList
                data={rentProperties}
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
        marginBottom: 20,
        alignItems: 'center',
    },
});

export default RentScreen;
