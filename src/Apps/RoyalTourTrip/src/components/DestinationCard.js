import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MapPin } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const DestinationCard = ({ item, onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
            <View style={styles.overlay} />
            <View style={styles.content}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.locationContainer}>
                    <MapPin color="#FFC107" size={16} />
                    <Text style={styles.city}>{item.city}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: width * 0.7, // Horizontal scrolling card width
        aspectRatio: 1.2, // Maintain aspect ratio for responsiveness
        marginRight: 16,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    content: {
        position: 'absolute',
        bottom: 20,
        left: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    city: {
        fontSize: 14,
        color: '#f0f0f0',
        marginLeft: 4,
    },
});

export default DestinationCard;
