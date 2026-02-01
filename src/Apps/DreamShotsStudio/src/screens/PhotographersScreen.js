import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';
import PhotographerCard from '../components/PhotographerCard';
import { photographers } from '../data/photographers';

const PhotographersScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header title="All Photographers" />
            <FlatList
                data={photographers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PhotographerCard
                        photographer={item}
                        onPress={() => navigation.navigate('PhotographerDetails', { photographer: item })}
                    />
                )}
                contentContainerStyle={styles.listContainer}
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
    listContainer: {
        padding: 20,
        paddingBottom: 100,
    },
});

export default PhotographersScreen;
