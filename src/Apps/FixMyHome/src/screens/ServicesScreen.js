import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

const ServicesScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header title="All Services" />
            <FlatList
                data={services}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ServiceCard
                        service={item}
                        onPress={() => navigation.navigate('ServiceDetail', { service: item })}
                    />
                )}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc', // Light background
    },
    list: {
        padding: 16,
    },
});

export default ServicesScreen;
