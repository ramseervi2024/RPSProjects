import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '../components/Header';
import SafariCard from '../components/SafariCard';
import { safaris } from '../data/safaris';

const SafariBookingScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header title="Book a Safari" />
            <FlatList
                data={safaris}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <SafariCard
                        item={item}
                        onPress={() => navigation.navigate('SafariDetail', { item })}
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
    listContainer: {
        padding: 16,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    }
});

export default SafariBookingScreen;
