import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock } from 'lucide-react-native';

const SafariCard = ({ item, onPress, width = '47%' }) => {
    return (
        <TouchableOpacity style={[styles.card, { width }]} onPress={onPress}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
            <View style={styles.details}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <View style={styles.row}>
                    <Clock color="#666" size={12} />
                    <Text style={styles.duration}>{item.duration}</Text>
                </View>
                <Text style={styles.price}>{item.price}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        aspectRatio: 1.5, // Responsive image height
    },
    details: {
        padding: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    duration: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#DAA520', // Golden
    },
});

export default SafariCard;
