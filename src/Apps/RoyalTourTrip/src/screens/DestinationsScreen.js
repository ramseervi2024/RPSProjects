import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '../components/Header';
import DestinationCard from '../components/DestinationCard';
import { destinations } from '../data/destinations';

const DestinationsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header title="All Destinations" />
            <FlatList
                data={destinations}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <View style={styles.itemWrapper}>
                        <DestinationCard
                            item={item}
                            onPress={() => navigation.navigate('DestinationDetail', { item })}
                            style={{ width: '100%', marginRight: 0 }}
                        />
                    </View>
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
    listContainer: {
        padding: 16,
        paddingBottom: 80,
    },
    itemWrapper: {
        marginBottom: 20,
        alignItems: 'center', // Center the cards in the vertical list
    }
});

export default DestinationsScreen;
