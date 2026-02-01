import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';
import SeedCard from '../components/SeedCard';
import { seedsData } from '../data/seeds';

const SeedsMarketScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header title="Seeds Market" />
            <FlatList
                data={seedsData}
                renderItem={({ item }) => (
                    <SeedCard
                        product={item}
                        onPress={() => navigation.navigate('SeedDetail', { product: item })}
                    />
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    list: {
        padding: 10,
    },
});

export default SeedsMarketScreen;
