import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import Header from '../components/Header';
import { orders } from '../data/orders';

const MyOrdersScreen = () => {
    const renderOrder = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.info}>
                <View style={styles.headerRow}>
                    <Text style={styles.serviceName}>{item.serviceName}</Text>
                    <Text style={[
                        styles.status,
                        item.status === 'Completed' ? styles.statusCompleted :
                            item.status === 'Cancelled' ? styles.statusCancelled : styles.statusScheduled
                    ]}>
                        {item.status}
                    </Text>
                </View>
                <Text style={styles.provider}>Provider: {item.providerName}</Text>
                <Text style={styles.date}>Date: {item.date}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="My Orders" />
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={renderOrder}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    list: {
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        flexDirection: 'row',
    },
    image: {
        width: 100,
        height: '100%',
    },
    info: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    serviceName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    status: {
        fontSize: 12,
        fontWeight: '600',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        overflow: 'hidden',
    },
    statusScheduled: {
        backgroundColor: '#dbeafe',
        color: '#1e40af',
    },
    statusCompleted: {
        backgroundColor: '#dcfce7',
        color: '#166534',
    },
    statusCancelled: {
        backgroundColor: '#fee2e2',
        color: '#b91c1c',
    },
    provider: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 4,
    },
    date: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
    },
});

export default MyOrdersScreen;
