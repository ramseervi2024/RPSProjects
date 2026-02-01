import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock } from 'lucide-react-native';

const ServiceCard = ({ service, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: service.imageUrl }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{service.name}</Text>
                <View style={styles.row}>
                    <Clock size={14} color="#666" />
                    <Text style={styles.time}>{service.estimatedTime}</Text>
                </View>
                <Text style={styles.price}>From ${service.basePrice}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 12,
        marginRight: 16,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
        color: '#1e293b',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    time: {
        fontSize: 14,
        color: '#64748b',
        marginLeft: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0284c7', // Blue accent
    },
});

export default ServiceCard;
